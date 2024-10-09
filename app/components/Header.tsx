'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Zen_Kurenaido } from 'next/font/google'
import { usePathname } from 'next/navigation'
import DarkModeSwitch from './DarkModeSwitch'
import Link from 'next/link'
import Head from 'next/head'
import { NavContext } from './providers/NavProvider'
const zen_kurenaido = Zen_Kurenaido({
  weight: '400',
  subsets: ['latin'],
})

export default function Header() {
  const currentPath = usePathname()

  const { toggleIsOpen, isNavOpen } = useContext(NavContext)

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
        <ul className="flex items-center justify-center">
          <li onClick={() => toggleIsOpen()}>
            <Link href="/" className=" lg:self-center font-bold text-3xl dark:text-white">
              &lt;evi-wammes/&gt;
            </Link>
          </li>
          <li className="self-end">
            <button onClick={() => toggleIsOpen()} className="block w-8 lg:hidden top-5 right-5 ml-5" aria-label="Open navigatie-menu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" className="dark:stroke-white stroke-gray-950" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </li>
          <li className="self-end">
            <button onClick={() => toggleIsOpen()} className="hidden block w-8 lg:hidden top-5 right-5 ml-5" aria-label="Sluit navigatie-menu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="dark:stroke-white stroke-gray-950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </li>
        </ul>
        <ul className={isNavOpen ? 'flex text-center lg:flex flex-col lg:flex-row text-xl dark:text-white gap-2' : 'hidden text-center lg:flex flex-col lg:flex-row text-xl dark:text-white gap-2'}>
          <li className={currentPath === '/' ? 'rounded-xl active py-2 px-2' : 'py-2 px-2'}>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li className={currentPath === '/projecten' ? 'rounded-xl active py-2 px-2' : 'py-2 px-2'} onClick={() => toggleIsOpen()}>
            <Link href="/projecten" className="hover:underline">
              Projecten
            </Link>
          </li>
          <li className={currentPath === '/werkervaring' ? 'rounded-xl active py-2 px-2' : 'py-2 px-2'} onClick={() => toggleIsOpen()}>
            <Link href="/werkervaring" className="hover:underline">
              Werkervaring
            </Link>
          </li>
          <li className={currentPath === '/over-mij' ? 'rounded-xl active py-2 px-2' : 'py-2 px-2'} onClick={() => toggleIsOpen()}>
            <Link href="/over-mij" className="hover:underline">
              Over mij
            </Link>
          </li>
          <li className={currentPath === '/gallery' ? 'rounded-xl active py-2 px-2' : 'py-2 px-2'} onClick={() => toggleIsOpen()}>
            <Link href="/gallery" className="hover:underline">
              Gallerij
            </Link>
          </li>
          <li className="my-2" onClick={() => toggleIsOpen()}>
            <Link href="/contact" className="hover:underline bg-gray-950 py-2 px-5 rounded-xl text-white text-bold w-full">
              Contact
            </Link>
          </li>
        </ul>

        <ul
          className={
            isNavOpen ? 'grid grid-cols-5 text-center lg:flex flex-col lg:flex-row text-xl dark:text-white gap-2' : 'hidden text-center lg:flex flex-col lg:flex-row text-xl dark:text-white gap-2'
          }
        >
          <li>
            <DarkModeSwitch />
          </li>

          <li>
            <Link href="https://github.com/Evi-2003" target="_blank" aria-label="Github van Evi Wammes">
              <button className="text-1xl rounded-xl py-2 px-3 shadow-lg font-bold hover:bg-red-500 sm:w-auto w-auto mt-5 sm:mt-0" aria-label="Github van Evi Wammes">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 dark:fill-white" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </button>
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/evi.wammes/" target="_blank" aria-label="Instagram van Evi Wammes">
              <button className="text-1xl rounded-xl py-2 px-3 shadow-lg font-bold hover:bg-purple-400 sm:w-auto w-auto mt-5 sm:mt-0" aria-label="Instagram van Evi Wammes">
                <svg xmlns="http://www.w3.org/2000/svg" className="dark:fill-white w-6 h-6" viewBox="0 0 24 24">
                  <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z" />
                </svg>
              </button>
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com/in/eviwammes/" target="_blank" aria-label="LinkedIn van Evi Wammes">
              <button className="text-1xl rounded-xl py-2 px-3 shadow-lg font-bold hover:bg-blue-400 sm:w-auto w-auto mt-5 sm:mt-0" aria-label="LinkedIn van Evi Wammes">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 dark:fill-white" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>
            </Link>
          </li>
          <li>
            <Link href="https://wa.me/+31640707077" target="_blank" aria-label="Whatsapp Evi Wammes">
              <button className="text-1xl rounded-xl py-2 px-3 shadow-lg font-bold hover:bg-green-400 sm:w-auto w-auto mt-5 sm:mt-0" aria-label="Whatsapp Evi Wammes">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 dark:fill-white" viewBox="0 0 50 50">
                  <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 29.079097 3.1186875 32.88588 4.984375 36.208984 L 2.0371094 46.730469 A 1.0001 1.0001 0 0 0 3.2402344 47.970703 L 14.210938 45.251953 C 17.434629 46.972929 21.092591 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 21.278025 46 17.792121 45.029635 14.761719 43.333984 A 1.0001 1.0001 0 0 0 14.033203 43.236328 L 4.4257812 45.617188 L 7.0019531 36.425781 A 1.0001 1.0001 0 0 0 6.9023438 35.646484 C 5.0606869 32.523592 4 28.890107 4 25 C 4 13.390466 13.390466 4 25 4 z M 16.642578 13 C 16.001539 13 15.086045 13.23849 14.333984 14.048828 C 13.882268 14.535548 12 16.369511 12 19.59375 C 12 22.955271 14.331391 25.855848 14.613281 26.228516 L 14.615234 26.228516 L 14.615234 26.230469 C 14.588494 26.195329 14.973031 26.752191 15.486328 27.419922 C 15.999626 28.087653 16.717405 28.96464 17.619141 29.914062 C 19.422612 31.812909 21.958282 34.007419 25.105469 35.349609 C 26.554789 35.966779 27.698179 36.339417 28.564453 36.611328 C 30.169845 37.115426 31.632073 37.038799 32.730469 36.876953 C 33.55263 36.755876 34.456878 36.361114 35.351562 35.794922 C 36.246248 35.22873 37.12309 34.524722 37.509766 33.455078 C 37.786772 32.688244 37.927591 31.979598 37.978516 31.396484 C 38.003976 31.104927 38.007211 30.847602 37.988281 30.609375 C 37.969311 30.371148 37.989581 30.188664 37.767578 29.824219 C 37.302009 29.059804 36.774753 29.039853 36.224609 28.767578 C 35.918939 28.616297 35.048661 28.191329 34.175781 27.775391 C 33.303883 27.35992 32.54892 26.991953 32.083984 26.826172 C 31.790239 26.720488 31.431556 26.568352 30.914062 26.626953 C 30.396569 26.685553 29.88546 27.058933 29.587891 27.5 C 29.305837 27.918069 28.170387 29.258349 27.824219 29.652344 C 27.819619 29.649544 27.849659 29.663383 27.712891 29.595703 C 27.284761 29.383815 26.761157 29.203652 25.986328 28.794922 C 25.2115 28.386192 24.242255 27.782635 23.181641 26.847656 L 23.181641 26.845703 C 21.603029 25.455949 20.497272 23.711106 20.148438 23.125 C 20.171937 23.09704 20.145643 23.130901 20.195312 23.082031 L 20.197266 23.080078 C 20.553781 22.728924 20.869739 22.309521 21.136719 22.001953 C 21.515257 21.565866 21.68231 21.181437 21.863281 20.822266 C 22.223954 20.10644 22.02313 19.318742 21.814453 18.904297 L 21.814453 18.902344 C 21.828863 18.931014 21.701572 18.650157 21.564453 18.326172 C 21.426943 18.001263 21.251663 17.580039 21.064453 17.130859 C 20.690033 16.232501 20.272027 15.224912 20.023438 14.634766 L 20.023438 14.632812 C 19.730591 13.937684 19.334395 13.436908 18.816406 13.195312 C 18.298417 12.953717 17.840778 13.022402 17.822266 13.021484 L 17.820312 13.021484 C 17.450668 13.004432 17.045038 13 16.642578 13 z M 16.642578 15 C 17.028118 15 17.408214 15.004701 17.726562 15.019531 C 18.054056 15.035851 18.033687 15.037192 17.970703 15.007812 C 17.906713 14.977972 17.993533 14.968282 18.179688 15.410156 C 18.423098 15.98801 18.84317 16.999249 19.21875 17.900391 C 19.40654 18.350961 19.582292 18.773816 19.722656 19.105469 C 19.863021 19.437122 19.939077 19.622295 20.027344 19.798828 L 20.027344 19.800781 L 20.029297 19.802734 C 20.115837 19.973483 20.108185 19.864164 20.078125 19.923828 C 19.867096 20.342656 19.838461 20.445493 19.625 20.691406 C 19.29998 21.065838 18.968453 21.483404 18.792969 21.65625 C 18.639439 21.80707 18.36242 22.042032 18.189453 22.501953 C 18.016221 22.962578 18.097073 23.59457 18.375 24.066406 C 18.745032 24.6946 19.964406 26.679307 21.859375 28.347656 C 23.05276 29.399678 24.164563 30.095933 25.052734 30.564453 C 25.940906 31.032973 26.664301 31.306607 26.826172 31.386719 C 27.210549 31.576953 27.630655 31.72467 28.119141 31.666016 C 28.607627 31.607366 29.02878 31.310979 29.296875 31.007812 L 29.298828 31.005859 C 29.655629 30.601347 30.715848 29.390728 31.224609 28.644531 C 31.246169 28.652131 31.239109 28.646231 31.408203 28.707031 L 31.408203 28.708984 L 31.410156 28.708984 C 31.487356 28.736474 32.454286 29.169267 33.316406 29.580078 C 34.178526 29.990889 35.053561 30.417875 35.337891 30.558594 C 35.748225 30.761674 35.942113 30.893881 35.992188 30.894531 C 35.995572 30.982516 35.998992 31.07786 35.986328 31.222656 C 35.951258 31.624292 35.8439 32.180225 35.628906 32.775391 C 35.523582 33.066746 34.975018 33.667661 34.283203 34.105469 C 33.591388 34.543277 32.749338 34.852514 32.4375 34.898438 C 31.499896 35.036591 30.386672 35.087027 29.164062 34.703125 C 28.316336 34.437036 27.259305 34.092596 25.890625 33.509766 C 23.114812 32.325956 20.755591 30.311513 19.070312 28.537109 C 18.227674 27.649908 17.552562 26.824019 17.072266 26.199219 C 16.592866 25.575584 16.383528 25.251054 16.208984 25.021484 L 16.207031 25.019531 C 15.897202 24.609805 14 21.970851 14 19.59375 C 14 17.077989 15.168497 16.091436 15.800781 15.410156 C 16.132721 15.052495 16.495617 15 16.642578 15 z" />
                </svg>
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
