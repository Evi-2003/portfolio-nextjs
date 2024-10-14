import React from 'react'
import { Zen_Kurenaido } from 'next/font/google'
import Link from 'next/link'
import Head from 'next/head'
import NavButton from './NavButton'
import NavList from './NavList'
const zen_kurenaido = Zen_Kurenaido({
  weight: '400',
  subsets: ['latin'],
})

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
    next: { revalidate: 10 },
  }).then((res) => res.json())

  return data
}

const Header = async ({ lng }: { lng: string }) => {
  const lngFormatted = lng === 'en-US' ? 'en' : 'nl'
  const { allPaginas } = await getNavItems(lngFormatted)

  return (
    <header className={'flex w-full items-center justify-center my-10 ' + zen_kurenaido.className}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <nav className="relative py-4 px-3 items-center justify-center flex flex-col lg:flex-row gap-5 bg-neutral-100 rounded-2xl text-stone-950 shadow dark:bg-gray-800">
        <NavList allPaginas={allPaginas} lng={lng} />
      </nav>
    </header>
  )
}

export default Header
