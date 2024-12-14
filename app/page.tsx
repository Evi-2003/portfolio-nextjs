import { Image as ResponsiveImage, StructuredText } from 'react-datocms';

async function getSeoData(lng: string) {
  if (!process.env.DATO_CMS_URL) {
    throw new Error('DatoCMS URL is not defined in environment variables.');
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
  }).then((res) => res.json());

  return data;
}

export async function generateMetadata() {
  const metaData = await getSeoData('nl');

  return {
    title: metaData.pagina.seoGegevens.title,
    description: metaData.pagina.seoGegevens.description,
  };
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
            aboutMe (locale: ${lng}) {
              value
              links
              blocks
            }
          }
        }
  `,
    }),
  }).then((res) => res.json());

  return data;
}

export default async function Home() {
  const getData = await getBasicInfo('en');
  const data = getData.overMij;

  return (
 <div className="grid w-full grid-flow-col grid-cols-1 gap-5">
      <article className="col-start-1 lg:col-span-3">
        <h1 className="text-4xl font-bold text-stone-800 lg:text-4xl dark:text-stone-100">{data.heading}</h1>
        <h2 className="text-lg font-medium text-sky-900 lg:text-2xl dark:text-stone-200">{data.functie}</h2>
        <div className="text-base text-balance text-stone-800 xl:text-lg dark:text-stone-100">
          <StructuredText data={data?.aboutMe} />
        </div>
      </article>

      <aside
        className="aside-info col-span-full flex h-fit w-fit flex-col justify-center gap-3 divide-y self-center
          justify-self-center rounded-lg border lg:col-span-2 dark:divide-white/10 dark:border-white/10"
      >
        <div className="height=[100%] relative w-[100%] pt-5">
          <ResponsiveImage data={data.foto.responsiveImage} />
        </div>

        <ul
          className="bg-transparant flex h-fit w-full flex-col gap-1 px-3 py-2 text-lg font-semibold md:text-base
            dark:text-stone-100"
        >
          <li>
            <a
              className="decoration-stone-900/50 underline-offset-4 hover:underline dark:decoration-stone-100/50"
              href="mailto:mail@eviwammes.nl"
              aria-label="Send an email to mail@eviwammes.nl"
            >
              ✉️ <span className="sr-only">Email: </span>mail@eviwammes.nl
            </a>
          </li>
          <li>
            <a
              href="tel:+31640707077"
              aria-label="Call 06-40707077"
              className="decoration-stone-900/50 underline-offset-4 hover:underline dark:decoration-stone-100/50"
            >
              📞 <span className="sr-only">Phone: </span>06-40707077
            </a>
          </li>
          <li>
            <a
              className="decoration-stone-900/50 underline-offset-4 hover:underline dark:decoration-stone-100/50"
              href="https://maps.app.goo.gl/ARmC54ZH69zgyWVe9"
              aria-label="View location on Google Maps: Amsterdam, NL"
            >
              📍 <span className="sr-only">Location: </span>Amsterdam, NL
            </a>
          </li>
        </ul>
      </aside>
    </main>
  );
}
