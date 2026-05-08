import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Box
      onClick={scrollToTop}
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: '#4E5FFD',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(78,95,253,0.4)',
        zIndex: 1200,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
        pointerEvents: visible ? 'auto' : 'none',
        '&:hover': {
          background: '#3A4AE8',
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(78,95,253,0.5)',
        },
      }}
    >
      <KeyboardArrowUpIcon sx={{ fontSize: '1.3rem' }} />
    </Box>
  );
};

export default BackToTop;
