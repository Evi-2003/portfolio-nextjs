import type { Metadata } from 'next'

import './globals.css'
import Header from './components/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl-NL">
      <body className={'flex flex-col items-center justify-center bg-indigo-100 dark:bg-neutral-900 pb-5 '}>
        <Header />
        {children}
      </body>
    </html>
  )
}
