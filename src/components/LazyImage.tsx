import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
}

const LazyImage = ({ src, fallback = '/placeholder.svg', className, ...props }: LazyImageProps) => {
  const [imgSrc, setImgSrc] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  return (
    <img
      src={imgSrc}
      className={cn(
        'transition-opacity duration-300',
        isLoading ? 'opacity-50' : 'opacity-100',
        className
      )}
      {...props}
    />
  );
};

export default LazyImage;