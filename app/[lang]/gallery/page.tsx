import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import GalleryImage from '@/app/components/GalleryImage';
import checkLanguage from '@/app/utils/checkLanguage';

async function getGalleryImages(lng: string) {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
        query getPictures {
          allAfbeeldings (locale: ${lng}) {
            fotorolletje 
            afbeeldingen {
              responsiveImage {
                width
                webpSrcSet
                title
                srcSet
                sizes
                src
                height
                bgColor
                base64
                aspectRatio
                alt
              }
            }
          }
        }
  `,
    }),
  }).then((res) => res.json());

  return data;
}

export interface IResponsiveImage {
  responsiveImage: {
    width: number;
    webpSrcSet: string;
    title: string;
    srcSet: string;
    sizes: string;
    src: string;
    height: number;
    bgColor: string;
    base64: string;
    aspectRatio: number;
    alt: string;
  };
}

async function getSeoData(lng: string) {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query getSeoData {
        pagina(filter: {slug: {eq: "gallery"}}, locale: ${lng}) {
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

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const lng = checkLanguage(lang);
  const metaData = await getSeoData(lng);

  return {
    title: metaData.pagina.seoGegevens.title,
    description: metaData.pagina.seoGegevens.description,
  };
}

const Page = async ({ params: { lang } }: { params: { lang: string } }) => {
  const lng = checkLanguage(lang);
  const { allAfbeeldings } = await getGalleryImages(lng);

  Fancybox.bind('[data-fancybox="gallery"]', {});

  return (
    <main className="flex w-5/6 flex-col dark:text-stone-100">
      <div className="flex justify-between">
        <span
          className="row-start-1 mb-2 w-fit self-center rounded-full bg-stone-300 px-3 py-1 text-left text-black
            opacity-80 dark:bg-stone-700 dark:text-white dark:opacity-100"
        >
          {`${lng === 'en' ? 'Used camera:' : 'Gebruikte camera:'} Pentax ME Super`}
        </span>
      </div>

      {allAfbeeldings.map((collection: { fotorolletje: string; afbeeldingen: IResponsiveImage[] }) => (
        <div
          key={`image-collection-${collection.fotorolletje}`}
          className="grid min-h-screen grid-cols-1 gap-2 overflow-hidden lg:grid-cols-2 xl:grid-cols-3"
        >
          <span
            className="col-span-full row-start-1 w-fit self-center rounded-full bg-stone-300 px-3 py-1 text-left
              text-black opacity-80 dark:bg-stone-700 dark:text-white dark:opacity-100"
          >{`${lng === 'en' ? 'Used film:' : 'Gebruikte fotorol:'} ${collection.fotorolletje}`}</span>

          {collection.afbeeldingen.map((image: IResponsiveImage, index: number) => (
            <GalleryImage responsiveImage={image.responsiveImage} key={`gallery-image-${index}`} index={index} />
          ))}
        </div>
      ))}
    </main>
  );
};

export default Page;
