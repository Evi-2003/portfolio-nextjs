'use client';

import { Fancybox } from '@fancyapps/ui';
import { Image } from 'react-datocms';
import { responsiveImage } from '../gallery/page';

const GalleryImage = ({
  responsiveImage,
  index,
}: {
  responsiveImage: responsiveImage['responsiveImage'];
  index: number;
}) => {
  Fancybox.bind('[data-fancybox="gallery"]', {});

  return (
    <a
      data-fancybox="gallery"
      data-src={responsiveImage.webpSrcSet}
      className={`cursor-pointer overflow-hidden rounded-xl ${index % 2 === 0 ? 'row-span-3' : 'row-span-1'}
        ${index % 2 !== 0 ? 'col-span-1' : 'col-span-1'}`}
    >
      <Image data={responsiveImage} pictureClassName="object-cover" className="h-full w-full" />
    </a>
  );
};

export default GalleryImage;
