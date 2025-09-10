import NextImage from 'next/image';
import { IMedia } from '../types';

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
  return (
    <picture>
      <source media='(max-width: 768px)' srcSet={medias?.sm} />
      <source media='(min-width: 769px)' srcSet={medias?.lg} />
      <NextImage
        src={medias?.defaultSrc || placeholder}
        alt={alt}
        fill
        className={className}
      />
    </picture>
  );
};

export default Image;
