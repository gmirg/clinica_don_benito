import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Clinica Dental Don Benito',
  description: 'Odontologia integral para toda la familia en Don Benito.'
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
