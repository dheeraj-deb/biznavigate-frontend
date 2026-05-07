import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import FadeUp from './FadeUp';

const features = [
  { title: 'Handles enquiries like a human', icon: <ChatBubbleOutlineIcon />, color: '#4E5FFD', bg: '#EEF0FF' },
  { title: 'Collects booking payments', icon: <PaymentOutlinedIcon />, color: '#10B981', bg: '#ECFDF5' },
  { title: 'Auto-gathers reviews & photos', icon: <StarBorderOutlinedIcon />, color: '#F59E0B', bg: '#FFFBEB' },
  { title: 'Direct website widget integration', icon: <PsychologyOutlinedIcon />, color: '#7B3FE4', bg: '#F5F0FF' },
  { title: 'Automates packages, dates & slots', icon: <EventAvailableOutlinedIcon />, color: '#FF6B6B', bg: '#FFF0F0' },
  { title: 'Replaces messy broadcast lists', icon: <SendOutlinedIcon />, color: '#06B6D4', bg: '#ECFEFF' },
];

const SolutionSection = () => (
  <Box id="solutions" sx={{ py: { xs: 10, md: 16 }, background: '#ffffff', overflow: 'hidden' }}>
    <Container maxWidth="lg">
      <FadeUp delay={0.1}>
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 }, maxWidth: 640, mx: 'auto' }}>
          <Typography sx={{ color: '#4E5FFD', fontWeight: 600, fontSize: '0.85rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            The Solution
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, color: '#1A1A2E', lineHeight: 1.2, letterSpacing: '-0.02em', mb: 2 }}>
            Meet your AI Employee
          </Typography>
          <Typography sx={{ color: '#6B7280', fontSize: '1.05rem', lineHeight: 1.7 }}>
            A digital workforce that works around the clock, perfectly executing everything your natural staff would do—only faster.
          </Typography>
        </Box>
      </FadeUp>

      <Grid container spacing={4} alignItems="center">
        {/* Left features */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FadeUp delay={0.15}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {features.slice(0, 3).map((f, i) => (
                <Box key={i} sx={{
                  p: 3, borderRadius: '16px', background: '#ffffff',
                  border: '1px solid #F3F4F6', textAlign: { xs: 'left', md: 'right' },
                  display: 'flex', flexDirection: { xs: 'row', md: 'row-reverse' }, alignItems: 'center', gap: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.06)', transform: 'translateY(-2px)', borderColor: 'transparent' },
                }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, flexShrink: 0 }}>
                    {f.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#1A1A2E', lineHeight: 1.4 }}>{f.title}</Typography>
                </Box>
              ))}
            </Box>
          </FadeUp>
        </Grid>

        {/* Center phone mockup */}
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 300, height: 580, position: 'relative' }}>
            <Box sx={{
              width: '100%', height: '100%', borderRadius: '40px',
              border: '8px solid #1A1A2E',
              background: '#ffffff', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 32px 80px rgba(0,0,0,0.15)',
            }}>
              {/* WhatsApp Header */}
              <Box sx={{ p: 2, background: '#075E54', display: 'flex', alignItems: 'center', color: '#fff', gap: 1.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '50%', background: '#128C7E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PsychologyOutlinedIcon sx={{ fontSize: '1.1rem', color: '#fff' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.2 }}>AI Assistant</Typography>
                  <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)' }}>online</Typography>
                </Box>
              </Box>
              {/* Chat body */}
              <Box sx={{ flexGrow: 1, background: '#EFEAE2', p: 1.5, display: 'flex', flexDirection: 'column', gap: 1, overflow: 'hidden' }}>
                <Box sx={{ alignSelf: 'flex-end', background: '#DCF8C6', p: 1, borderRadius: '8px 8px 0 8px', maxWidth: '80%' }}>
                  <Typography sx={{ fontSize: '0.75rem' }}>Hi there!</Typography>
                </Box>
                <Box sx={{ alignSelf: 'flex-start', background: '#fff', p: 1, borderRadius: '0 8px 8px 8px', maxWidth: '85%' }}>
                  <Typography sx={{ fontSize: '0.75rem' }}>Hello! 👋 Welcome! How can I assist you today?</Typography>
                </Box>
                <Box sx={{ alignSelf: 'flex-end', background: '#DCF8C6', p: 1, borderRadius: '8px 8px 0 8px', maxWidth: '80%' }}>
                  <Typography sx={{ fontSize: '0.75rem' }}>Do you have running shoes on sale?</Typography>
                </Box>
                <Box sx={{ alignSelf: 'flex-start', background: '#fff', p: 1, borderRadius: '0 8px 8px 8px', maxWidth: '90%', width: '90%' }}>
                  <Typography sx={{ fontSize: '0.75rem', mb: 1 }}>Yes! 20% off our top runners:</Typography>
                  <Box sx={{ background: '#f5f5f5', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                    <Box component="img" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80" alt="Shoe" sx={{ width: '100%', height: 80, objectFit: 'cover' }} />
                    <Box sx={{ p: 1 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.7rem' }}>AeroSprint Pro</Typography>
                      <Typography sx={{ color: '#4E5FFD', fontWeight: 700, fontSize: '0.7rem' }}>$120 <Box component="span" sx={{ textDecoration: 'line-through', color: '#999', fontWeight: 400 }}>$150</Box></Typography>
                    </Box>
                    <Box sx={{ display: 'flex', borderTop: '1px solid #e0e0e0' }}>
                      <Box sx={{ flex: 1, py: 0.5, textAlign: 'center', fontSize: '0.65rem', color: '#4E5FFD', fontWeight: 600, borderRight: '1px solid #e0e0e0', cursor: 'pointer' }}>View</Box>
                      <Box sx={{ flex: 1, py: 0.5, textAlign: 'center', fontSize: '0.65rem', color: '#fff', background: '#4E5FFD', fontWeight: 600, cursor: 'pointer' }}>Buy Now</Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ alignSelf: 'flex-start', display: 'flex', gap: 0.5, p: 1, px: 1.5, background: '#fff', borderRadius: '16px' }}>
                  {[0, 0.2, 0.4].map((d, i) => (
                    <Box key={i} sx={{ width: 6, height: 6, borderRadius: '50%', background: '#128C7E', animation: 'bounce 1.4s infinite ease-in-out', animationDelay: `${d}s` }} />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right features */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FadeUp delay={0.25}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {features.slice(3).map((f, i) => (
                <Box key={i} sx={{
                  p: 3, borderRadius: '16px', background: '#ffffff',
                  border: '1px solid #F3F4F6',
                  display: 'flex', alignItems: 'center', gap: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.06)', transform: 'translateY(-2px)', borderColor: 'transparent' },
                }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, flexShrink: 0 }}>
                    {f.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#1A1A2E', lineHeight: 1.4 }}>{f.title}</Typography>
                </Box>
              ))}
            </Box>
          </FadeUp>
        </Grid>
      </Grid>
    </Container>
    <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }`}</style>
  </Box>
);

export default SolutionSection;
