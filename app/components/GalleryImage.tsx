'use client'

import { Image } from 'react-datocms'
import { responsiveImage } from '../gallery/page'
import { Fancybox } from '@fancyapps/ui'

const GalleryImage = ({ responsiveImage, index }: { responsiveImage: responsiveImage['responsiveImage']; index: number }) => {
  Fancybox.bind('[data-fancybox="gallery"]', {})

  return (
    <a data-fancybox="gallery" data-src={responsiveImage.webpSrcSet}>
      <Image
        data={responsiveImage}
        pictureClassName="object-cover"
        className={`rounded-xl overflow-hidden ${index % 2 === 0 ? 'row-span-3' : 'row-span-1'} ${index % 2 !== 0 ? 'col-span-1' : 'col-span-1'}`}
      />
    </a>
  )
}

export default GalleryImage
