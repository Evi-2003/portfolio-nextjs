'use client'

import { createContext, ReactNode, useState } from 'react'

export const NavContext = createContext({
  isNavOpen: false,
  toggleIsOpen: () => {},
})

const NavProvider = ({ children }: { children: ReactNode }) => {
  const [isNavOpen, toggleNav] = useState(false)

  const toggleIsOpen = () => {
    toggleNav(!isNavOpen)
  }

  return <NavContext.Provider value={{ isNavOpen, toggleIsOpen }}>{children}</NavContext.Provider>
}

export default NavProvider
