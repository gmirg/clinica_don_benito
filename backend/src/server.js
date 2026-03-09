import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const port = Number(process.env.PORT || 4000);
const corsOrigin = process.env.CORS_ORIGIN || '*';
const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;
const googlePlaceId = process.env.GOOGLE_PLACE_ID;
const cacheTtlHours = Number(process.env.REVIEWS_CACHE_TTL_HOURS || 6);

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

const reviewCache = {
  data: null,
  expiresAt: 0
};

function isCacheValid() {
  return reviewCache.data && Date.now() < reviewCache.expiresAt;
}

function mapReview(review) {
  return {
    author_name: review.author_name,
    rating: review.rating,
    text: review.text,
    relative_time_description: review.relative_time_description
  };
}

async function fetchGoogleReviews() {
  if (!googleApiKey || !googlePlaceId) {
    throw new Error('Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID');
  }

  const params = new URLSearchParams({
    place_id: googlePlaceId,
    fields: 'name,rating,user_ratings_total,reviews,url',
    language: 'es',
    key: googleApiKey
  });

  const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`);
  if (!response.ok) {
    throw new Error(`Google API HTTP ${response.status}`);
  }

  const payload = await response.json();
  if (payload.status !== 'OK' || !payload.result) {
    throw new Error(`Google API status ${payload.status}`);
  }

  return {
    place_name: payload.result.name,
    rating: payload.result.rating,
    user_ratings_total: payload.result.user_ratings_total,
    google_maps_url: payload.result.url,
    reviews: Array.isArray(payload.result.reviews) ? payload.result.reviews.map(mapReview) : []
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'reviews-api' });
});

app.get('/api/reviews', async (_req, res) => {
  try {
    if (isCacheValid()) {
      return res.json({ ...reviewCache.data, cached: true });
    }

    const freshData = await fetchGoogleReviews();
    reviewCache.data = freshData;
    reviewCache.expiresAt = Date.now() + cacheTtlHours * 60 * 60 * 1000;

    return res.json({ ...freshData, cached: false });
  } catch (error) {
    return res.status(500).json({
      message: 'No se pudieron obtener las resenas de Google.',
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
