import Image from 'next/image';
import ReviewsSlider from '../components/ReviewsSlider';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '34600000000';
const WHATSAPP_TEXT =
  process.env.NEXT_PUBLIC_WHATSAPP_TEXT ||
  'Hola%20quiero%20pedir%20una%20cita%20en%20Cl%C3%ADnica%20Dental%20Don%20Benito';
const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '924857567';
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || '924 857 567';
const CLINIC_EMAIL = process.env.NEXT_PUBLIC_CLINIC_EMAIL || 'hola@clinicadentaldonbenito.es';
const TOPBAR_PHONE_NUMBER = process.env.NEXT_PUBLIC_TOPBAR_PHONE_NUMBER || '640937567';
const TOPBAR_PHONE_DISPLAY = process.env.NEXT_PUBLIC_TOPBAR_PHONE_DISPLAY || '640 937 567';
const INSTAGRAM_URL = 'https://www.instagram.com/clinicadentaldonbenito/';
const MAPS_URL = 'https://maps.app.goo.gl/BuxNonTSfCGziVtaA';
const CLINIC_ADDRESS = 'C/ Ayala, 4, 06400 Don Benito, Badajoz';

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;
const phoneUrl = `tel:${PHONE_NUMBER}`;
const mailUrl = `mailto:${CLINIC_EMAIL}`;
const topBarPhoneUrl = `tel:${TOPBAR_PHONE_NUMBER}`;

const features = [
  {
    title: 'Implantología',
    description: 'Recupera funcionalidad y estética con planes adaptados a cada caso clínico.'
  },
  {
    title: 'Cirugía oral',
    description: 'Procedimientos precisos, seguimiento cercano y una recuperación guiada paso a paso.'
  },
  {
    title: 'Ortodoncia',
    description: 'Opciones invisibles y tradicionales para mejorar alineación, mordida y confort.'
  },
  {
    title: 'Estética dental',
    description: 'Tratamientos diseñados para lograr una sonrisa natural, equilibrada y saludable.'
  },
  {
    title: 'Periodoncia',
    description: 'Cuidado integral de encías para prevenir molestias y proteger la salud bucodental.'
  },
  {
    title: 'Odontología general',
    description: 'Prevención, diagnóstico y tratamiento con tecnología actual y enfoque humano.'
  }
];

const waveShapes = {
  home: {
    mid: 'M0,0 H1200 V136 C1062,82 904,96 764,126 C622,158 504,190 352,178 C214,166 102,126 0,116 Z',
    upper: 'M0,0 H1200 V90 C1062,76 902,84 764,100 C624,118 506,136 352,130 C214,122 104,96 0,92 Z'
  },
  services: {
    mid: 'M0,0 H1200 V142 C1040,168 900,132 760,114 C620,96 480,118 330,152 C210,178 94,168 0,150 Z',
    upper: 'M0,0 H1200 V102 C1048,118 912,98 772,88 C630,78 492,96 338,126 C216,150 98,144 0,130 Z'
  },
  about: {
    mid: 'M0,0 H1200 V138 C1050,124 900,156 760,186 C608,214 452,196 308,156 C200,126 92,118 0,126 Z',
    upper: 'M0,0 H1200 V92 C1048,88 900,114 760,136 C620,158 462,148 322,120 C204,98 96,92 0,98 Z'
  },
  philosophy: {
    mid: 'M0,0 H1200 V134 C1068,90 920,84 780,106 C620,132 500,174 360,192 C236,206 110,182 0,154 Z',
    upper: 'M0,0 H1200 V86 C1068,62 920,64 782,86 C630,112 512,146 370,154 C242,162 112,142 0,118 Z'
  }
} as const;

type WaveShapeKey = keyof typeof waveShapes;

const weekdayLabels = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const businessHoursByWeekday: Record<number, string> = {
  0: 'Cerrado',
  1: '10:00-14:00, 16:00-20:00',
  2: '10:00-14:00, 16:00-20:00',
  3: '10:00-14:00, 16:00-20:00',
  4: '10:00-14:00, 16:00-20:00',
  5: '9:00-15:00',
  6: 'Cerrado'
};

function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function addUtcDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

function getEasterSundayUtc(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(Date.UTC(year, month - 1, day));
}

function getExtremaduraHolidays(year: number): Set<string> {
  const holidays = new Set<string>();
  const fixedHolidays: Array<[number, number]> = [
    [1, 1],
    [1, 6],
    [5, 1],
    [8, 15],
    [9, 8],
    [10, 12],
    [11, 1],
    [12, 6],
    [12, 8],
    [12, 25]
  ];

  fixedHolidays.forEach(([month, day]) => {
    holidays.add(toDateKey(year, month, day));

    const fixedDate = new Date(Date.UTC(year, month - 1, day));
    if (fixedDate.getUTCDay() === 0) {
      const observedDate = addUtcDays(fixedDate, 1);
      holidays.add(toDateKey(year, observedDate.getUTCMonth() + 1, observedDate.getUTCDate()));
    }
  });

  const easterSunday = getEasterSundayUtc(year);
  const maundyThursday = addUtcDays(easterSunday, -3);
  const goodFriday = addUtcDays(easterSunday, -2);

  holidays.add(toDateKey(year, maundyThursday.getUTCMonth() + 1, maundyThursday.getUTCDate()));
  holidays.add(toDateKey(year, goodFriday.getUTCMonth() + 1, goodFriday.getUTCDate()));

  return holidays;
}

function getMadridDateData(now: Date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(now);

  const year = Number(parts.find((part) => part.type === 'year')?.value);
  const month = Number(parts.find((part) => part.type === 'month')?.value);
  const day = Number(parts.find((part) => part.type === 'day')?.value);
  const utcDate = new Date(Date.UTC(year, month - 1, day));

  return {
    year,
    month,
    day,
    weekdayIndex: utcDate.getUTCDay(),
    dateKey: toDateKey(year, month, day)
  };
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 22c4.2-5.2 6.3-8.7 6.3-11.5A6.3 6.3 0 1 0 5.7 10.5c0 2.8 2.1 6.3 6.3 11.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10.2" r="2.2" fill="currentColor" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.2 3.2h3.2l1.2 4.1-2.1 1.4a14 14 0 0 0 5.7 5.7l1.4-2.1 4.2 1.2v3.3A2.2 2.2 0 0 1 18.6 19C10.7 19 5 13.3 5 5.4a2.2 2.2 0 0 1 2.2-2.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

function WaveDivider({ variant }: { variant: WaveShapeKey }) {
  const shape = waveShapes[variant];

  return (
    <div className="section-wave" aria-hidden="true">
      <svg viewBox="0 0 1200 220" preserveAspectRatio="none">
        <rect className="wave-next" x="0" y="0" width="1200" height="220" />
        <path className="wave-mid" d={shape.mid} />
        <path className="wave-upper" d={shape.upper} />
      </svg>
    </div>
  );
}

export default function Home() {
  const madridToday = getMadridDateData();
  const extremaduraHolidays = getExtremaduraHolidays(madridToday.year);
  const isHoliday = extremaduraHolidays.has(madridToday.dateKey);
  const dayLabel = weekdayLabels[madridToday.weekdayIndex];
  const scheduleText = isHoliday
    ? `${dayLabel} Cerrado (festivo en Extremadura)`
    : `${dayLabel} ${businessHoursByWeekday[madridToday.weekdayIndex]}`;

  return (
    <>
      <header className="site-header">
        <div className="top-bar">
          <div className="top-bar-inner">
            <a
              className="top-bar-item top-bar-location"
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir ubicación en Google Maps"
            >
              <span className="top-bar-icon">
                <LocationIcon />
              </span>
              <span>{CLINIC_ADDRESS}</span>
            </a>

            <p className="top-bar-item top-bar-schedule">
              <span className="top-bar-icon">
                <PhoneIcon />
              </span>
              <a href={topBarPhoneUrl}>{TOPBAR_PHONE_DISPLAY}</a>
              <span className="top-bar-separator">-</span>
              <span>Horario: {scheduleText}</span>
            </p>

            <a
              className="top-bar-item top-bar-instagram"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <span className="top-bar-icon">
                <InstagramIcon />
              </span>
            </a>
          </div>
        </div>

        <div className="nav-shell">
          <a href="#home" className="brand">
            <Image src="/logo-don-benito.png" alt="Clinica Dental Don Benito" width={460} height={132} priority />
          </a>

          <input type="checkbox" id="nav-menu-toggle" className="nav-toggle" />
          <label className="nav-toggle-button" htmlFor="nav-menu-toggle" aria-label="Abrir menú principal">
            <span />
            <span />
            <span />
          </label>

          <nav className="main-nav" aria-label="Navegación principal">
            <a href="#home">Inicio</a>
            <a href="#services">Servicios</a>
            <a href="#about">Sobre nosotras</a>
            <a href="#philosophy-values">Filosofía y valores</a>
            <a href="#contact">Contacto</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="section section-home" id="home">
          <div className="inner hero-grid">
            <div className="hero-copy">
              <h1>Siempre contigo</h1>
              <p>
                Somos una clínica dental liderada por mujeres, pensada para acompañarte en cada etapa
                de tu salud bucodental.
                <br />
                Unimos criterio clínico, tecnología de última generación y una comunicación clara para
                ofrecerte soluciones eficaces en un entorno cercano, tranquilo y seguro desde la primera
                visita.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                  Pide cita por WhatsApp
                </a>
                <a className="btn btn-soft hero-call-mobile" href={phoneUrl}>
                  Llamar ahora
                </a>
              </div>
            </div>

            <figure className="hero-photo" aria-label="Clínica Dental Don Benito">
              <Image
                src="/clinica-dental-don-benito.webp"
                alt="Equipo de Clínica Dental Don Benito"
                width={1200}
                height={900}
                className="hero-photo-image"
              />
            </figure>
          </div>
          <WaveDivider variant="home" />
        </section>

        <section className="section section-services" id="services">
          <div className="inner services-layout">
            <div className="services-top">
              <div className="services-intro">
                <h2>Tratamientos dentales adaptados a tu ritmo</h2>
                <p className="lead">
                  Combinamos experiencia clínica y metodología para ofrecer soluciones eficaces, desde
                  prevención y revisión hasta tratamientos avanzados.
                </p>
              </div>
              <aside className="reviews-block" aria-label="Reseñas de pacientes">
                <h3>Lo que valoran quienes ya se trataron con nosotras</h3>
                <ReviewsSlider />
              </aside>
            </div>

            <div className="services-grid">
              {features.map((feature) => (
                <article className="service-card" key={feature.title}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
          <WaveDivider variant="services" />
        </section>

        <section className="section section-about" id="about">
          <div className="inner about-grid">
            <div>
              <h2>Un proyecto nacido para cuidar con cercanía y rigor profesional</h2>
              <p className="lead">
                Somos un equipo femenino que entiende la odontología como una combinación de ciencia,
                escucha y acompañamiento. Cada caso se aborda con respeto, criterio médico y atención
                al detalle.
              </p>
            </div>
            <div className="about-cards">
              <article>
                <h3>Escucha activa</h3>
                <p>Primero comprendemos tu situación para definir juntas el mejor camino.</p>
              </article>
              <article>
                <h3>Decisión informada</h3>
                <p>Te mostramos alternativas reales para que elijas con tranquilidad.</p>
              </article>
              <article>
                <h3>Continuidad clínica</h3>
                <p>Seguimos tu evolución para mantener resultados funcionales y estables.</p>
              </article>
            </div>
          </div>
          <WaveDivider variant="about" />
        </section>

        <section className="section section-philosophy" id="philosophy-values">
          <div className="inner">
            <h2>Creemos en una salud bucodental que impacta en tu bienestar diario</h2>
            <div className="values-row">
              <article>
                <h3>Prevención como base</h3>
                <p>Trabajamos a tiempo para evitar problemas mayores y mantener estabilidad oral.</p>
              </article>
              <article>
                <h3>Transparencia total</h3>
                <p>Explicamos diagnóstico, proceso y evolución sin rodeos ni tecnicismos innecesarios.</p>
              </article>
              <article>
                <h3>Excelencia cercana</h3>
                <p>Unimos conocimiento tecnico y trato humano en cada cita.</p>
              </article>
            </div>
          </div>
          <WaveDivider variant="philosophy" />
        </section>

        <section className="section section-contact section-last" id="contact">
          <div className="inner contact-layout">
            <div>
              <h2>Tu siguiente paso dental puede empezar hoy</h2>
              <p className="lead">
                Si quieres valorar tu caso, resolver una molestia o planificar un tratamiento, estamos
                disponibles para ayudarte de forma rápida y clara.
              </p>
            </div>
            <div className="contact-actions">
              <a className="btn btn-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                Hablar por WhatsApp
              </a>
              <a className="btn btn-soft" href={phoneUrl}>
                Llamar al {PHONE_DISPLAY}
              </a>
              <a className="btn btn-outline" href={mailUrl}>
                Escribir por email
              </a>
            </div>
          </div>
        </section>
      </main>

      <a className="floating-wa" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        WhatsApp
      </a>
    </>
  );
}
