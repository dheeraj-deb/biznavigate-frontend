import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #4E5FFD, #7B3FE4)',
        zIndex: 9999,
        transition: 'width 0.05s linear',
        pointerEvents: 'none',
      }}
    />
  );
};

export default ScrollProgressBar;
