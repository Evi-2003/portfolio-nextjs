'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { NavContext } from './providers/NavProvider';

const NavItem = ({ label, slug, idx }: { label: string; slug: string; idx: number }) => {
  const pathname = usePathname();
  const { toggleIsOpen } = useContext(NavContext);

  return (
    <li
      onClick={() => toggleIsOpen()}
      className={
        pathname === slug || (pathname === '/' && idx === 0) ? 'rounded-lg bg-stone-300 p-2 dark:bg-stone-900' : 'p-2'
      }
    >
      <Link href={slug} className="hover:underline" prefetch={true}>
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
