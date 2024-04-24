import { Image as ResponsiveImage } from 'react-datocms'
async function getSeoData() {
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
        pagina(filter: {slug: {eq: "projecten"}}) {
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

async function getWerkErvaring() {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query getProjecten {
        allProjectens{
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

export default async function Projecten({ params }) {
  const getData = await getWerkErvaring()
  const data = getData.allProjectens

  return (
    <main className="grid-rows-auto mt-4 gap-3 space-y-5 lg:space-y-0 text-center sm:grid sm:grid-flow-col sm:auto-rows-auto grid-cols-1 lg:grid-cols-2 w-4/5 lg:w-4/5 2xl:w-8/12">
      <h1 className="col-span-3 row-span-1 text-5xl font-bold text-stone-800 dark:text-stone-100 mb-3">Projecten</h1>
      {data.map((project, index) => (
        <article
          key={project.id}
          className={`self-start col-start-${index % 2 === 0 ? 1 : 2} row-start-${
            Math.floor(index / 2) + 3
          } grid h-fit auto-rows-auto grid-cols-3 gap-y-2 rounded-xl bg-sky-500 p-4 lg:p-8 text-white hover:shadow-xl dark:bg-slate-800 dark:hover:shadow-[10px_10px_10px_-5px_rgba(255,255,255,0.3)]`}
        >
          <div className="flex justify-between col-span-full">
            <span className="row-start-1 w-fit self-center rounded-full bg-white px-2 py-1 text-left text-xs text-black opacity-80 dark:bg-cyan-700 dark:text-white dark:opacity-100">
              {project.techniekGebruikt}
            </span>
            <span className="hidden lg:block col-start-2 row-start-1 w-fit self-center justify-self-center rounded-full bg-white p-1 px-2 text-left text-xs text-black opacity-80 dark:bg-cyan-700 dark:text-white dark:opacity-100">
              {project.werkzaamheden}
            </span>
            <span className="row-start-1 col-start-3 w-fit self-center justify-self-end text-right text-xs lg:text-sm opacity-70">
              <a href={`https://${project.website}`} target="_blank">
                {project.website}
              </a>
            </span>
          </div>
          <h2 className="col-span-full row-start-2 h-10 w-fit text-left text-2xl sm:text-3xl">{project.title}</h2>
          <div className="col-span-3 row-start-3 w-full rounded-2xl">
            <ResponsiveImage data={project.image.responsiveImage} />
          </div>
          <a
            className="row-start-4 col-span-2 lg:col-span-1 rounded-xl bg-cyan-50 px-4 py-1 text-base text-black hover:bg-sky-700 hover:text-white hover:scale-95 dark:bg-sky-800 dark:text-white"
            href={'/projecten/' + project.slug}
          >
            Lees meer
          </a>
        </article>
      ))}
    </main>
  )
}
