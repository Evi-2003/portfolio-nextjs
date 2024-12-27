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

const Gallery = async () => {
  const { allAfbeeldings } = await getGalleryImages('en');

  Fancybox.bind('[data-fancybox="gallery"]', {});

  return (
    <div className="flex w-full flex-col dark:text-stone-100">
      <h2 className="col-span-3 row-span-1 mb-3 text-2xl font-bold text-stone-800 dark:text-stone-100">
        Sometimes i like to take some pictures
      </h2>

      <div className="flex justify-between">
        <span
          className="row-start-1 mb-2 w-fit self-center rounded-full bg-stone-300 px-3 py-1 text-left text-base
            text-black opacity-80 dark:bg-stone-700 dark:text-white dark:opacity-100"
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
            className="grid grid-cols-1 gap-2 overflow-hidden lg:grid-cols-2 xl:grid-cols-3"
          >
            <span
              className={`${index > 0 && 'mt-2'} col-span-full row-start-1 w-fit self-center rounded-full bg-stone-300
              px-3 py-1 text-left text-base text-black opacity-80 dark:bg-stone-700 dark:text-white dark:opacity-100`}
            >{`Used film: ${collection.fotorolletje}`}</span>

            {collection.cloudflareAfbeeldingen.map((image: { imageId: string }, indexCloudflare: number) => (
              <GalleryImage
                imageId={image.imageId}
                key={`gallery-image-cloudflare-${index - indexCloudflare}`}
                index={indexCloudflare + 1}
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

export default Gallery;
