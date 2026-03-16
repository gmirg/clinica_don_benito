import type { Metadata } from 'next';
import './globals.css';

const appStage = process.env.APP_STAGE || 'staging';
const isProduction = appStage === 'production';
const siteUrl = process.env.SITE_URL || 'https://staging.example.com';

export const metadata: Metadata = {
  title: 'Clinica Dental Don Benito',
  description: 'Odontologia integral para toda la familia en Don Benito.',
  metadataBase: new URL(siteUrl),
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
