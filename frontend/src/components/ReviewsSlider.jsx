import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { getGoogleReviews } from '../api';
import 'swiper/css';
import 'swiper/css/pagination';

const fallbackReviews = [
  {
    author_name: 'Paciente local',
    rating: 5,
    text: 'Excelente trato y explicaciones claras durante todo el tratamiento.'
  },
  {
    author_name: 'Familia Don Benito',
    rating: 5,
    text: 'Muy buena atencion con ninos y adultos. Recomendable al 100%.'
  },
  {
    author_name: 'Paciente habitual',
    rating: 5,
    text: 'Clinica moderna, puntualidad y resultados muy naturales.'
  }
];

function renderStars(rating = 5) {
  const rounded = Math.max(1, Math.min(5, Math.round(rating)));
  return '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
}

export default function ReviewsSlider() {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [sourceName, setSourceName] = useState('Pacientes');

  useEffect(() => {
    let mounted = true;

    async function loadReviews() {
      try {
        const data = await getGoogleReviews();
        if (!mounted || !Array.isArray(data.reviews) || data.reviews.length === 0) {
          return;
        }

        setReviews(data.reviews);
        setSourceName(data.place_name || 'Google Reviews');
      } catch {
        // Keep fallback data when API is unavailable.
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
              <p className="review-stars">{renderStars(review.rating)}</p>
              <p className="review-text">"{review.text || 'Opinion compartida por paciente.'}"</p>
              <p className="review-author">{review.author_name || 'Paciente'}</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
