'use client';

import NextImage from 'next/image';
import { IMedia } from '../types';
import { useImageQuality } from '@/common/context/imageQualityCotext';

interface ImageProps {
  medias: IMedia;
  alt: string;
  placeholder?: string;
  className?: string;
}

const Image = ({
  medias,
  alt,
  placeholder = '/placeholder.png',
  className = 'object-contain w-full h-full',
}: ImageProps) => {
  const { quality } = useImageQuality();
  return (
    <picture>
      {quality > 25 && (
        <>
          <source media='(max-width: 768px)' srcSet={medias?.sm} />
          <source media='(min-width: 769px)' srcSet={medias?.lg} />{' '}
        </>
      )}
      <NextImage
        src={medias?.defaultSrc || placeholder}
        alt={alt}
        quality={quality}
        fill
        className={className}
        fetchPriority="high"
      />
    </picture>
  );
};

export default Image;
