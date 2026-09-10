'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Skeleton, BoxProps } from '@mui/material';

interface OptimizedImageProps extends Omit<BoxProps, 'component'> {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  objectFit?: React.CSSProperties['objectFit'];
  priority?: boolean;
  /** Rendered width across breakpoints, so the optimizer picks a size. */
  sizes?: string;
}

/**
 * Fills its parent with an optimised, resized image.
 *
 * This used to render nothing on the server and wait for an IntersectionObserver
 * to swap in a raw <img>, which put image loading behind hydration — the hero on
 * a property page did not start downloading until ~6s in. `next/image` emits the
 * <img> in the prerendered HTML instead, so the browser's preload scanner finds
 * it immediately, and serves resized AVIF/WebP rather than the owner's original
 * upload.
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  priority = false,
  sizes = '(max-width: 600px) 100vw, (max-width: 1280px) 50vw, 640px',
  sx,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        ...sx,
      }}
      {...rest}
    >
      {/* Sits behind the image and shows through until it paints. The image
          itself is never hidden behind an `opacity` flag: an image that
          finished loading before React hydrated would never fire onLoad, and
          would then stay invisible. */}
      {!loaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          }}
        />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        // Priority images are already fetched eagerly; `loading` must not be
        // set alongside it.
        {...(priority ? {} : { loading: 'lazy' as const })}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={{ objectFit, zIndex: 1 }}
      />
    </Box>
  );
};

export default OptimizedImage;
