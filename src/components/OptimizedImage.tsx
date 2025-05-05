import React, { useState, useEffect } from 'react';
import { Box, Skeleton, BoxProps } from '@mui/material';

interface OptimizedImageProps extends Omit<BoxProps, 'component'> {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  objectFit?: React.CSSProperties['objectFit'];
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  priority = false,
  sx,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(priority ? src : null);
  
  useEffect(() => {
    if (!priority) {
      // Check if this component is in the viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImgSrc(src);
            observer.disconnect();
          }
        });
      }, {
        rootMargin: '200px' // Start loading when image is 200px from viewport
      });
      
      const currentRef = document.querySelector(`[data-img-id="${src}"]`);
      if (currentRef) {
        observer.observe(currentRef);
      }
      
      return () => {
        observer.disconnect();
      };
    }
  }, [src, priority]);
  
  const handleLoad = () => {
    setLoaded(true);
  };
  
  const handleError = () => {
    setError(true);
    setLoaded(true);
  };
  
  return (
    <Box
      data-img-id={src}
      sx={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        ...sx
      }}
      {...rest}
    >
      {(!loaded || !imgSrc) && (
        <Skeleton 
          variant="rectangular" 
          animation="wave"
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          }} 
        />
      )}
      
      {imgSrc && (
        <Box
          component="img"
          src={imgSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            width: '100%',
            height: '100%',
            objectFit,
            display: loaded ? 'block' : 'none',
            transition: 'opacity 0.3s ease'
          }}
        />
      )}
    </Box>
  );
};

export default OptimizedImage; 