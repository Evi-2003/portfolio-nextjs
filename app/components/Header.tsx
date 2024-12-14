import { Zen_Kurenaido } from 'next/font/google';
import Head from 'next/head';
import React from 'react';
import NavList from './NavList';

const zenKurenaido = Zen_Kurenaido({
  weight: '400',
  subsets: ['latin'],
});

async function getNavItems(lng: string) {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
          query getNavItems {
            allPaginas (locale: ${lng}) {
              slug
              label
              id
            }
          }
  `,
    }),
  }).then((res) => res.json());

  return data;
}

const Header = async ({ lng }: { lng: string }) => {
  const lngFormatted = lng === 'en-US' ? 'en' : 'nl';
  const { allPaginas } = await getNavItems(lngFormatted);

  return (
    <header className={'my-10 flex w-full max-w-screen-lg items-center justify-between ' + zenKurenaido.className}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <nav
        className="relative flex w-full flex-col items-center justify-between gap-5 rounded-2xl bg-neutral-100 px-3 py-4
          text-stone-950 shadow lg:flex-row dark:bg-neutral-800"
      >
        <NavList allPaginas={allPaginas} lng={lng} />
      </nav>
    </header>
  );
};

export default Header;
