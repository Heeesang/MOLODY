"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SongImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}

export default function SongImage({ src, alt, width, height, className }: SongImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => {
        setImgSrc('/blank_thumbnail.svg');
      }}
    />
  );
}
