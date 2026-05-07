import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import FadeUp from './FadeUp';

const problems = [
  { title: 'Static Pricing', icon: <TrendingDownOutlinedIcon />, description: 'Leaving money on the table by keeping prices flat when demand changes.' },
  { title: 'Missed enquiries', icon: <NotificationsOffOutlinedIcon />, description: 'Customers message you off-hours and leave when they don\'t get a reply.' },
  { title: 'Slow replies', icon: <HourglassEmptyOutlinedIcon />, description: 'Delayed responses hurt your conversion rate and frustrate leads.' },
  { title: 'Manual handling', icon: <EditNoteOutlinedIcon />, description: 'Wasting hours copying orders and bookings into your system.' },
  { title: 'Broadcast Chaos', icon: <NotificationsOffOutlinedIcon />, description: 'Frustrating event attendees with messy community WhatsApp groups or manual broadcast lists.' },
];

const ProblemSection = () => (
  <Box sx={{ py: { xs: 10, md: 16 }, background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
        {/* Content */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FadeUp delay={0.1}>
            <Box sx={{ mb: 5 }}>
              <Typography
                sx={{ color: '#4E5FFD', fontWeight: 600, fontSize: '0.85rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}
              >
                The Problem
              </Typography>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, color: '#1A1A2E', lineHeight: 1.2, letterSpacing: '-0.02em', mb: 2.5 }}
              >
                The manual way<br />
                <Box component="span" sx={{ color: '#9CA3AF' }}>costing you customers</Box>
              </Typography>
              <Typography sx={{ color: '#6B7280', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Operating a business shouldn't mean being tied to your phone 24/7. Here is what happens without an AI employee handling the frontline.
              </Typography>
            </Box>
          </FadeUp>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {problems.map((problem, i) => (
              <FadeUp delay={0.15 + i * 0.08} key={i}>
                <Box
                  sx={{
                    display: 'flex', gap: 3, alignItems: 'flex-start', p: 2.5,
                    borderRadius: '16px', border: '1px solid #F3F4F6',
                    transition: 'all 0.2s ease',
                    '&:hover': { background: '#F8F7FF', borderColor: 'rgba(78,95,253,0.2)', boxShadow: '0 4px 20px rgba(78,95,253,0.06)' },
                  }}
                >
                  <Box sx={{
                    width: 44, height: 44, borderRadius: '12px', background: '#FFF0F0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#FF6B6B', flexShrink: 0,
                  }}>
                    {problem.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1A2E', mb: 0.5 }}>
                      {problem.title}
                    </Typography>
                    <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.6 }}>
                      {problem.description}
                    </Typography>
                  </Box>
                </Box>
              </FadeUp>
            ))}
          </Box>
        </Grid>

        {/* Visual */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FadeUp delay={0.1}>
            <Box sx={{ position: 'relative' }}>
              <Box sx={{
                borderRadius: '24px', overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(0,0,0,0.12)',
                position: 'relative', aspectRatio: '1',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80"
                  alt="Overwhelmed business owner"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,46,0.4) 0%, transparent 60%)' }} />
              </Box>

              {/* Floating card */}
              <Paper
                elevation={0}
                sx={{
                  position: 'absolute', bottom: -20, left: -20, right: 40,
                  p: 2.5, borderRadius: '16px',
                  background: '#ffffff', boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                  border: '1px solid #F3F4F6',
                  display: 'flex', alignItems: 'center', gap: 2,
                }}
              >
                <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: '#FFF0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF6B6B', flexShrink: 0 }}>
                  <NotificationsOffOutlinedIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#1A1A2E' }}>8 Unread Messages</Typography>
                  <Typography sx={{ color: '#9CA3AF', fontSize: '0.8rem' }}>from Instagram & WhatsApp</Typography>
                </Box>
                <Box sx={{ ml: 'auto', width: 10, height: 10, borderRadius: '50%', background: '#FF6B6B', flexShrink: 0, animation: 'pulse 2s infinite' }} />
              </Paper>
            </Box>
          </FadeUp>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default ProblemSection;
