// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/ui/Header';
import Footer from './components/sections/FooterSection';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Universo Design - Comunicação Visual Completa',
  description: 'Banners, faixas, cartões de visita personalizados, pulseiras para eventos e muito mais. Transforme suas ideias em realidade visual!',
  keywords: 'banners, cartões de visita, comunicação visual, design gráfico, sinalização, brindes personalizados',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans bg-gray-50 text-gray-800 antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}