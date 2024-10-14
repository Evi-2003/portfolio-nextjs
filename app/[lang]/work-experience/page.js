import Image from 'next/image'
import s10 from '../src/s10.jpeg'
import froukje from '../src/froukje-cover.png'
import twofeet from '../src/twofeet.jpeg'
import glassanimals from '../src/glassanimals.jpeg'

async function getSeoData(lng) {
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
  }).then((res) => res.json())

  return data
}

export async function generateMetadata() {
  const metaData = await getSeoData('en')
  return {
    title: metaData.pagina.seoGegevens.title,
    description: metaData.pagina.seoGegevens.description,
  }
}

async function getWerkErvaring(lng) {
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
    next: { revalidate: 10 },
  }).then((res) => res.json())

  return data
}

export default async function Werkervaring({ params: { lang } }) {
  const lng = lang === 'en-US' ? 'en' : 'nl'
  const getData = await getWerkErvaring(lng)
  const { pagina } = await getSeoData(lng)
  const data = getData.allWerkervarings

  return (
    <main className="text-center text-stone-800 dark:text-stone-100">
      <h1 className="text-4xl font-bold mb-5">{pagina.label}</h1>
      <ul className="werkvaring-list space-y-5 space-x-5 border-l-[3px] dark:border-white border-solid border-black text-left mx-10" id="werkervaring-list">
        {data.map((element) => (
          <li key={element.id}>
            <figure className=" w-4 h-4 bg-black rounded-full absolute -ml-[1.85rem] dark:bg-white"></figure>
            <h3 className="text-xl">{element.functie}</h3>
            <h4 className="text-lg">
              <a
                className="text-lg hover:underline"
                href={element.bedrijfsWebsite}
                aria-label={'Evi Wammes werkt bij ' + element.bedrijf + ' vanaf ' + element.startdatum + ' tot ' + element.einddatum}
                target="_blank"
              >
                {element.bedrijf}
              </a>
            </h4>
            <span className="text-base opacity-60 font-bold">
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
        ))}
      </ul>
    </main>
  )
}
