import Link from 'next/link';
import { Image as ResponsiveImage } from 'react-datocms';
import StyledMarkdown from './components/StyledMarkdown';

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
            omschrijving(markdown: false)
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
        <h1 className="text-3xl font-bold text-stone-800 lg:text-3xl dark:text-stone-100">👋 {data.heading}</h1>
        <h2 className="text-lg font-medium text-sky-900 lg:text-lg dark:text-stone-200">{data.functie}</h2>
        <div className="flex flex-col text-stone-800 dark:text-stone-100">
          <StyledMarkdown content={data?.omschrijving} />
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
          <li className="flex gap-2">
            <a
              className="decoration-stone-900/50 underline-offset-4 hover:underline dark:decoration-stone-100/50"
              href="mailto:mail@eviwammes.nl"
              aria-label="Send an email to mail@eviwammes.nl"
            >
              ✉️ <span className="sr-only">Email: </span>mail@eviwammes.nl
            </a>
          </li>
          <li className="flex gap-2">
            <a
              href="tel:+31640707077"
              aria-label="Call 06-40707077"
              className="decoration-stone-900/50 underline-offset-4 hover:underline dark:decoration-stone-100/50"
            >
              📞 <span className="sr-only">Phone: </span>06-40707077
            </a>
          </li>
          <li className="flex gap-2">
            <a
              className="decoration-stone-900/50 underline-offset-4 hover:underline dark:decoration-stone-100/50"
              href="https://maps.app.goo.gl/ARmC54ZH69zgyWVe9"
              aria-label="View location on Google Maps: Amsterdam, NL"
            >
              📍 <span className="sr-only">Location: </span>Amsterdam, NL
            </a>
          </li>
          <li className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 34 33"
              width={20}
              height={20}
              className="aspect-square size-3 invert dark:invert-0"
            >
              <g fill="#fff" clip-path="url(#a)">
                <path d="M2.637 18.023c3.179 0 5.512-4.98 6.461-6.742.928-1.724 2.49-4.814 4.439-6.163l.756-3.65C14.47.728 13.93.011 13.197.011H3.292c-.783 0-1.464.559-1.648 1.35C.596 5.872.046 9.73.046 12.618c0 2.802.897 5.406 2.591 5.406ZM18.199 10.815c0-1.547-.495-3.211-1.581-3.211-1.653 0-3.066 2.623-4.562 5.4-1.041 1.935-2.118 3.935-3.515 5.533-.819.936-2.028 2.066-3.7 2.637h7.608c.785 0 1.515-.424 1.926-1.121.232-.395.467-.785.7-1.17 1.607-2.662 3.124-5.175 3.124-8.068Z" />
                <path d="M29.795 4.773H18.973c1.735 1.13 2.617 3.426 2.617 6.042 0 3.908-1.852 6.976-3.642 9.943-1.614 2.672-3.138 5.197-3.138 8.118v2.937c0 .65.506 1.176 1.13 1.176h10.103c.624 0 1.13-.526 1.13-1.176v-2.73c0-6.728 6.781-10.62 6.781-18.334 0-3.724-1.762-5.976-4.159-5.976Z" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h34v33H0z" />
                </clipPath>
              </defs>
            </svg>
            <span className="flex gap-1">
              <span>Developer</span>
              <span>@</span>
              <Link target="_blank" className="hover:underline" href="https://yummygum.com">
                Yummygum
              </Link>
            </span>
          </li>
        </ul>
      </aside>
    </div>
  );
}
