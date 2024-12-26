import StyledMarkdown from '@/app/components/StyledMarkdown';
import Link from 'next/link';
import { StructuredText } from 'react-datocms';

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

export async function generateMetadata(props: { params: Promise<{ lang: string; slug: string }> }) {
  const params = await props.params;

  const { slug } = params;

  const metaData = await getSeoData(slug, 'en');

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
      slug
    
          techniekGebruikt
          title
          website
          werkzaamheden
          content(markdown: false)
        
    image {
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

export default async function Projecten(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const { slug } = params;

  const slugSplitted = slug.split('/');

  const getData = await getProject(slugSplitted[0], 'en');
  console.log(getData);
  const data = getData.projecten;

  return (
    <div className="grid h-full w-full auto-rows-min grid-cols-3 justify-start space-y-2 pb-10 text-left dark:text-white">
      <div className="col-span-full row-start-1 text-sm">
        <Link href={'/en-US/projects'} prefetch>
          Projects
        </Link>
        <span className="mx-2">/</span>
        <span>{data.title}</span>
      </div>
      <h1 className="col-span-full row-start-2 text-2xl font-medium sm:text-3xl">{data.title}</h1>
      <div className="col-span-full mt-2 flex gap-3">
        <span
          className="w-fit self-center rounded-full bg-stone-300 px-3 py-1 text-left text-xs text-black opacity-80
            dark:bg-stone-700 dark:text-white dark:opacity-100"
        >
          {data.techniekGebruikt}
        </span>
        {data.werkzaamheden && (
          <span
            className="col-start-2 row-start-2 hidden w-fit self-center rounded-full bg-stone-300 px-3 py-1 text-left
              text-xs text-black opacity-80 md:flex dark:bg-stone-700 dark:text-white dark:opacity-100"
          >
            {data.werkzaamheden}
          </span>
        )}
        {data.website && (
          <span
            className="col-start-3 row-start-2 w-fit self-center rounded-full bg-stone-300 px-3 py-1 text-left text-xs
              text-black opacity-80 dark:bg-stone-700 dark:text-white dark:opacity-100"
          >
            <a href={`https://${data.website}`} target="_blank">
              {data.website}
            </a>
          </span>
        )}
      </div>

      <div
        id="blog-content"
        className="col-span-full text-balance text-base text-stone-800 lg:w-4/5 dark:text-stone-100"
      >
        <StyledMarkdown content={data?.content} />
      </div>
    </div>
  );
}
