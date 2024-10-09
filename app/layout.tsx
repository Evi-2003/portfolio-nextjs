import type { Metadata } from 'next'

import './globals.css'
import Header from './components/Header'
import PlausibleProvider from 'next-plausible'
import NavProvider from './components/providers/NavProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PlausibleProvider domain="eviwammes.dev">
      <NavProvider>
        <html lang="nl-NL">
          <body className={'flex flex-col items-center from-white to-gray-100 bg-gradient-to-b min-h-screen dark:from-neutral-900 dark:to-neutral-950 pb-5 '}>
            <Header />
            {children}
          </body>
        </html>
      </NavProvider>
    </PlausibleProvider>
  )
}
