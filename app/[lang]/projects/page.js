import Link from 'next/link'
import { Image as ResponsiveImage } from 'react-datocms'

async function getSeoData(lng) {
  if (!process.env.DATO_CMS_URL) {
    throw new Error('DatoCMS URL is not defined in environment variables.')
  }
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query getSeoData {
        pagina(filter: {slug: {eq: "projects"}}, locale: ${lng}) {
          label
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
      query getProjecten {
        allProjectens(locale: ${lng}){
          id
          title
          techniekGebruikt
          werkzaamheden
          website
          slug
          image{
            responsiveImage(imgixParams: { fit: max, w: 1000, h: 450, auto: format }) {
        sizes
        src
        width
        height
        alt
        title
        webpSrcSet
        base64
      }
      }
        }
      }
    `,
    }),
    next: { revalidate: 10 },
  }).then((res) => res.json())

  return data
}

export default async function Projecten({ params: { lang } }) {
  const lng = lang === 'en-US' ? 'en' : 'nl'
  const getData = await getWerkErvaring(lng)
  const { pagina } = await getSeoData(lng)
  const data = getData.allProjectens

  return (
    <main className="grid-rows-auto mt-4 gap-3 space-y-5 lg:space-y-0 text-center sm:grid sm:grid-flow-col sm:auto-rows-auto grid-cols-1 lg:grid-cols-2 w-4/5 lg:w-4/5 2xl:w-8/12">
      <h1 className="col-span-3 row-span-1 text-4xl font-bold text-stone-800 dark:text-stone-100 mb-3">{pagina.label}</h1>
      {data.map((project, index) => (
        <Link
          href={'projects/' + project.slug}
          key={project.id}
          className={`self-start col-start-${index % 2 === 0 ? 1 : 2} row-start-${
            Math.floor(index / 2) + 3
          } grid h-fit auto-rows-auto grid-cols-3 gap-y-2 rounded-xl bg-neutral-100 p-4 lg:p test-stone-900 dark:text-stone-100 hover:shadow dark:bg-gray-800`}
        >
          <div className="flex justify-between col-span-full">
            <span className="row-start-1 w-fit self-center rounded-full bg-stone-300 px-3 py-1 text-left text-xs text-black opacity-80 dark:bg-stone-700 dark:text-white dark:opacity-100">
              {project.techniekGebruikt}
            </span>

            <span className="row-start-1 col-start-3 w-fit self-center justify-self-end text-right text-xs lg:text-sm opacity-70">
              <a href={`https://${project.website}`} target="_blank">
                {project.website}
              </a>
            </span>
          </div>
          <h2 className="col-span-full row-start-2 w-fit text-left text-lg">{project.title}</h2>
          <div className="col-span-3 row-start-3 w-full rounded-2xl">
            <ResponsiveImage data={project.image.responsiveImage} />
          </div>
        </Link>
      ))}
    </main>
  )
}
