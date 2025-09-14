'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
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

  const scroll = (dir: 'up' | 'down' | 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 120;
      carouselRef.current.scrollBy({
        top: dir === 'up' ? -scrollAmount : dir === 'down' ? scrollAmount : 0,
        left: dir === 'left' ? -scrollAmount : dir === 'right' ? scrollAmount : 0,
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
    <div className="flex flex-col md:flex-row items-start gap-4">
      <div className="relative flex md:flex-col items-center order-2 md:order-1 w-full md:w-auto">
        <button
          onClick={() => scroll('up')}
          className="hidden md:block mb-2 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 z-10 cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll('left')}
          className="md:hidden absolute -left-3 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={carouselRef}
          className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[400px] scrollbar-hide w-full md:w-auto scroll-smooth"
        >
          {medias.map((media: IMedia, i) => (
            <button
              key={i}
              onClick={() => handleImageChange(media, i)}
              className="w-20 h-20 border border-gray-200 rounded-lg flex-shrink-0 overflow-hidden cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  medias={media}
                  alt={`Thumbnail ${i}`}
                  className="object-cover rounded-md"
                />
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll('down')}
          className="hidden md:block mt-2 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 z-10 cursor-pointer"
        >
          <ChevronDown className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="md:hidden absolute -right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="order-1 md:order-2 w-full relative aspect-square flex items-center justify-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
        <AnimatePresence custom={direction} mode="wait">
          {mainImage && (
            <motion.div
              key={mainImage?.defaultSrc}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full h-full"
            >
              <Image medias={mainImage} alt={mainImage?.alt} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageGallery;
