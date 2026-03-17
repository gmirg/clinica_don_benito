import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from './SiteFooter';

type LegalPageLayoutProps = {
  title: string;
  intro: string;
  children: React.ReactNode;
};

export default function LegalPageLayout({ title, intro, children }: LegalPageLayoutProps) {
  return (
    <>
      <main className="legal-page">
        <div className="legal-shell">
          <Link href="/" className="legal-brand" aria-label="Volver a la página principal">
            <Image src="/logo-don-benito.png" alt="Clínica Dental Don Benito" width={340} height={97} priority />
          </Link>

          <header className="legal-hero">
            <p className="legal-eyebrow">Información legal</p>
            <h1>{title}</h1>
            <p className="legal-intro">{intro}</p>
          </header>

          <div className="legal-card">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
