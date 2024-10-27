import checkLanguage from '@/app/utils/checkLanguage';
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

export async function generateMetadata(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;

  const { lang } = params;

  const lng = checkLanguage(lang);
  const metaData = await getSeoData(lng);

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

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;

  const { lang } = params;

  const lng = checkLanguage(lang);
  const getData = await getBasicInfo(lng);
  const data = getData.overMij;

  return (
    <main className="grid w-4/5 max-w-5xl grid-flow-col grid-cols-1 gap-5 lg:w-3/5 lg:grid-cols-5 2xl:w-6/12">
      <article className="col-start-1 lg:col-span-3">
        <h1 className="text-4xl font-bold text-stone-800 lg:text-4xl dark:text-stone-100">{data.heading}</h1>
        <h2 className="text-lg font-medium text-sky-900 lg:text-2xl dark:text-stone-200">{data.functie}</h2>
        <div className="text-base text-stone-800 xl:text-lg dark:text-stone-100">
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
          <li className="hover:underline">
            <a href="mailto:mail@eviwammes.nl" aria-label="Send an email to mail@eviwammes.nl">
              ✉️ <span className="sr-only">Email: </span>mail@eviwammes.nl
            </a>
          </li>
          <li className="hover:underline">
            <a href="tel:+31640707077" aria-label="Call 06-40707077">
              📞 <span className="sr-only">Phone: </span>06-40707077
            </a>
          </li>
          <li>
            <a
              className="hover:underline"
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
