'use client';

import Image from 'next/image';
import React from 'react';

const CloudflareImage = ({
  imageId,
  width,
  height,
  className,
  title,
}: {
  imageId?: string | null;
  width: number;
  height: number;
  className?: string;
  title?: string;
}) => {
  if (!imageId) {
    return <div className={`bg-gray-200 ${className}`} style={{ width, height }} />;
  }

  const imageSrc = `https://imagedelivery.net/MIBm4UuP4Jw-6-_5GPO_5w/${imageId}/public`;

  return <Image src={imageSrc} quality={80} width={width} height={height} className={className} alt={title ?? ''} />;
};

export default CloudflareImage;
