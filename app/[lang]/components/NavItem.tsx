'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { NavContext } from './providers/NavProvider'
import { useContext } from 'react'

const NavItem = ({ label, slug, idx }: { label: string; slug: string; idx: number }) => {
  const currentPath = usePathname()
  const currentLang = currentPath.split('/')[1]
  const path = currentPath.split('/')[2]

  const { toggleIsOpen } = useContext(NavContext)

  return (
    <li onClick={() => toggleIsOpen()} className={path === slug.slice(1) || (!path && idx === 0) ? 'rounded-xl active py-2 px-2' : 'py-2 px-2'}>
      <Link href={`/${currentLang}/${slug.slice(1)}`} className="hover:underline">
        {label}
      </Link>
    </li>
  )
}

export default NavItem
