import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BackToTop from '../components/BackToTop';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollProgressBar />
      <Header />
      <Box component="main" sx={{ flexGrow: 1, pt: { xs: 12, md: 16 } }}>
        {children}
      </Box>
      <Footer />
      <BackToTop />
    </Box>
  );
};

export default MainLayout; 
