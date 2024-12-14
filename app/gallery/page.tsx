import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import GalleryImage from '@/app/components/GalleryImage';

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
    cloudflareAfbeeldingen {
      imageId
    }
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

export async function generateMetadata() {
  const metaData = await getSeoData('en');

  return {
    title: metaData.pagina.seoGegevens.title,
    description: metaData.pagina.seoGegevens.description,
  };
}

const Page = async () => {
  const { allAfbeeldings } = await getGalleryImages('en');

  Fancybox.bind('[data-fancybox="gallery"]', {});

  return (
    <div className="flex w-full flex-col dark:text-stone-100">
      <h1 className="col-span-3 row-span-1 mb-3 text-4xl font-bold text-stone-800 dark:text-stone-100">Gallery</h1>

      <div className="flex justify-between">
        <span
          className="row-start-1 mb-2 w-fit self-center rounded-full bg-stone-300 px-3 py-1 text-left text-black
            opacity-80 dark:bg-stone-700 dark:text-white dark:opacity-100"
        >
          Used camera: Pentax ME Super
        </span>
      </div>

      {allAfbeeldings.map(
        (
          collection: {
            fotorolletje: string;
            afbeeldingen: IResponsiveImage[];
            cloudflareAfbeeldingen: {
              imageId: string;
            }[];
          },
          index: number,
        ) => (
          <div
            key={`image-collection-${collection.fotorolletje}`}
            className="grid min-h-screen grid-cols-1 gap-2 overflow-hidden lg:grid-cols-2 xl:grid-cols-3"
          >
            <span
              className={`${index > 0 && 'my-2'} col-span-full row-start-1 w-fit self-center rounded-full bg-stone-300
              px-3 py-1 text-left text-black opacity-80 dark:bg-stone-700 dark:text-white dark:opacity-100`}
            >{`Used film: ${collection.fotorolletje}`}</span>

            {collection.cloudflareAfbeeldingen.map((image: { imageId: string }, indexCloudflare: number) => (
              <GalleryImage
                imageId={image.imageId}
                key={`gallery-image-cloudflare-${index - indexCloudflare}`}
                index={index}
              />
            ))}

            {collection.afbeeldingen.map((image: IResponsiveImage, indexDatoCMS: number) => (
              <GalleryImage
                responsiveImage={image.responsiveImage}
                key={`gallery-image-${indexDatoCMS}`}
                index={indexDatoCMS}
              />
            ))}
          </div>
        ),
      )}
    </div>
  );
};

export default Page;
