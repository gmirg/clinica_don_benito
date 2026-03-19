'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { Review, ReviewsPayload } from '../lib/reviews';
import { manualReviewsPayload } from '../lib/reviews';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function clampRating(rating = 5): number {
  return Math.max(1, Math.min(5, Math.round(rating)));
}

function getInitials(name: string): string {
  const cleanName = name.trim();
  if (!cleanName) {
    return 'P';
  }

  const chunks = cleanName.split(/\s+/).filter(Boolean);
  const initials = chunks
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() || '')
    .join('');

  return initials || 'P';
}

function shortReviewText(text: string): string {
  const cleanText = text.trim();
  if (!cleanText) {
    return 'Opinión compartida por paciente.';
  }

  return cleanText.length > 150 ? `${cleanText.slice(0, 147).trimEnd()}...` : cleanText;
}

function ensureMinimumSlides(sourceReviews: Review[], minimum = 5): Review[] {
  if (sourceReviews.length === 0) {
    return manualReviewsPayload.reviews.slice(0, minimum);
  }

  if (sourceReviews.length >= minimum) {
    return sourceReviews;
  }

  const extended = [...sourceReviews];
  let cursor = 0;
  while (extended.length < minimum) {
    extended.push(sourceReviews[cursor % sourceReviews.length]);
    cursor += 1;
  }

  return extended;
}

export default function ReviewsSlider() {
  const [reviews, setReviews] = useState<Review[]>(manualReviewsPayload.reviews);
  const [sourceName, setSourceName] = useState<string>(manualReviewsPayload.place_name);
  const [reviewsUrl, setReviewsUrl] = useState<string | undefined>(manualReviewsPayload.google_maps_url);

  useEffect(() => {
    let mounted = true;

    async function loadReviews() {
      try {
        const response = await fetch('/api/reviews', { method: 'GET' });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as ReviewsPayload;
        if (!mounted || !Array.isArray(data.reviews) || data.reviews.length === 0) {
          return;
        }

        setReviews(data.reviews);
        setSourceName(data.place_name || 'Google Reviews');
        setReviewsUrl(data.google_maps_url || manualReviewsPayload.google_maps_url);
      } catch {
        // Keep fallback content if API is unavailable.
      }
    }

    loadReviews();

    return () => {
      mounted = false;
    };
  }, []);

  const displayReviews = ensureMinimumSlides(reviews, 5);

  return (
    <div className="reviews-wrapper">
      <div className="reviews-header">
        <p className="reviews-source">Reseñas de {sourceName}</p>
        {reviewsUrl ? (
          <a
            className="reviews-link"
            href={reviewsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Ver en Google
          </a>
        ) : null}
      </div>
      <Swiper
        className="reviews-carousel"
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={displayReviews.length > 1}
        loop={displayReviews.length > 1}
        centeredSlides
        watchSlidesProgress
        watchOverflow={false}
        speed={650}
        spaceBetween={0}
        breakpoints={{
          0: { slidesPerView: 1.08, spaceBetween: 12 },
          680: { slidesPerView: 1.35, spaceBetween: 14 },
          980: { slidesPerView: 2.2, spaceBetween: -20 },
          1280: { slidesPerView: 3, spaceBetween: -28 }
        }}
      >
        {displayReviews.map((review, index) => (
          <SwiperSlide key={`${review.author_name}-${index}-${review.text.slice(0, 18)}`}>
            <article className="review-card">
              <header className="review-card-head">
                <span className="review-avatar" aria-hidden="true">
                  {getInitials(review.author_name || 'Paciente')}
                </span>
                <span className="review-meta">
                  <strong className="review-name">{review.author_name || 'Paciente'}</strong>
                  <span className="review-time">{review.relative_time_description || 'Reseña reciente'}</span>
                </span>
                <span className="review-google-mark" aria-hidden="true">
                  <Image src="/Google__G__logo.svg" alt="" width={24} height={24} />
                </span>
              </header>
              <p className="review-stars" aria-label={`Valoración ${clampRating(review.rating)} de 5`}>
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <span
                    key={starIndex}
                    className={starIndex < clampRating(review.rating) ? 'star star-filled' : 'star'}
                    aria-hidden="true"
                  >
                    ★
                  </span>
                ))}
              </p>
              <p className="review-text">{shortReviewText(review.text)}</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
