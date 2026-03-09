'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Review, ReviewsPayload } from '../lib/reviews';
import { fallbackReviews } from '../lib/reviews';
import 'swiper/css';
import 'swiper/css/pagination';

function renderRating(rating = 5): string {
  const rounded = Math.max(1, Math.min(5, Math.round(rating)));
  return `${rounded}/5`;
}

export default function ReviewsSlider() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [sourceName, setSourceName] = useState<string>('Pacientes');

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
      } catch {
        // Keep fallback content if API is unavailable.
      }
    }

    loadReviews();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="reviews-wrapper">
      <p className="reviews-source">Resenas de {sourceName}</p>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={reviews.length > 1}
        spaceBetween={18}
        breakpoints={{
          0: { slidesPerView: 1 },
          840: { slidesPerView: 2 }
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={`${review.author_name}-${index}`}>
            <article className="review-card">
              <p className="review-stars">Valoracion: {renderRating(review.rating)}</p>
              <p className="review-text">"{review.text || 'Opinion compartida por paciente.'}"</p>
              <p className="review-author">{review.author_name || 'Paciente'}</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
