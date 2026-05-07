import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FadeUp from './FadeUp';

const steps = [
  { num: '01', title: 'Connect Channels', description: 'Link your WhatsApp, Instagram, or website to our platform in one click.', icon: <LinkIcon sx={{ fontSize: 28 }} />, color: '#4E5FFD', bg: '#EEF0FF' },
  { num: '02', title: 'Build Your Flow', description: 'Use the visual builder to create your conversation journey — greeting → menu → catalog → checkout.', icon: <AccountTreeIcon sx={{ fontSize: 28 }} />, color: '#FF6B6B', bg: '#FFF0F0' },
  { num: '03', title: 'Go Live', description: 'Activate your workflow. Every customer message is handled automatically, 24/7.', icon: <PlayCircleOutlineIcon sx={{ fontSize: 28 }} />, color: '#10B981', bg: '#ECFDF5' },
  { num: '04', title: 'Track & Optimize', description: 'See which nodes customers drop off at and improve your flow with AI analysis.', icon: <ShowChartIcon sx={{ fontSize: 28 }} />, color: '#F59E0B', bg: '#FFFBEB' },
];

const HowItWorksSection = () => (
  <Box sx={{ py: { xs: 10, md: 16 }, background: '#F8F7FF' }}>
    <Container maxWidth="lg">
      <FadeUp delay={0.1}>
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <Typography sx={{ color: '#4E5FFD', fontWeight: 600, fontSize: '0.85rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            The Process
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, color: '#1A1A2E', lineHeight: 1.2, letterSpacing: '-0.02em', mb: 2 }}>
            How it works
          </Typography>
          <Typography sx={{ color: '#6B7280', fontSize: '1.05rem', maxWidth: 500, mx: 'auto', lineHeight: 1.7 }}>
            Get your AI employee working in three simple steps.
          </Typography>
        </Box>
      </FadeUp>

      <Grid container spacing={3}>
        {steps.map((step, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
            <FadeUp delay={0.1 + i * 0.1} fullWidth>
              <Box
                sx={{
                  p: 3.5, borderRadius: '20px', background: '#ffffff',
                  border: '1px solid #F3F4F6', height: '100%',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                    transform: 'translateY(-4px)',
                    borderColor: 'transparent',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Box sx={{ width: 52, height: 52, borderRadius: '14px', background: step.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color }}>
                    {step.icon}
                  </Box>
                  <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: '#F3F4F6', lineHeight: 1 }}>
                    {step.num}
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E', mb: 1.5 }}>
                  {step.title}
                </Typography>
                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  {step.description}
                </Typography>
              </Box>
            </FadeUp>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default HowItWorksSection;
