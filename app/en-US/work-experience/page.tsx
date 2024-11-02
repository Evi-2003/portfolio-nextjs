import checkLanguage from '@/app/utils/checkLanguage';
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
  const metaData = await getSeoData('en');
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
          }
        }
    `,
    }),
  }).then((res) => res.json());

  return data;
}

export default async function Werkervaring(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;

  const { lang } = params;

  const lng = checkLanguage(lang);
  const { allWerkervarings: data } = await getWerkErvaring(lng);
  const { pagina } = await getSeoData(lng);

  return (
    <main className="text-center text-stone-800 dark:text-stone-100">
      <h1 className="mb-5 text-4xl font-bold">{pagina.label}</h1>
      <ul
        className="werkvaring-list mx-10 space-x-5 space-y-5 border-l-[3px] border-solid border-black text-left
          dark:border-white"
        id="werkervaring-list"
      >
        {data.map(
          (element: {
            bedrijf: string;
            bedrijfsWebsite: string;
            startdatum: string;
            einddatum: string;
            functie: string;
            id: string;
          }) => (
            <li key={element.id}>
              <figure className="absolute -ml-[1.85rem] h-4 w-4 rounded-full bg-black dark:bg-white"></figure>
              <h3 className="text-xl">{element.functie}</h3>
              <h4 className="text-lg">
                <a
                  className="text-lg hover:underline"
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
                  {element.bedrijf}
                </a>
              </h4>
              <span className="text-base font-bold opacity-60">
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
                  : lng === 'en'
                    ? 'Present'
                    : 'Heden'}
              </span>
            </li>
          ),
        )}
      </ul>
    </main>
  );
}
