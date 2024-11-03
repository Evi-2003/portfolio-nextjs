'use client';

import { Fancybox } from '@fancyapps/ui';
import { Image } from 'react-datocms';
import { IResponsiveImage } from '../nl-NL/gallery/page';
import CloudflareImage from './CloudflareImage';

const GalleryImage = ({
  responsiveImage,
  imageId,
  index,
}: {
  responsiveImage?: IResponsiveImage['responsiveImage'];
  imageId?: string;
  index: number;
}) => {
  Fancybox.bind('[data-fancybox="gallery"]', {});

  return (
    <a
      data-fancybox="gallery"
      data-src={
        responsiveImage
          ? responsiveImage.webpSrcSet
          : `https://imagedelivery.net/MIBm4UuP4Jw-6-_5GPO_5w/${imageId}/public`
      }
      className={`cursor-pointer overflow-hidden rounded-xl ${index % 2 === 0 ? 'row-span-3' : 'row-span-1'}
        ${index % 2 !== 0 ? 'col-span-1' : 'col-span-1'}`}
    >
      {responsiveImage ? (
        <Image objectFit="cover" data={responsiveImage} pictureClassName="object-cover" className="h-full w-full" />
      ) : (
        <CloudflareImage width={1500} height={1500} className="h-full object-cover" imageId={imageId} />
      )}
    </a>
  );
};

export default GalleryImage;
