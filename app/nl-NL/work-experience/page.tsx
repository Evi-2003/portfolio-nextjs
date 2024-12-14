import Image from 'next/image';
import React from 'react';

async function getSeoData(lng: string) {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query getSeoData {
        pagina(filter: {slug: {eq: "work-experience"}}, locale: ${lng}) {
          id
          label
          seoGegevens {
            description
            title
          }
        }
      }
  `,
    }),
  }).then((res) => res.json());

  return data;
}

export async function generateMetadata() {
  const metaData = await getSeoData('nl');
  return {
    title: metaData.pagina.seoGegevens.title,
    description: metaData.pagina.seoGegevens.description,
  };
}

async function getWerkErvaring(lng: string) {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
        query getWerkErvaring {
          allWerkervarings(locale: ${lng}) {
            bedrijf 
            bedrijfsWebsite
            startdatum
            einddatum
            functie
            id
            shortText
            icon {
             alt
             url
            }
          }
        }
    `,
    }),
  }).then((res) => res.json());

  return data;
}

export default async function Werkervaring() {
  const { allWerkervarings: data } = await getWerkErvaring('nl');
  const { pagina } = await getSeoData('nl');

  return (
    <div className="mx-auto text-center text-stone-800 dark:text-stone-100">
      <h1 className="mb-5 text-4xl font-bold">{pagina.label}</h1>
      <div className="pl mx-5 mx-auto max-w-md rounded-xl bg-stone-200 py-2 pr-5 dark:bg-stone-900">
        <ul className="divide-y divide-stone-900/30 pl-5 text-left dark:divide-stone-100/30">
          {data.map(
            (element: {
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
                responsiveImage: {
                  width: number;
                  alt: string;
                  src: string;
                  title: string;
                  webpSrcSet: string;
                  srcSet: string;
                };
              };
            }) => (
              <li className="gap flex flex-col pt-3" key={element.id}>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium leading-6">{element.functie}</span>
                  <span className="whitespace-nowrap text-base opacity-60">
                    {new Date(element.startdatum).toLocaleDateString('nl-NL', {
                      month: '2-digit',
                      year: 'numeric',
                    })}{' '}
                    -{' '}
                    {element.einddatum
                      ? new Date(element.einddatum).toLocaleDateString('nl-NL', {
                          month: '2-digit',
                          year: 'numeric',
                        })
                      : 'Heden'}
                  </span>
                </div>
                <a
                  className="gap gap flex items-center gap-2 text-lg opacity-80 hover:underline"
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
                      className="aspect-square size-5 invert dark:invert-0"
                      src={element.icon.url}
                      alt={element.icon.alt}
                      width={20}
                      height={20}
                    />
                  )}
                  {element.bedrijf}
                </a>
                <p className="-mt-[0.2px] text-balance pb-1 text-base opacity-60">{element.shortText}</p>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}
