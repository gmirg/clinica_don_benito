export type Review = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
};

export type ReviewsPayload = {
  place_name: string;
  rating?: number;
  user_ratings_total?: number;
  google_maps_url?: string;
  reviews: Review[];
  cached?: boolean;
};

export const fallbackReviews: Review[] = [
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
