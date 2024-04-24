import { Image as ResponsiveImage } from 'react-datocms'

import { remark } from 'remark'
import html from 'remark-html'

async function getSeoData() {
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
        pagina(filter: {slug: {eq: "/"}}) {
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

export async function generateMetadata() {
  const metaData = await getSeoData()
  console.log(metaData)
  return {
    title: metaData.pagina.seoGegevens.title,
    description: metaData.pagina.seoGegevens.description,
  }
}

async function getBasicInfo() {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
        query getDataAboutMe {
          overMij {
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

export default async function Home() {
  const getData = await getBasicInfo()
  const data = getData.overMij

  const processedContent = await remark().use(html).process(data.omschrijving)
  let contentHtml = processedContent.toString()
  contentHtml = contentHtml.replace(/\n/g, '<br>')

  return (
    <main className="grid grid-flow-col grid-cols-1 lg:grid-cols-5 items-center justify-center gap-5 w-4/5 lg:w-3/5 2xl:w-6/12">
      <article className="col-start-1 lg:col-span-3 space-y-2">
        <h1 className="text-4xl lg:text-5xl font-bold text-stone-800 dark:text-stone-100">Hey! Ik ben {data.voornaam}.</h1>
        <h2 className="text-lg lg:text-2xl font-medium text-sky-900 dark:text-stone-200">{data.functie}</h2>

        <div className="text-base text-stone-800 dark:text-stone-100 xl:text-lg" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
      <aside className="aside-info col-span-full self-center justify-self-center lg:col-span-2 lg:m-10 flex h-fit w-fit flex-col justify-centerrounded-xl bg-gradient-to-r from-cyan-600 to-blue-800  shadow-lg hover:shadow-2xl dark:from-cyan-800 dark:to-sky-950 rounded-lg">
        <div className="relative w-[100%] height=[100%] pt-5">
          <ResponsiveImage data={data.foto.responsiveImage} />
        </div>
        <ul className="h-fit w-full rounded-lg bg-sky-600 p-5 text-lg md:text-base font-semibold text-white dark:bg-sky-800">
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
