import { Image } from 'react-datocms'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import GalleryImage from '../components/GalleryImage'

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
  }).then((res) => res.json())

  return data
}

export interface responsiveImage {
  responsiveImage: {
    width: number
    webpSrcSet: string
    title: string
    srcSet: string
    sizes: string
    src: string
    height: number
    bgColor: string
    base64: string
    aspectRatio: number
    alt: string
  }
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
  }).then((res) => res.json())

  return data
}

export async function generateMetadata() {
  const metaData = await getSeoData('en')

  return {
    title: metaData.pagina.seoGegevens.title,
    description: metaData.pagina.seoGegevens.description,
  }
}

const Page = async ({ params: { lang } }: { params: { lang: string } }) => {
  const lng = lang === 'en-US' ? 'en' : 'nl'
  const { allAfbeeldings } = await getGalleryImages(lng)

  Fancybox.bind('[data-fancybox="gallery"]', {})

  return (
    <main className="w-5/6 flex flex-col dark:text-stone-100">
      <div className="flex justify-between">
        <span className="row-start-1 w-fit self-center rounded-full bg-stone-300 px-3 py-1 mb-2 text-left text-black opacity-80 dark:bg-stone-700 dark:text-white dark:opacity-100">
          {`${lng === 'en' ? 'Used camera:' : 'Gebruikte camera:'} Pentax ME Super`}
        </span>
      </div>

      {allAfbeeldings.map((collection: { fotorolletje: string; afbeeldingen: responsiveImage[] }) => (
        <div key={`image-collection-${collection.fotorolletje}`} className="overflow-hidden min-h-screen grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-2">
          <span className="row-start-1 self-center rounded-full bg-stone-300 px-3 py-1 text-left text-black opacity-80 dark:bg-stone-700 dark:text-white dark:opacity-100 col-span-full w-fit">{`${
            lng === 'en' ? 'Used film:' : 'Gebruikte fotorol:'
          } ${collection.fotorolletje}`}</span>

          {collection.afbeeldingen.map((image: responsiveImage, index: number) => (
            <GalleryImage responsiveImage={image.responsiveImage} key={`gallery-image-${index}`} index={index} />
          ))}
        </div>
      ))}
    </main>
  )
}

export default Page
