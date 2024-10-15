import checkLanguage from '@/app/utils/checkLanguage';
import { remark } from 'remark';
import html from 'remark-html';

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
  }).then((res) => res.json());

  return data.allProjectens.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

async function getSeoData(slug: string, lng: string) {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query MyQuery {
        projecten(filter: {slug: {eq: "${slug}"}}, locale: ${lng}) {
          seoTitle {
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

export async function generateMetadata({ params: { lang, slug } }: { params: { lang: string; slug: string } }) {
  const lng = checkLanguage(lang);

  const metaData = await getSeoData(slug, lng);

  return {
    title: metaData.projecten.seoTitle.title,
    description: metaData.projecten.seoTitle.description,
  };
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
  }).then((res) => res.json());

  return data;
}

export default async function Projecten({ params: { slug, lang } }: { params: { slug: string; lang: string } }) {
  const slugSplitted = slug.split('/');
  const lng = checkLanguage(lang);
  const getData = await getProject(slugSplitted[0], lng);
  const data = getData.projecten;

  const processedContent = await remark().use(html).process(data.content);
  let contentHtml = processedContent.toString();
  contentHtml = contentHtml.replace(/\n/g, '<br>');

  return (
    <main
      className="z-0 mt-5 grid h-full w-4/5 auto-rows-min grid-cols-3 justify-start pb-10 text-left lg:w-3/5 2xl:w-4/12
        dark:text-white"
    >
      <h1 className="col-span-full row-start-1 pb-5 text-2xl sm:text-4xl">{data.title}</h1>
      <span
        className="colstext-base col-start-1 row-start-2 -mt-1 hidden w-fit rounded-full bg-white p-1 px-5 text-left
          text-black opacity-80 lg:block dark:bg-cyan-700 dark:text-white dark:opacity-100"
      >
        {data.techniekGebruikt}
      </span>
      {data.werkzaamheden && (
        <span
          className="col-start-2 row-start-2 -mt-1 hidden w-fit items-center justify-self-center rounded-full bg-white
            p-1 px-5 text-left text-sm text-black opacity-80 lg:flex dark:bg-cyan-700 dark:text-white dark:opacity-100"
        >
          {data.werkzaamheden}
        </span>
      )}
      <span className="col-span-1 row-start-2 hidden text-left text-base opacity-70 sm:text-right lg:col-start-3 lg:flex">
        <a href={`https://${data.website}`} target="_blank">
          {data.website}
        </a>
      </span>
      <div
        className="col-span-full text-base text-stone-800 lg:p-5 xl:text-lg dark:text-stone-100"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  );
}
