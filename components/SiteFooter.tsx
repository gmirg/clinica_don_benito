import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-copy">
          <span aria-hidden="true">©</span>
          <span>
            2026-
            <a href="https://websyapps.es" target="_blank" rel="noreferrer">
              Websyapps
            </a>
          </span>
        </p>
        <nav className="site-footer-links" aria-label="Enlaces legales">
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/politica-de-privacidad">Política de privacidad</Link>
        </nav>
      </div>
    </footer>
  );
}
