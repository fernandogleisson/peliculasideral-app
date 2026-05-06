import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://peliculasideral.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Pelicula Sideral · Astrologia Poética',
    template: '%s · Pelicula Sideral',
  },
  description:
    'App de astrologia em português, inglês e espanhol — interpretações brand voice de Victor Dhornelas, atriz e astrólogo brasileiro.',
  applicationName: 'Pelicula Sideral',
  authors: [{ name: 'Victor Dhornelas' }],
  keywords: ['astrologia', 'mapa natal', 'horóscopo', 'astrologia poética', 'Victor Dhornelas'],
  openGraph: {
    title: 'Pelicula Sideral',
    description:
      'Sua película sideral começa aqui. Mapa natal, leituras semanais, interpretações poéticas em PT/EN/ES.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Pelicula Sideral',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pelicula Sideral',
    description:
      'Astrologia poética em PT/EN/ES. Mapa natal, leituras semanais, interpretações brand-voice.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
