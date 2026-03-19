import type { Metadata } from 'next';
import './globals.css';

const appStage = process.env.APP_STAGE || 'staging';
const isProduction = appStage === 'production';
const siteUrl = process.env.SITE_URL || 'https://staging.example.com';
const siteTitle = 'Clínica Dental Don Benito';
const siteDescription = 'Odontología integral para toda la familia en Don Benito.';

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  applicationName: siteTitle,
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteTitle} - Odontología integral para toda la familia`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/opengraph-image']
  },
  robots: isProduction
    ? {
        index: true,
        follow: true
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
          'max-image-preview': 'none',
          'max-snippet': -1,
          'max-video-preview': -1
        }
      },
  icons: {
    icon: [{ url: '/favicon.webp', type: 'image/webp' }],
    shortcut: '/favicon.webp',
    apple: '/favicon.webp'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
