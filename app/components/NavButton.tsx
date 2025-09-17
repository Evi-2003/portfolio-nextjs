'use client';

import { useContext } from 'react';
import { NavContext } from './providers/NavProvider';

const NavButton = () => {
  const { toggleIsOpen, isNavOpen } = useContext(NavContext);

  return (
    <button
      onClick={() => toggleIsOpen()}
      className="right-5 top-5 ml-5 block w-8 lg:hidden"
      aria-label="Open navigatie-menu"
    >
      {!isNavOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          className="stroke-gray-950 dark:stroke-white"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="stroke-gray-950 dark:stroke-white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      )}
    </button>
  );
};

export default NavButton;
