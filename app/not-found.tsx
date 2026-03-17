import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';

export default function NotFound() {
  return (
    <>
      <main className="not-found-page">
        <div className="not-found-shell">
          <div className="not-found-card">
            <Link href="/" className="not-found-brand" aria-label="Volver al inicio">
              <Image src="/logo-don-benito.png" alt="Clínica Dental Don Benito" width={340} height={97} priority />
            </Link>

            <p className="not-found-code">404</p>
            <h1>Esta página se nos ha escapado de la consulta</h1>
            <p className="not-found-copy">
              La dirección que has abierto no existe o ya no está disponible. Puedes volver a la página
              principal y seguir navegando desde allí.
            </p>

            <div className="not-found-actions">
              <Link href="/" className="btn btn-primary">
                Volver a la home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
