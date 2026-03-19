import Image from 'next/image';
import ReviewsSlider from '../components/ReviewsSlider';
import SectionNavObserver from '../components/SectionNavObserver';
import HeroPhoto from '../components/HeroPhoto';
import SiteFooter from '../components/SiteFooter';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '34640937567';
const WHATSAPP_TEXT =
  process.env.NEXT_PUBLIC_WHATSAPP_TEXT ||
  'Hola%20quiero%20pedir%20una%20cita%20en%20Cl%C3%ADnica%20Dental%20Don%20Benito';
const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '924857567';
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || '924 857 567';
const CLINIC_EMAIL = process.env.NEXT_PUBLIC_CLINIC_EMAIL || 'hola@clinicadentaldonbenito.com';
const TOPBAR_PHONE_NUMBER = process.env.NEXT_PUBLIC_TOPBAR_PHONE_NUMBER || '640937567';
const TOPBAR_PHONE_DISPLAY = process.env.NEXT_PUBLIC_TOPBAR_PHONE_DISPLAY || '640 937 567';
const INSTAGRAM_URL = 'https://www.instagram.com/clinicadentaldonbenito/';
const MAPS_URL = 'https://maps.app.goo.gl/BuxNonTSfCGziVtaA';
const CLINIC_ADDRESS = 'C/ Ayala, 4, 06400 Don Benito, Badajoz';

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;
const phoneUrl = `tel:${PHONE_NUMBER}`;
const mailUrl = `mailto:${CLINIC_EMAIL}`;
const topBarPhoneUrl = `tel:${TOPBAR_PHONE_NUMBER}`;

function getServiceWhatsappUrl(serviceName: string): string {
  const message = encodeURIComponent(`Deseo reservar una cita para ${serviceName}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

const features = [
  {
    title: 'Implantología dental',
    icon: '/icons/implant-dark.svg',
    description:
      'Reponemos piezas perdidas con implantes biocompatibles y planificación digital para recuperar función, estabilidad y estética natural.'
  },
  {
    title: 'Cirugía oral y periodontal',
    icon: '/icons/oral-surgery.svg',
    description:
      'Realizamos intervenciones de encías, hueso y piezas complejas con técnicas mínimamente invasivas para una recuperación más cómoda.'
  },
  {
    title: 'Ortodoncia invisible y tradicional',
    icon: '/icons/orthodontics.svg',
    iconSize: 'large',
    description:
      'Corregimos alineación y mordida con alineadores transparentes o brackets, según lo que mejor encaje con tu caso y tu ritmo.'
  },
  {
    title: 'Periodoncia y cuidado de encías',
    icon: '/icons/periodontics.svg',
    description:
      'Tratamos gingivitis y periodontitis para frenar su avance, proteger el soporte dental y mejorar la salud bucodental global.'
  },
  {
    title: 'Odontología general y preventiva',
    icon: '/icons/general-dentistry.svg',
    iconSize: 'large',
    description:
      'Incluimos revisiones, limpiezas y tratamientos conservadores para detectar a tiempo cualquier problema y evitar complicaciones.'
  },
  {
    title: 'Estética dental y blanqueamiento',
    icon: '/icons/teeth-aesthetics.svg',
    description:
      'Mejoramos color, forma y armonía de la sonrisa con procedimientos personalizados que respetan la estructura natural de tus dientes.'
  },
  {
    title: 'Odontopediatría',
    icon: '/icons/pediatric-care.svg',
    description:
      'Atendemos a niñas y niños en un entorno amable, centrado en prevención, educación y tratamientos adaptados a cada etapa.'
  },
  {
    title: 'Diseño digital de sonrisa (DDS)',
    icon: '/icons/digital-smile-design.svg',
    description:
      'Planificamos tu nueva sonrisa de forma digital para visualizar resultados antes de empezar y tomar decisiones con seguridad.'
  },
  {
    title: 'Test bacteriológico oral',
    icon: '/icons/oral-bacteria-test.svg',
    description:
      'Analizamos la flora oral para prevenir y tratar patologías con mayor precisión, ajustando el plan a tu perfil microbiológico.'
  },
  {
    title: 'Atención para pacientes con odontofobia',
    icon: '/icons/dental-phobia-care.svg',
    description:
      'Aplicamos un protocolo específico para reducir ansiedad y recuperar la confianza en consulta desde una atención pausada y cercana.'
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

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4.5 6.5h15a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16V8a1.5 1.5 0 0 1 1.5-1.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m4 7 8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
            <a href="#about">El Equipo</a>
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

            <HeroPhoto />
          </div>
          <WaveDivider variant="home" />
        </section>

        <section className="section section-services" id="services">
          <div className="inner services-layout">
            <div className="services-top">
              <div className="services-intro">
                <h2>Nuestros servicios dentales, modernos y adaptados a ti</h2>
                <p className="lead">
                  En Clínica Dental Don Benito desarrollamos servicios completos, desde revisiones
                  preventivas hasta tratamientos avanzados y a la última, siempre con planes personalizados y
                  seguimiento cercano.
                  <br />
                  La satisfacción de nuestros pacientes guía cada decisión: buscamos que vivas una
                  atención cómoda, con resultados fiables y con la confianza que transmitimos a nuestros clientes.
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
                  <div className="service-card-visual" aria-hidden="true">
                    <span
                      className={`service-card-icon${feature.iconSize === 'large' ? ' service-card-icon-large' : ''}`}
                    >
                      {feature.icon ? (
                        <Image
                          src={feature.icon}
                          alt=""
                          width={feature.iconSize === 'large' ? 135 : 100}
                          height={feature.iconSize === 'large' ? 135 : 100}
                          className={`service-card-icon-image${feature.iconSize === 'large' ? ' service-card-icon-image-large' : ''}`}
                        />
                      ) : (
                        '+'
                      )}
                    </span>
                  </div>
                  <div className="service-card-content">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                  <a
                    className="service-book-btn"
                    href={getServiceWhatsappUrl(feature.title)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Reserva cita
                  </a>
                </article>
              ))}
            </div>
          </div>
          <WaveDivider variant="services" />
        </section>

        <section className="section section-about" id="about">
          <div className="inner about-grid">
            <div>
              <h2>El Equipo</h2>
              <p className="lead">
                En Clínica Dental Don Benito hemos formado un equipo liderado por mujeres con una idea
                muy clara: ofrecer una atención distinta, donde cada persona se sienta atendida con calma,
                comprendida desde el primer momento y tratada con el respeto que merece.
              </p>
              <p className="lead">
                Nuestra labor va más allá de resolver problemas dentales; trabajamos para que la salud
                bucodental contribuya de verdad a tu bienestar, tu confianza y tu calidad de vida.
              </p>
            </div>
            <div className="about-cards">
              <article className="reveal-on-scroll" style={{ ['--reveal-delay' as string]: '0ms' }}>
                <h3>Cercanía desde la primera visita</h3>
                <p>Queremos que entres en consulta con tranquilidad y encuentres un trato humano, claro y sereno.</p>
              </article>
              <article className="reveal-on-scroll" style={{ ['--reveal-delay' as string]: '120ms' }}>
                <h3>Atención que acompaña</h3>
                <p>No nos limitamos al tratamiento: estamos a tu lado para orientarte y hacerte sentir segura en cada paso.</p>
              </article>
              <article className="reveal-on-scroll" style={{ ['--reveal-delay' as string]: '240ms' }}>
                <h3>Salud oral con impacto real</h3>
                <p>Entendemos la odontología como una forma de mejorar tu día a día, no solo como una intervención puntual.</p>
              </article>
            </div>
            <div className="about-gallery">
              <figure className="about-gallery-item reveal-on-scroll" style={{ ['--reveal-delay' as string]: '60ms' }}>
                <Image src="/team-1.webp" alt="Equipo de Clínica Dental Don Benito en consulta" width={1080} height={1350} />
              </figure>
              <figure className="about-gallery-item reveal-on-scroll" style={{ ['--reveal-delay' as string]: '180ms' }}>
                <Image src="/team-2.webp" alt="Profesional de Clínica Dental Don Benito atendiendo a una paciente" width={1080} height={1350} />
              </figure>
              <figure className="about-gallery-item reveal-on-scroll" style={{ ['--reveal-delay' as string]: '300ms' }}>
                <Image src="/team-3.webp" alt="Detalle del equipo de Clínica Dental Don Benito en la clínica" width={1080} height={1350} />
              </figure>
            </div>
          </div>
          <WaveDivider variant="about" />
        </section>

        <section className="section section-philosophy" id="philosophy-values">
          <div className="inner">
            <div className="philosophy-intro">
              <h2>Una manera de cuidar basada en confianza, prevención y excelencia</h2>
              <p className="lead">
                En Clínica Dental Don Benito entendemos que una sonrisa sana y armónica no depende solo
                de resolver un problema puntual ni de contar con buena tecnología. También necesita un
                trato cercano, explicaciones claras y la tranquilidad de saber que estás en manos de un
                equipo que cuida de ti con criterio y honestidad.
              </p>
            </div>
            <p>
              Nuestra forma de trabajar une odontología actual, planificación personalizada y una
              atención serena desde la primera visita. Estudiamos cada caso con una mirada global para
              combinar prevención, diagnóstico preciso, funcionalidad y estética sin perder de vista lo
              más importante: conservar al máximo la salud natural de tu boca y ayudarte a sentirte
              segura durante todo el proceso.
            </p>
            <p>
              Por eso hablamos de filosofía y valores, no solo de tratamientos. Lo que hacemos cada día
              se apoya en principios muy concretos que definen cómo escuchamos, cómo explicamos, cómo
              aplicamos la tecnología y cómo acompañamos a cada paciente a largo plazo.
            </p>
            <div className="values-row">
              <article className="reveal-on-scroll" style={{ ['--reveal-delay' as string]: '40ms' }}>
                <h3>Confianza y cercanía</h3>
                <p>
                  Creamos un entorno tranquilo, profesional y accesible para que puedas hablar con
                  libertad, sentirte escuchada y vivir cada visita con más calma y menos tensión.
                </p>
              </article>
              <article className="reveal-on-scroll" style={{ ['--reveal-delay' as string]: '120ms' }}>
                <h3>Innovación y tecnología</h3>
                <p>
                  Incorporamos diagnóstico digital y recursos avanzados que nos permiten trabajar con
                  más precisión, más seguridad y tratamientos más cómodos para cada paciente.
                </p>
              </article>
              <article className="reveal-on-scroll" style={{ ['--reveal-delay' as string]: '200ms' }}>
                <h3>Transparencia y comunicación</h3>
                <p>
                  Explicamos el diagnóstico, las alternativas de tratamiento, los tiempos y la
                  planificación económica con un lenguaje claro, sin rodeos ni sorpresas innecesarias.
                </p>
              </article>
              <article className="reveal-on-scroll" style={{ ['--reveal-delay' as string]: '280ms' }}>
                <h3>Calidad y excelencia</h3>
                <p>
                  Trabajamos con materiales contrastados, protocolos rigurosos y colaboradores de
                  confianza para lograr resultados estables, funcionales y estéticamente cuidados.
                </p>
              </article>
              <article className="reveal-on-scroll" style={{ ['--reveal-delay' as string]: '360ms' }}>
                <h3>Prevención y bienestar</h3>
                <p>
                  Damos prioridad a la revisión periódica, la higiene profesional y la educación
                  bucodental para evitar problemas mayores y proteger tu salud en el largo plazo.
                </p>
              </article>
              <article className="reveal-on-scroll" style={{ ['--reveal-delay' as string]: '440ms' }}>
                <h3>Compromiso humano</h3>
                <p>
                  Detrás de cada cita hay un equipo implicado de verdad, con vocación, empatía y
                  responsabilidad, que busca que te sientas cuidada antes, durante y después del
                  tratamiento.
                </p>
              </article>
            </div>
          </div>
          <WaveDivider variant="philosophy" />
        </section>

        <section className="section section-contact section-last" id="contact">
          <div className="inner contact-layout">
            <div className="contact-panel">
              <div className="contact-copy">
                <h2>Tu cuidado dental puede empezar hoy</h2>
                <p className="lead">
                  Si quieres valorar tu caso, resolver una molestia o planificar un tratamiento, estamos
                  disponibles para ayudarte de forma rápida y clara.
                </p>
              </div>
              <div className="contact-summary">
                <p>
                  <strong>Clínica Dental Don Benito</strong>
                </p>
                <p>C/ Ayala, 4, 06400 Don Benito, Badajoz</p>
                <p className="contact-summary-item">
                  <span className="contact-summary-icon" aria-hidden="true">
                    <PhoneIcon />
                  </span>
                  <a href={topBarPhoneUrl}>640 937 567</a>
                </p>
                <p className="contact-summary-item">
                  <span className="contact-summary-icon" aria-hidden="true">
                    <EmailIcon />
                  </span>
                  <a href={mailUrl}>{CLINIC_EMAIL}</a>
                </p>
                <p>Horario: {scheduleText}</p>
              </div>
              <div className="contact-actions">
                <a className="btn btn-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                  Hablar por WhatsApp
                </a>
                <a className="btn btn-soft" href={topBarPhoneUrl}>
                  Llamar al 640 93 75 67
                </a>
                <a className="btn btn-outline" href={mailUrl}>
                  Escribir por email
                </a>
              </div>
            </div>
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d516.1186910961178!2d-5.861203460148468!3d38.9615116389385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd145b969ecbd2cd%3A0x6ba17df8725fd07c!2sClinica%20Dental%20Don%20Benito!5e0!3m2!1sen!2ses!4v1773769368979!5m2!1sen!2ses"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                title="Mapa de Clínica Dental Don Benito"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <SectionNavObserver />

      <a
        className="floating-wa"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <span className="floating-wa-icon" aria-hidden="true">
          <Image src="/icons/whatsapp-floating.svg" alt="" width={40} height={40} />
        </span>
        <span className="floating-wa-label" aria-hidden="true">
          Contáctanos
        </span>
      </a>
    </>
  );
}
