import { Image } from 'react-datocms'

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

interface responsiveImage {
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
    aspectRatio: string
    alt: string
  }
}

const Page = async () => {
  const { afbeelding } = await getGalleryImages()

  return (
    <main className="w-5/6 overflow-hidden min-h-screen grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-2">
      {afbeelding.afbeeldingen.map((afbeelding: responsiveImage, index) => (
        <Image
          data={afbeelding.responsiveImage}
          pictureClassName="object-cover"
          key={afbeelding.responsiveImage.src}
          className={`rounded-xl overflow-hidden ${index % 2 === 0 ? 'row-span-3' : 'row-span-1'} ${index % 2 !== 0 ? 'col-span-1' : 'col-span-1'}`}
        />
      ))}
    </main>
  )
}

export default Page
