import CloudflareImage from '@/app/components/CloudflareImage';
import Link from 'next/link';
import { Image as ResponsiveImage } from 'react-datocms';

async function getSeoData(lng: string) {
  if (!process.env.DATO_CMS_URL) {
    throw new Error('DatoCMS URL is not defined in environment variables.');
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
  }).then((res) => res.json());

  return data;
}

export async function generateMetadata() {
  const metaData = await getSeoData('en');

  return {
    title: metaData.pagina.seoGegevens.title,
    description: metaData.pagina.seoGegevens.description,
  };
}

async function getWerkErvaring(lng: string) {
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
          imageid
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

export default async function Projecten() {
  const getData = await getWerkErvaring('en');
  const { pagina } = await getSeoData('en');
  const data = getData.allProjectens;

  return (
    <div
      className="grid-rows-auto w-full grid-cols-1 text-center sm:grid sm:grid-flow-col sm:auto-rows-auto lg:grid-cols-2"
    >
      <h1 className="col-span-3 row-span-1 mb-3 text-4xl font-bold text-stone-800 md:mb-0 dark:text-stone-100">
        {pagina.label}
      </h1>
      <div
        className="grid-rows-auto col-span-full row-start-2 grid-cols-1 gap-3 space-y-3 text-center sm:grid
          sm:grid-flow-col sm:auto-rows-auto md:-mt-3 md:space-y-0 lg:grid-cols-2"
      >
        {data.map(
          (
            project: {
              id: string;
              title: string;
              techniekGebruikt: string;
              werkzaamheden: string;
              website: string;
              slug: string;
              imageid?: string;
              image: {
                responsiveImage: {
                  sizes: string;
                  src: string;
                  width: number;
                  height: number;
                  alt: string;
                  title: string;
                  webpSrcSet: string;
                  base64: string;
                };
              };
            },
            index: number,
          ) => (
            <Link
              href={'projects/' + project.slug}
              key={project.id}
              className={`self-start col-start-${index % 2 === 0 ? 1 : 2} row-start-${Math.floor(index / 2) + 3} lg:p
              test-stone-900 grid h-fit auto-rows-auto grid-cols-3 gap-y-2 rounded-xl bg-neutral-100 p-4 hover:shadow-sm
              dark:bg-neutral-800 dark:text-stone-100`}
            >
              <div className="col-span-full flex justify-between">
                <span
                  className="row-start-1 w-fit self-center rounded-full bg-stone-300 px-3 py-1 text-left text-xs
                    text-black opacity-80 dark:bg-stone-700 dark:text-white dark:opacity-100"
                >
                  {project.techniekGebruikt}
                </span>

                <span
                  className="col-start-3 row-start-1 w-fit self-center justify-self-end text-right text-xs opacity-70
                    lg:text-sm"
                >
                  <a href={`https://${project.website}`} target="_blank">
                    {project.website}
                  </a>
                </span>
              </div>
              <h2 className="col-span-full row-start-2 w-fit text-left text-lg">{project.title}</h2>
              <div className="col-span-3 row-start-3 w-full overflow-hidden rounded-2xl border bg-[#F8F8F8]">
                {project.image ? (
                  <ResponsiveImage
                    objectFit="scale-down"
                    data={project.image.responsiveImage}
                    className="h-80 bg-[#F8F8F8] object-scale-down"
                  />
                ) : (
                  <CloudflareImage
                    imageId={project.imageid}
                    width={1000}
                    height={300}
                    className="h-80 bg-[#F8F8F8] object-scale-down"
                    title={project.title}
                  />
                )}
              </div>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
