import React from 'react';
import { Box } from '@mui/material';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import HowItWorksSection from '../components/HowItWorksSection';
import FeaturesGridSection from '../components/FeaturesGridSection';
import UseCaseSection from '../components/UseCaseSection';
import DashboardPreviewSection from '../components/DashboardPreviewSection';
import DifferentiationSection from '../components/DifferentiationSection';
import MetricsSection from '../components/MetricsSection';
import AISuggestionsSection from '../components/AISuggestionsSection';
import FinalCTASection from '../components/FinalCTASection';

const Home = () => {
  return (
    <Box>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeaturesGridSection />
      <UseCaseSection />
      <DashboardPreviewSection />
      <DifferentiationSection />
      <AISuggestionsSection />
      <MetricsSection />
      <FinalCTASection />
    </Box>
  );
};

export default Home;
