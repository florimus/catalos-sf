'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IMedia } from '@/common/lib/types';
import Image from '@/common/lib/atoms/Image';

const ImageGallery = ({ medias = [] }: { medias?: IMedia[] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [mainImage, setMainImage] = useState<IMedia | undefined>();
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    if (medias && medias.length > 0) {
      setMainImage(medias[0]);
    }
  }, [medias]);

  const scroll = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 150;
      carouselRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleImageChange = (src: IMedia, index: number) => {
    const curr = medias.findIndex(
      (m) => m.defaultSrc === mainImage?.defaultSrc
    );
    if (index === curr) return;

    setDirection(index > curr ? 1 : -1);
    setMainImage(src);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.2 } },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full relative aspect-square flex items-center justify-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50'>
        <AnimatePresence custom={direction} mode='wait'>
          {mainImage && (
            <motion.div
              key={mainImage?.defaultSrc}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              className='absolute w-full h-full'
            >
              <Image medias={mainImage} alt={mainImage?.alt} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className='relative w-full mt-4'>
        <button
          onClick={() => scroll('left')}
          className='absolute -left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 z-10 cursor-pointer'
        >
          <ChevronLeft className='w-5 h-5' />
        </button>

        <div
          ref={carouselRef}
          className='flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth relative'
        >
          {medias.map((media: IMedia, i) => (
            <button
              key={i}
              onClick={() => handleImageChange(media, i)}
              className='w-15 md:w-20 h-15 md:h-20 border border-gray-200 rounded-lg flex-shrink-0 overflow-hidden cursor-pointer'
            >
              <div className='relative w-full h-full aspect-square'>
                <Image
                  medias={media}
                  alt={`Thumbnail ${i}`}
                  className='object-cover rounded-md'
                />
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className='absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 z-10 cursor-pointer'
        >
          <ChevronRight className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
