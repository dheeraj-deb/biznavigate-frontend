import React from 'react';
import { Box } from '@mui/material';
import Hero from '../components/Hero';
import Solutions from '../components/Solutions';
import AIAgents from '../components/AIAgents';
import Partners from '../components/Partners';

const Home = () => {
  return (
    <Box>
      <Hero />
      {/* <Partners /> */}
      <Solutions />
      <AIAgents />
    </Box>
  );
};

export default Home; 