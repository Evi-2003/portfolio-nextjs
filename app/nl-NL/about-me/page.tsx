import froukje from '@/app/images/froukje-cover.png';
import glassanimals from '@/app/images/glassanimals.jpeg';
import s10 from '@/app/images/s10.jpeg';
import twofeet from '@/app/images/twofeet.jpeg';
import Image from 'next/image';

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
        pagina(filter: {slug: {eq: "about-me"}}, locale: ${lng}) {
          id
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

async function getOverMij(lng: string) {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
        query getDataAboutMe {
            overMij(locale: ${lng}) {
                titelOverMijPagina
                  subtitel
            }
          }
    `,
    }),
  }).then((res) => res.json());

  return data;
}

export default async function overMij() {
  const getData = await getOverMij('nl');
  const data = getData.overMij;
  return (
    <main className="flex w-full flex-col text-stone-800 dark:text-stone-100">
      <h1 className="text-balance text-3xl font-bold">About me</h1>

      <p className="text-balance text-base">love bouldering, sometimes skating</p>
      <p className="text-balance text-base">love to listen to music, s10, mother mother, sef</p>
      <p className="text-balance text-base">love tech</p>

      <div className="grid grid-cols-5"></div>
    </main>
  );
}
