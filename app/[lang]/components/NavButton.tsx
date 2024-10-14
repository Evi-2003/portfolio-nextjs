'use client'
import { useContext } from 'react'
import { NavContext } from './providers/NavProvider'

const NavButton = () => {
  const { toggleIsOpen, isNavOpen } = useContext(NavContext)

  return (
    <button onClick={() => toggleIsOpen()} className="block w-8 lg:hidden top-5 right-5 ml-5" aria-label="Open navigatie-menu">
      {!isNavOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" className="dark:stroke-white stroke-gray-950" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="dark:stroke-white stroke-gray-950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      )}
    </button>
  )
}

export default NavButton
