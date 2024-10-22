import froukje from '@/app/images/froukje-cover.png';
import glassanimals from '@/app/images/glassanimals.jpeg';
import s10 from '@/app/images/s10.jpeg';
import twofeet from '@/app/images/twofeet.jpeg';
import checkLanguage from '@/app/utils/checkLanguage';
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

export async function generateMetadata(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;

  const { lang } = params;

  const lng = checkLanguage(lang);
  const metaData = await getSeoData(lng);

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

export default async function overMij(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;

  const { lang } = params;

  const lng = checkLanguage(lang);
  const getData = await getOverMij(lng);
  const data = getData.overMij;
  return (
    <main className="grid w-4/5 grid-cols-2 gap-2 text-stone-800 lg:w-3/5 2xl:w-6/12 dark:text-stone-100">
      <h1 className="col-span-full row-start-1 text-4xl font-bold lg:text-4xl">{data.titelOverMijPagina}</h1>
      <h2 className="col-span-full row-start-2 pb-2 text-xl font-medium lg:text-2xl">{data.subtitel}</h2>
      <section
        className="col-span-full row-start-3 flex w-full flex-col justify-center space-y-2 rounded-lg bg-slate-100 px-10
          py-5 pb-10 shadow dark:bg-gray-800 dark:text-stone-100"
      >
        <h3 className="mb-2 text-center text-2xl font-semibold">
          {lng === 'en' ? 'My favorite artists 🎶' : 'Mijn favoriete artiesten 🎶'}
        </h3>
        <ul className="flex flex-col items-center justify-center gap-10 lg:flex-row">
          <li className="h-44 w-44 text-center font-bold hover:scale-95">
            <a
              href="https://open.spotify.com/artist/1zT9SWCzN45r7oVhy0VYLK?si=WiFVQXTKRmWKtRyiwcQylQ"
              aria-label="De Spotify van de artiest S10"
              target="_blank"
              className="pt-5"
            >
              <Image
                src={s10}
                alt="Album cover van S10"
                className="mb-1 h-44 w-44 rounded-lg object-cover shadow hover:shadow-2xl"
              />
              S10
            </a>
          </li>
          <li className="h-44 w-44 text-center font-bold hover:scale-95">
            <a
              href="https://open.spotify.com/artist/0uBVyPbLZRDNEBiA4fZUlp?si=MX8Fk458R7ucCwaEScXKXA"
              aria-label="De Spotify van de artiest Froukje"
              target="_blank"
            >
              <Image
                src={froukje}
                alt="Album cover van Froukje"
                className="mb-1 h-44 w-44 rounded-lg object-cover shadow hover:shadow-2xl"
              />
              Froukje
            </a>
          </li>
          <li className="h-44 w-44 text-center font-bold hover:scale-95">
            <a
              href="https://open.spotify.com/artist/5sWHDYs0csV6RS48xBl0tH?si=XGNrt1KrTPOIHU4V2jVdwQ"
              aria-label="De Spotify van de artiest Two Feet"
              target="_blank"
            >
              <Image
                src={twofeet}
                alt="Album cover van Two feet"
                className="mb-1 h-44 w-44 rounded-lg object-cover shadow hover:shadow-2xl"
              />
              Two Feet
            </a>
          </li>
          <li className="h-44 w-44 text-center font-bold hover:scale-95">
            <a
              href="https://open.spotify.com/artist/4yvcSjfu4PC0CYQyLy4wSq?si=RGNvcgmDQj25SltAIUdVZQ"
              aria-label="De Spotify van de artiest Glass Animals"
              target="_blank"
            >
              <Image
                src={glassanimals}
                alt="Album cover van Glass Animals"
                className="mb-1 h-44 w-44 rounded-lg object-cover shadow hover:shadow-2xl"
              />
              Glass Animals
            </a>
          </li>
        </ul>
      </section>
      <section
        className="col-span-full row-start-4 flex h-fit flex-col justify-start space-y-2 rounded-lg bg-slate-100 px-10
          py-5 pb-10 shadow lg:col-span-1 dark:bg-gray-800 dark:text-stone-100"
      >
        <h3 className="mb-2 text-center text-2xl font-semibold">
          {lng === 'en' ? 'My favorite songs 🔊' : 'Mijn favoriete nummers 🔊'}
        </h3>
        <ul className="flex flex-col items-center justify-center gap-1">
          <li>
            <iframe
              src="https://open.spotify.com/embed/track/5Tq1M5F1nV66RDh5Q1dD3q?utm_source=generator&theme=0"
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </li>
          <li>
            <iframe
              src="https://open.spotify.com/embed/track/2u6twH8SHtv37ctUqQ4iEX?utm_source=generator"
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </li>
          <li>
            <iframe
              src="https://open.spotify.com/embed/track/7tZdkPtebOG29TzPPHlsem?utm_source=generator&theme=0"
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </li>
          <li>
            <iframe
              src="https://open.spotify.com/embed/track/1gk3FhAV07q9Jg77UxnVjX?utm_source=generator"
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </li>
        </ul>
      </section>
      <section
        className="col-span-full row-start-5 flex h-fit w-full flex-col justify-center space-y-2 rounded-lg bg-slate-100
          px-10 py-5 pb-10 shadow lg:col-start-2 lg:row-start-4 dark:bg-gray-800 dark:text-stone-100"
      >
        <h3 className="mb-2 text-center text-2xl font-semibold">
          {lng === 'en' ? 'Great music 🎧' : 'Goeie muziek 🎧'}
        </h3>
        <iframe
          src="https://open.spotify.com/embed/playlist/6R7LQidnLidYgzdZzINase?utm_source=generator&theme=0"
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        <iframe
          src="https://open.spotify.com/embed/playlist/3LbyOC3bbfdtiiJcDQPkiu?utm_source=generator&theme=0"
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        <iframe
          src="https://open.spotify.com/embed/playlist/01rxlkJVw81NyvZaaukjO8?utm_source=generator&theme=0"
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </section>
    </main>
  );
}
