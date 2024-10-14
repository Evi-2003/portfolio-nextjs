import { Image as ResponsiveImage } from 'react-datocms'

import { remark } from 'remark'
import html from 'remark-html'

async function getSeoData(lng: string) {
  if (!process.env.DATO_CMS_URL) {
    throw new Error('DatoCMS URL is not defined in environment variables.')
  }
  const { data } = await fetch(process.env.DATO_CMS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query getSeoData {
        pagina(filter: {slug: {eq: "/"}}, locale: ${lng}) {
          id
          seoGegevens {
            description
            title
          }
        }
      }
  `,
    }),
    next: { revalidate: 10 },
  }).then((res) => res.json())

  return data
}

export async function generateMetadata({ params: { lang } }) {
  const lng = lang === 'en-US' ? 'en' : 'nl'
  const metaData = await getSeoData(lng)

  return {
    title: metaData.pagina.seoGegevens.title,
    description: metaData.pagina.seoGegevens.description,
  }
}

async function getBasicInfo(lng: string) {
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
            foto {
              responsiveImage(imgixParams: { fit: max, w: 300, h: 250, auto: format }) {
                sizes
                src
                width
                height
                alt
                title
                base64
              }
            }
            heading
            voornaam
            achternaam
            functie
            omschrijving
          }
        }
  `,
    }),
    next: { revalidate: 10 },
  }).then((res) => res.json())

  return data
}

export default async function Home({ params: { lang } }) {
  const lng = lang === 'en-US' ? 'en' : 'nl'
  const getData = await getBasicInfo(lng)
  const data = getData.overMij

  const processedContent = await remark().use(html).process(data.omschrijving)
  let contentHtml = processedContent.toString()
  contentHtml = contentHtml.replace(/\n/g, '<br>')

  return (
    <main className="grid grid-flow-col grid-cols-1 lg:grid-cols-5 items-center justify-center gap-5 w-4/5 lg:w-3/5 2xl:w-6/12">
      <article className="col-start-1 lg:col-span-3 space-y-2">
        <h1 className="text-4xl lg:text-4xl font-bold text-stone-800 dark:text-stone-100">{data.heading}</h1>
        <h2 className="text-lg lg:text-2xl font-medium text-sky-900 dark:text-stone-200">{data.functie}</h2>

        <div className="text-base text-stone-800 dark:text-stone-100 xl:text-lg" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
      <aside className="aside-info col-span-full self-center justify-self-center lg:col-span-2 lg:m-10 flex h-fit w-fit flex-col justify-center rounded-lg border dark:border-white/10 divide-y dark:divide-white/10 gap-3">
        <div className="relative w-[100%] height=[100%] pt-5">
          <ResponsiveImage data={data.foto.responsiveImage} />
        </div>

        <ul className="h-fit w-full bg-transparant px-3 text-lg md:text-base font-semibold dark:text-stone-100 py-2 gap-1 flex flex-col">
          <li className="hover:scale-95">
            <a href="mailto:mail@eviwammes.nl">✉️ mail@eviwammes.nl</a>
          </li>
          <li className="hover:scale-95">
            <a href="tel:+31640707077">📞 06-40707077</a>
          </li>
          <li>📍 Amsterdam</li>
        </ul>
      </aside>
    </main>
  )
}
