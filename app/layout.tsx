import '@/app/globals.css';
import Header from '@/app/components/Header';
import NavProvider from '@/app/components/providers/NavProvider';
import { GeistSans } from 'geist/font/sans';
import PlausibleProvider from 'next-plausible';

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const { children } = props;

  return (
    <PlausibleProvider domain="eviwammes.dev">
      <NavProvider>
        <html lang="nl-NL">
          <head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
          </head>
          <body
            className={`flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-gray-100 px-12 pb-5
              md:px-3 dark:from-neutral-900 dark:to-neutral-950 ${GeistSans.className}`}
          >
            <Header lng={'en-US'} />
            <main className="mx-auto w-full max-w-screen-lg">{children}</main>
          </body>
        </html>
      </NavProvider>
    </PlausibleProvider>
  );
}
