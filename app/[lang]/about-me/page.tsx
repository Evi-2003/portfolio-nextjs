import Image from 'next/image'
import s10 from '../src/s10.jpeg'
import froukje from '../src/froukje-cover.png'
import twofeet from '../src/twofeet.jpeg'
import glassanimals from '../src/glassanimals.jpeg'

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
  }).then((res) => res.json())

  return data
}

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const lng = lang === 'en-US' ? 'en' : 'nl'
  const metaData = await getSeoData(lng)

  return {
    title: metaData.pagina.seoGegevens.title,
    description: metaData.pagina.seoGegevens.description,
  }
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
    next: { revalidate: 10 },
  }).then((res) => res.json())

  return data
}

export default async function overMij({ params: { lang } }: { params: { lang: string } }) {
  const lng = lang === 'en-US' ? 'en' : 'nl'
  const getData = await getOverMij(lng)
  const data = getData.overMij
  return (
    <main className="grid grid-cols-2 gap-2 w-4/5 lg:w-3/5 2xl:w-6/12 text-stone-800 dark:text-stone-100">
      <h1 className="text-4xl lg:text-4xl font-bold col-span-full row-start-1">{data.titelOverMijPagina}</h1>
      <h2 className="text-xl lg:text-2xl font-medium row-start-2 col-span-full pb-2">{data.subtitel}</h2>
      <section className=" row-start-3 col-span-full bg-slate-100 dark:bg-gray-800 px-10 py-5 pb-10 dark:text-stone-100 rounded-lg w-full space-y-2 shadow flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-center mb-2">{lng === 'en' ? 'My favorite artists 🎶' : 'Mijn favoriete artiesten 🎶'}</h3>
        <ul className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          <li className="font-bold text-center w-44 h-44 hover:scale-95">
            <a href="https://open.spotify.com/artist/1zT9SWCzN45r7oVhy0VYLK?si=WiFVQXTKRmWKtRyiwcQylQ" aria-label="De Spotify van de artiest S10" target="_blank" className="pt-5">
              <Image src={s10} alt="Album cover van S10" className="w-44 h-44 rounded-lg shadow hover:shadow-2xl mb-1 object-cover" />
              S10
            </a>
          </li>
          <li className="font-bold text-center w-44 h-44 hover:scale-95">
            <a href="https://open.spotify.com/artist/0uBVyPbLZRDNEBiA4fZUlp?si=MX8Fk458R7ucCwaEScXKXA" aria-label="De Spotify van de artiest Froukje" target="_blank">
              <Image src={froukje} alt="Album cover van Froukje" className="w-44 h-44 rounded-lg shadow hover:shadow-2xl mb-1 object-cover" />
              Froukje
            </a>
          </li>
          <li className="font-bold text-center w-44 h-44 hover:scale-95">
            <a href="https://open.spotify.com/artist/5sWHDYs0csV6RS48xBl0tH?si=XGNrt1KrTPOIHU4V2jVdwQ" aria-label="De Spotify van de artiest Two Feet" target="_blank">
              <Image src={twofeet} alt="Album cover van Two feet" className="w-44 h-44 rounded-lg shadow hover:shadow-2xl mb-1 object-cover" />
              Two Feet
            </a>
          </li>
          <li className="font-bold text-center w-44 h-44 hover:scale-95">
            <a href="https://open.spotify.com/artist/4yvcSjfu4PC0CYQyLy4wSq?si=RGNvcgmDQj25SltAIUdVZQ" aria-label="De Spotify van de artiest Glass Animals" target="_blank">
              <Image src={glassanimals} alt="Album cover van Glass Animals" className="w-44 h-44 rounded-lg shadow hover:shadow-2xl mb-1 object-cover" />
              Glass Animals
            </a>
          </li>
        </ul>
      </section>
      <section className="h-fit  row-start-4 col-span-full lg:col-span-1 bg-slate-100 dark:bg-gray-800 px-10 py-5 pb-10 dark:text-stone-100 rounded-lg space-y-2 shadow flex flex-col justify-start">
        <h3 className="text-2xl font-semibold text-center mb-2">{lng === 'en' ? 'My favorite songs 🔊' : 'Mijn favoriete nummers 🔊'}</h3>
        <ul className="flex flex-col gap-1 items-center justify-center">
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
      <section className="h-fit  bg-slate-100 col-span-full lg:col-start-2 row-start-5 lg:row-start-4 h-fit dark:bg-gray-800 px-10 py-5 pb-10 dark:text-stone-100 rounded-lg space-y-2 shadow flex flex-col justify-center w-full">
        <h3 className="text-2xl font-semibold text-center mb-2">{lng === 'en' ? 'Great music 🎧' : 'Goeie muziek 🎧'}</h3>
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
  )
}
