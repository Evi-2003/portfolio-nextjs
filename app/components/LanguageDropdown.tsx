'use client';

import { usePathname } from 'next/navigation';

const LanguageDropdown = () => {
  const params = usePathname();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = params.split('/')[2];

    // Because of a current bug with router.push, i will use window.location.href, it might be dirty, but it's a good enough fix for now
    if (event.target.value === 'en-US') {
      window.location.href = `/${slug ?? ''}`;
    } else {
      window.location.href = `/${event.target.value}/${slug ?? ''}`;
    }
  };

  return (
    <select className="w-10 bg-transparent" name="language" id="language" onChange={(event) => changeLanguage(event)}>
      <option value="en-US" selected={params.split('/')[1] === 'en-US'}>
        🇺🇸&emsp;
      </option>
      <option value="nl-NL" selected={params.split('/')[1] === 'nl-NL'}>
        <option value="NL">🇳🇱&emsp;</option>
      </option>
    </select>
  );
};

export default LanguageDropdown;
