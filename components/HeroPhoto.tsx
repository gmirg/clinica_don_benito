'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HeroPhoto() {
  const [isReady, setIsReady] = useState(false);

  return (
    <figure className={`hero-photo${isReady ? ' is-ready' : ''}`} aria-label="Clínica Dental Don Benito">
      <Image
        src="/clinica-dental-don-benito.webp"
        alt="Equipo de Clínica Dental Don Benito"
        width={1200}
        height={900}
        className="hero-photo-image"
        priority
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 980px) 86vw, 40vw"
        onLoad={() => setIsReady(true)}
      />
    </figure>
  );
}
