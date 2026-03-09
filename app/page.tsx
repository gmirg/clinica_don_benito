import Image from 'next/image';
import ReviewsSlider from '../components/ReviewsSlider';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '34600000000';
const WHATSAPP_TEXT =
  process.env.NEXT_PUBLIC_WHATSAPP_TEXT ||
  'Hola%20quiero%20pedir%20una%20cita%20en%20Clinica%20Dental%20Don%20Benito';

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

const features = [
  {
    title: 'Odontologia general',
    description: 'Prevencion, diagnostico y tratamientos para mantener una boca sana.'
  },
  {
    title: 'Implantes y protesis',
    description: 'Soluciones duraderas para recuperar funcionalidad y estetica.'
  },
  {
    title: 'Estetica dental',
    description: 'Blanqueamientos, carillas y armonia para una sonrisa natural.'
  },
  {
    title: 'Atencion familiar',
    description: 'Planes personalizados para ninos, adultos y pacientes senior.'
  }
];

export default function Home() {
  return (
    <>
      <main className="site-shell">
        <header className="hero" id="inicio">
          <Image
            className="hero-logo"
            src="/logo-don-benito.png"
            alt="Clinica Dental Don Benito"
            width={1200}
            height={343}
            priority
          />
          <p className="badge">Clinica Dental en Don Benito</p>
          <h1>Tu sonrisa cuidada con precision clinica y trato humano.</h1>
          <p className="hero-copy">
            One page optimizada para captar citas por WhatsApp, mostrar resenas reales y presentar
            tus servicios de forma clara en movil y escritorio.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              Pedir cita por WhatsApp
            </a>
            <a className="btn btn-secondary" href="#resenas">
              Ver resenas
            </a>
          </div>
        </header>

        <section className="services" id="servicios">
          <h2>Servicios clave</h2>
          <div className="services-grid">
            {features.map((feature) => (
              <article className="service-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="reviews" id="resenas">
          <div className="section-head">
            <h2>Resenas que generan confianza</h2>
            <p>Mostradas desde Google Places API con cache en Next.js para mejor rendimiento.</p>
          </div>
          <ReviewsSlider />
        </section>

        <section className="contact" id="contacto">
          <h2>Agenda tu valoracion</h2>
          <p>Escribenos y te ayudamos a encontrar el tratamiento que mejor se adapta a ti.</p>
          <a className="btn btn-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            Contactar ahora
          </a>
        </section>
      </main>

      <a className="floating-wa" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        WhatsApp
      </a>
    </>
  );
}
