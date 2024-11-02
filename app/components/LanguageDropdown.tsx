'use client';

import { usePathname, useRouter } from 'next/navigation';

const LanguageDropdown = () => {
  const params = usePathname();
  const router = useRouter();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = params.split('/')[2];

    if (event.target.value === 'en-US') {
      router.push(`/${slug ?? ''}`);
    } else {
      router.push(`/${event.target.value}/${slug ?? ''}`);
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
