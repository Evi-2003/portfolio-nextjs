'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { NavContext } from './providers/NavProvider';

const NavItem = ({ label, slug, idx }: { label: string; slug: string; idx: number }) => {
  const currentPath = usePathname();
  const currentLang = currentPath.split('/')[1];
  const path = currentPath.split('/')[2];

  const { toggleIsOpen } = useContext(NavContext);

  return (
    <li
      onClick={() => toggleIsOpen()}
      className={path === slug.slice(1) || (!path && idx === 0) ? 'active rounded-xl px-2 py-2' : 'px-2 py-2'}
    >
      <Link
        href={`${currentLang === 'nl-NL' ? `/${currentLang}` : ''}/${slug.slice(1)}`}
        className="hover:underline"
        prefetch={true}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
