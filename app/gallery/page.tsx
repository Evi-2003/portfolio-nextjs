import { Image } from 'react-datocms'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import GalleryImage from '../components/GalleryImage'

async function getGalleryImages() {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
        query getPictures {
          afbeelding {
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

async function getSeoData() {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query getSeoData {
        pagina(filter: {slug: {eq: "gallery"}}) {
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
  const metaData = await getSeoData()

  return {
    title: metaData.pagina.seoGegevens.title,
    description: metaData.pagina.seoGegevens.description,
  }
}

const Page = async () => {
  const { afbeelding } = await getGalleryImages()
  Fancybox.bind('[data-fancybox="gallery"]', {})

  return (
    <main className="w-5/6 flex flex-col dark:text-stone-100">
      <span className="text-lg">Gebruikte camera: Pentax ME Super</span>
      <span className="mb-3 text-lg">Foto&apos;s gemaakt op fotorolletje: {afbeelding.fotorolletje}</span>

      <div className="overflow-hidden min-h-screen grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-2">
        {afbeelding.afbeeldingen.map((afbeelding: responsiveImage, index: number) => (
          <GalleryImage responsiveImage={afbeelding.responsiveImage} key={`gallery-image-${index}`} index={index} />
        ))}
      </div>
    </main>
  )
}

export default Page
