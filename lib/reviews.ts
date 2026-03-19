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

export const manualReviews: Review[] = [
  {
    author_name: 'Joaquim Chagas',
    rating: 5,
    text: 'Desde el primer momento el trato fue cercano, amable y muy profesional. Me hicieron sentir tranquilo y escuchado en todo momento, explicándome todo con mucha paciencia y claridad. Se nota que les importa de verdad el bienestar del paciente y no solo el tratamiento. Salí muy satisfecho y con la sensación de haber estado en buenas manos. Sin duda, una clínica totalmente recomendable. Volveré.',
    relative_time_description: 'Hace 3 meses'
  },
  {
    author_name: 'Raul Muñoz Piñas',
    rating: 5,
    text: 'Gran equipo, magnífico trato. Entré con miedo al dentista y salí deseando volver. Grandes profesionales. El trato de Tenti muy bueno, gracias.',
    relative_time_description: 'Hace 3 meses'
  },
  {
    author_name: 'Efrén García Fernández',
    rating: 5,
    text: 'Me han dado un trato excelente. Me explicaron los problemas que tenía y me dieron la solución, un presupuesto ajustado, y todo el trabajo con gran profesionalidad.',
    relative_time_description: 'Hace 4 meses'
  },
  {
    author_name: 'Javi Paz',
    rating: 5,
    text: 'Excelente trato. Tenti acompaña desde que entras por la puerta. Fui a reponerme una muela y todo fue rápido, bien explicado y me hicieron el seguimiento.',
    relative_time_description: 'Hace 4 meses'
  },
  {
    author_name: 'Adrian Dragachi',
    rating: 5,
    text: 'Una clínica de 10. Un trato muy cercano y profesional, cuidando hasta el último detalle. Trabajan de forma muy cuidadosa y profesional con la mayor rapidez posible. De las mejores clínicas, si no la mejor, que probé hasta ahora. La recomiendo sin duda.',
    relative_time_description: 'Hace 4 meses'
  },
  {
    author_name: 'rafaela duran ballesteros',
    rating: 5,
    text: 'Estoy contenta, muy buena atención. La recomiendo.',
    relative_time_description: 'Hace 3 semanas'
  },
  {
    author_name: 'Ylenia Moto Benitez',
    rating: 5,
    text: 'Encantadoras todas. Te asesoran genial y yo, que tengo mucho miedo, siempre me calman con mucha paciencia.',
    relative_time_description: 'Hace 3 semanas'
  },
  {
    author_name: 'paqui fernandez gomez',
    rating: 5,
    text: 'Ya llevo cuatro visitas, dos endodoncias y una limpieza, y en todas me han cuidado mucho. Tenti y su equipo son grandes profesionales y se nota que aman su trabajo.',
    relative_time_description: 'Hace 4 meses'
  },
  {
    author_name: 'Arrofrut Arrofrut',
    rating: 5,
    text: 'Es la clínica dentista que mejor me han tratado en mi vida. Son muy profesionales y cuidan a sus pacientes como si fueran familia. La recomiendo siempre.',
    relative_time_description: 'Hace 4 meses'
  },
  {
    author_name: 'Eli Zubiria',
    rating: 5,
    text: 'Fui a hacerme una limpieza con Tenti y salí muy contenta con el resultado. Además apenas me dolió, y eso que casi siempre me duele. Las instalaciones me parecieron muy limpias, cuidadas y modernas.',
    relative_time_description: 'Hace 4 meses'
  },
  {
    author_name: 'Sheila Garcia Porras',
    rating: 5,
    text: 'El trato y el trabajo, maravillosos. Sin lugar a duda volveré. Gracias.',
    relative_time_description: 'Hace 3 semanas'
  },
  {
    author_name: 'Carmen Vera',
    rating: 5,
    text: 'Más de 5 años con ellos y mejor imposible.',
    relative_time_description: 'Hace 3 semanas'
  },
  {
    author_name: 'Antonio Moreno Garrido',
    rating: 5,
    text: 'Cercanía, tranquilidad y buen trabajo.',
    relative_time_description: 'Hace 3 meses'
  }
];

export const manualReviewsPayload: ReviewsPayload = {
  place_name: 'Clinica Dental Don Benito',
  google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Clinica+Dental+Don+Benito+Don+Benito',
  reviews: manualReviews
};
