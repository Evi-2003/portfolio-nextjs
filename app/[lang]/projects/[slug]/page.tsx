import { remark } from 'remark'
import html from 'remark-html'

export async function generateStaticParams() {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query MyQuery {
      allProjectens {
        id
        slug
      }
    }
  `,
    }),
  }).then((res) => res.json())

  return data.allProjectens.map((post: { slug: string }) => ({
    slug: post.slug,
  }))
}

async function getSeoData(slug: string) {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query MyQuery {
        projecten(filter: {slug: {eq: "${slug}"}}, locale: nl) {
          seoTitle {
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
    title: metaData.projecten.seoTitle.title,
    description: metaData.projecten.seoTitle.description,
  }
}

async function getProject(slug: string, lng: string) {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query getProject {
        projecten(filter: {slug: {eq: "${slug}"}}, locale: ${lng}) {
          id
          slug
          techniekGebruikt
          title
          website
          werkzaamheden
          content
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

export default async function Projecten({ params: { slug, lang } }: { params: { slug: string; lang: string } }) {
  const slugSplitted = slug.split('/')
  const lng = lang === 'en-US' ? 'en' : 'nl'
  const getData = await getProject(slugSplitted[0], lng)
  const data = getData.projecten

  const processedContent = await remark().use(html).process(data.content)
  let contentHtml = processedContent.toString()
  contentHtml = contentHtml.replace(/\n/g, '<br>')

  return (
    <main className="grid grid-cols-3 auto-rows-min justify-start text-left dark:text-white h-full z-0 mt-5 pb-10 w-4/5 lg:w-3/5 2xl:w-4/12">
      <h1 className="text-2xl sm:text-4xl pb-5 row-start-1 col-span-full">{data.title}</h1>
      <span className="hidden lg:block w-fit row-start-2 col-start-1 colstext-base opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-5 -mt-1">
        {data.techniekGebruikt}
      </span>
      {data.werkzaamheden && (
        <span className="hidden lg:flex w-fit row-start-2 col-start-2 text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-5 -mt-1 justify-self-center items-center">
          {data.werkzaamheden}
        </span>
      )}
      <span className="hidden lg:flex row-start-2 col-span-1 lg:col-start-3 text-base opacity-70 text-left sm:text-right">
        <a href={`https://${data.website}`} target="_blank">
          {data.website}
        </a>
      </span>
      <div className="text-base text-stone-800 dark:text-stone-100 xl:text-lg col-span-full lg:p-5" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  )
}
