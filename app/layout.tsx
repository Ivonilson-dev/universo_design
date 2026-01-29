// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SimpleNotificationManager from './components/ui/SimpleNotification';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Universo Design - Painel Administrativo',
  description: 'Sistema de gerenciamento de conteúdo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-gray-50">
          {children}
          <SimpleNotificationManager />
        </div>
      </body>
    </html>
  );
}