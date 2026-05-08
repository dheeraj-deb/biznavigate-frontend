import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Tab, Tabs } from '@mui/material';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FadeUp from './FadeUp';

const useCases = [
  {
    category: 'Resorts & Hotels', icon: <HotelOutlinedIcon />,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80',
    title: 'Automate Bookings & Guest Queries',
    benefits: ['Check room availability instantly via WhatsApp', 'Process secure booking payments 24/7', 'Answer FAQs about amenities and check-in times', 'Provide an AI chatbot during the guest\'s stay', 'Send automated pre-arrival instructions'],
  },
  {
    category: 'Trips & Activities', icon: <TerrainOutlinedIcon />,
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1000&q=80',
    title: 'Automate Activity Organization',
    benefits: ['Replace messy WhatsApp broadcast groups with an automated chatbot', 'Automate camping slot availability and instant booking', 'Collect attendee photos and reviews automatically post-trip', 'Sync reviews directly to your website testimonials via widget'],
  },
  {
    category: 'Ecommerce', icon: <StorefrontOutlinedIcon />,
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80',
    title: 'Sell Products directly in Chat',
    benefits: ['Recommend products based on customer requests', 'Share secure checkout links for instant purchases', 'Provide automated order tracking updates', 'Handle returns and exchange requests effortlessly'],
  },
];

const UseCaseSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box id="use-cases" sx={{ py: { xs: 10, md: 16 }, background: '#ffffff' }}>
      <Container maxWidth="lg">
        <FadeUp delay={0.1}>
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
            <Typography sx={{ color: '#4E5FFD', fontWeight: 600, fontSize: '0.85rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Use Cases
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, color: '#1A1A2E', lineHeight: 1.2, letterSpacing: '-0.02em', mb: 2 }}>
              Built for your industry
            </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: '1.05rem', maxWidth: 520, mx: 'auto', lineHeight: 1.7 }}>
              Discover how AI Employees can transform operations for your specific business type.
            </Typography>
          </Box>
        </FadeUp>

        {/* Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{ '& .MuiTabs-flexContainer': { gap: 1.5 } }}
          >
            {useCases.map((uc, i) => (
              <Tab
                key={i}
                icon={uc.icon}
                iconPosition="start"
                label={uc.category}
                disableRipple
                sx={{
                  borderRadius: 9999,
                  border: '1.5px solid',
                  borderColor: activeTab === i ? '#4E5FFD' : '#E5E7EB',
                  color: activeTab === i ? '#4E5FFD !important' : '#6B7280',
                  background: activeTab === i ? '#EEF0FF' : 'transparent',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  minHeight: 44,
                  px: 2.5,
                  transition: 'all 0.2s ease',
                  '&:hover': { borderColor: '#4E5FFD', background: '#F5F3FF' },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Content */}
        <FadeUp delay={0.2} fullWidth>
          <Box sx={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #F3F4F6', boxShadow: '0 8px 40px rgba(0,0,0,0.06)', background: '#ffffff' }}>
            <Grid container>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ height: { xs: 260, md: 480 }, position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={useCases[activeTab].image}
                    alt={useCases[activeTab].category}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.4s ease' }}
                  />
                  <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(255,255,255,0.3) 100%)' }} />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: { xs: 4, md: 6 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, color: '#4E5FFD' }}>
                    {useCases[activeTab].icon}
                    <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {useCases[activeTab].category}
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, color: '#1A1A2E', mb: 4, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                    {useCases[activeTab].title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {useCases[activeTab].benefits.map((b, i) => (
                      <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                        <CheckCircleOutlineIcon sx={{ color: '#4E5FFD', fontSize: '1.2rem', flexShrink: 0, mt: 0.1 }} />
                        <Typography sx={{ color: '#374151', fontSize: '0.925rem', lineHeight: 1.6 }}>{b}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </FadeUp>
      </Container>
    </Box>
  );
};

export default UseCaseSection;
