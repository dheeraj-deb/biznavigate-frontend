import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ComingSoon from './components/ComingSoon';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<ComingSoon />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
