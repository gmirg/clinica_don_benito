import { NextResponse } from 'next/server';
import { manualReviewsPayload, type Review, type ReviewsPayload } from '../../../lib/reviews';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;
const googlePlaceId = process.env.GOOGLE_PLACE_ID;
const cacheTtlHours = Number(process.env.REVIEWS_CACHE_TTL_HOURS || 6);

let reviewCache: { data: ReviewsPayload | null; expiresAt: number } = {
  data: null,
  expiresAt: 0
};

function isCacheValid(): boolean {
  return !!reviewCache.data && Date.now() < reviewCache.expiresAt;
}

function mapReview(review: Record<string, unknown>): Review {
  return {
    author_name: String(review.author_name || 'Paciente'),
    rating: Number(review.rating || 5),
    text: String(review.text || 'Opinion compartida por paciente.'),
    relative_time_description: String(review.relative_time_description || '')
  };
}

async function fetchGoogleReviews(): Promise<ReviewsPayload> {
  if (!googleApiKey || !googlePlaceId) {
    throw new Error('Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID');
  }

  const params = new URLSearchParams({
    place_id: googlePlaceId,
    fields: 'name,rating,user_ratings_total,reviews,url',
    language: 'es',
    key: googleApiKey
  });

  const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`, {
    method: 'GET',
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Google API HTTP ${response.status}`);
  }

  const payload = (await response.json()) as {
    status?: string;
    result?: {
      name?: string;
      rating?: number;
      user_ratings_total?: number;
      url?: string;
      reviews?: Record<string, unknown>[];
    };
  };

  if (payload.status !== 'OK' || !payload.result) {
    throw new Error(`Google API status ${payload.status || 'UNKNOWN'}`);
  }

  return {
    place_name: payload.result.name || 'Google Reviews',
    rating: payload.result.rating,
    user_ratings_total: payload.result.user_ratings_total,
    google_maps_url: payload.result.url,
    reviews: Array.isArray(payload.result.reviews) ? payload.result.reviews.map(mapReview) : []
  };
}

function buildFallbackPayload(errorMessage?: string): ReviewsPayload & { fallback: true; error?: string } {
  return {
    ...manualReviewsPayload,
    cached: false,
    fallback: true,
    ...(errorMessage ? { error: errorMessage } : {})
  };
}

export async function GET() {
  try {
    if (!googleApiKey || !googlePlaceId) {
      return NextResponse.json(buildFallbackPayload('Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID'));
    }

    if (isCacheValid() && reviewCache.data) {
      return NextResponse.json({ ...reviewCache.data, cached: true });
    }

    const freshData = await fetchGoogleReviews();
    reviewCache = {
      data: freshData,
      expiresAt: Date.now() + cacheTtlHours * 60 * 60 * 1000
    };

    return NextResponse.json({ ...freshData, cached: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(buildFallbackPayload(message));
  }
}
