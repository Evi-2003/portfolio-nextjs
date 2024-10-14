import type { Metadata } from 'next';
import './globals.css';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import PlausibleProvider from 'next-plausible';
import Header from './components/Header';
import NavProvider from './components/providers/NavProvider';

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <PlausibleProvider domain="eviwammes.dev">
      <NavProvider>
        <html lang="nl-NL">
          <body
            className={`flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-gray-100 pb-5
              dark:from-neutral-900 dark:to-neutral-950 ${GeistSans.className}`}
          >
            <Header lng={params.lang} />
            {children}
          </body>
        </html>
      </NavProvider>
    </PlausibleProvider>
  );
}
