'use client';

import Image from 'next/image';
import { useState } from 'react';

interface IExperience {
  data: {
    bedrijf: string;
    bedrijfsWebsite: string;
    startdatum: string;
    einddatum: string;
    functie: string;
    id: string;
    shortText: string;
    icon: {
      url: string;
      alt: string;
    };
  }[];
  education: {
    id: string;
    position: string;
    school: string;
    startdatum: string;
    study: string;
    einddatum: string;
  }[];
}

const Experience = ({ data, education }: IExperience) => {
  const [active, setActive] = useState('experience');

  return (
    <>
      <div
        className="pl mx-auto w-full max-w-md rounded-xl border border-black/10 bg-neutral-100 py-2 pl-5 pr-5
          dark:border-white/10 dark:bg-stone-800"
      >
        <div className="flex w-fit gap-2 py-2">
          <h1
            className={`cursor-pointer text-lg font-medium leading-6
              ${active === 'experience' ? 'opacity-100' : 'opacity-50'}`}
            onClick={() => setActive('experience')}
          >
            Experience
          </h1>
          <span className="opacity-50">|</span>
          <h2
            className={`cursor-pointer text-lg font-medium leading-6
              ${active === 'education' ? 'opacity-100' : 'opacity-50'}`}
            onClick={() => setActive('education')}
          >
            Education
          </h2>
        </div>

        <ul className="divide-y divide-stone-900/30 text-left dark:divide-stone-100/30">
          {active === 'experience'
            ? data.map((element) => (
                <li className="flex flex-col py-3" key={element.id}>
                  <div className="flex items-center justify-between">
                    <span className="w-10/12 text-lg font-medium leading-6">{element.functie}</span>
                    <span className="whitespace-nowrap text-sm opacity-50">
                      {new Date(element.startdatum).toLocaleDateString('en-US', {
                        month: '2-digit',
                        year: 'numeric',
                      })}{' '}
                      -{' '}
                      {element.einddatum
                        ? new Date(element.einddatum).toLocaleDateString('en-US', {
                            month: '2-digit',
                            year: 'numeric',
                          })
                        : 'Present'}
                    </span>
                  </div>

                  <a
                    className="flex items-center gap-2 text-base opacity-80 hover:underline"
                    href={element.bedrijfsWebsite}
                    aria-label={
                      'Evi Wammes werkt bij ' +
                      element.bedrijf +
                      ' vanaf ' +
                      element.startdatum +
                      ' tot ' +
                      element.einddatum
                    }
                    target="_blank"
                  >
                    {element.icon?.url && (
                      <Image
                        className="aspect-square size-4 invert dark:invert-0"
                        src={element.icon.url}
                        alt={element.icon.alt}
                        width={20}
                        height={20}
                      />
                    )}
                    {element.bedrijf}
                  </a>
                  <p className="text-balance pb-1 text-base opacity-60">{element.shortText}</p>
                </li>
              ))
            : education.map((element) => (
                <li className="flex flex-col py-3" key={element.id}>
                  <div className="flex items-center justify-between">
                    <span className="w-8/12 text-lg font-medium leading-6">{element.study}</span>
                    <span className="self-start whitespace-nowrap text-sm opacity-50">
                      {new Date(element.startdatum).toLocaleDateString('en-US', {
                        year: 'numeric',
                      })}{' '}
                      -{' '}
                      {element.einddatum
                        ? new Date(element.einddatum).toLocaleDateString('en-US', {
                            year: 'numeric',
                          })
                        : 'Present'}
                    </span>
                  </div>

                  <span
                    className="flex items-center gap-2 text-base opacity-80"
                    aria-label={
                      'Evi Wammes studeerde bij ' +
                      element.school +
                      ' vanaf ' +
                      element.startdatum +
                      ' tot ' +
                      element.einddatum
                    }
                  >
                    {element.school}
                  </span>
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};

export default Experience;
