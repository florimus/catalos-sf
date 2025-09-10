'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ImageQualityContextType = {
  quality: number;
};

const ImageQualityContext = createContext<ImageQualityContextType | undefined>(
  undefined
);

export const ImageQualityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [quality, setQuality] = useState(1);

  useEffect(() => {
    const upgradeQuality = () => {
      setQuality(100);
      window.removeEventListener('click', upgradeQuality);
      window.removeEventListener('mousemove', upgradeQuality);
      window.removeEventListener('keydown', upgradeQuality);
      window.removeEventListener('scroll', upgradeQuality);
      window.removeEventListener('touchstart', upgradeQuality);
    };

    window.addEventListener('click', upgradeQuality, { once: true });
    window.addEventListener('mousemove', upgradeQuality, { once: true });
    window.addEventListener('keydown', upgradeQuality, { once: true });
    window.addEventListener('scroll', upgradeQuality, { once: true });
    window.addEventListener('touchstart', upgradeQuality, { once: true });

    return () => {
      window.removeEventListener('click', upgradeQuality);
      window.removeEventListener('mousemove', upgradeQuality);
      window.removeEventListener('keydown', upgradeQuality);
      window.removeEventListener('scroll', upgradeQuality);
      window.removeEventListener('touchstart', upgradeQuality);
    };
  }, []);

  return (
    <ImageQualityContext.Provider value={{ quality }}>
      {children}
    </ImageQualityContext.Provider>
  );
};

export const useImageQuality = () => {
  const context = useContext(ImageQualityContext);
  if (!context)
    throw new Error('useImageQuality must be used within ImageQualityProvider');
  return context;
};
