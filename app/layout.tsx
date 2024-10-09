import type { Metadata } from 'next'

import './globals.css'
import Header from './components/Header'
import PlausibleProvider from 'next-plausible'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PlausibleProvider domain="eviwammes.dev">
      <html lang="nl-NL">
        <body className={'flex flex-col items-center justify-center bg-indigo-100 dark:bg-neutral-900 pb-5 '}>
          <Header />
          {children}
        </body>
      </html>
    </PlausibleProvider>
  )
}
