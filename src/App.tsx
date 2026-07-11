import React, { Suspense, lazy } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ComingSoon from "./components/ComingSoon";
import TermsOfService from "./pages/TermsOfService";
import DataDeletion from "./pages/DataDeletion";

// SmartPages (public resort pages) load as their own chunk so the marketing
// home bundle is unaffected.
const ResortsRoutes = lazy(() => import("./pages/resorts/ResortsRoutes"));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/resorts/*"
          element={
            <Suspense fallback={null}>
              <ResortsRoutes />
            </Suspense>
          }
        />
        <Route path="/*" element={
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout>
              <Routes>
                <Route path="pricing" element={<ComingSoon />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<TermsOfService />} />
                <Route path="data-deletion" element={<DataDeletion />} />
              </Routes>
            </MainLayout>
          </ThemeProvider>
        } />
      </Routes>
    </Router>
  );
};

export default App;
