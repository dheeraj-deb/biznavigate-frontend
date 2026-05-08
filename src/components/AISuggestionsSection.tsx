import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Tab, Tabs } from '@mui/material';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import FadeUp from './FadeUp';

const suggestions = [
  {
    category: 'Resorts & Hotels', icon: <TrendingUpOutlinedIcon />,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    title: 'Dynamic Pricing & Demand Analysis',
    benefits: [
      'Analyze weekend vs. weekday trends to optimize rates automatically',
      'Adjust pricing based on upcoming festival seasons and local weather forecasts',
      'Track local events and attractions to capture high-demand periods',
      'Monitor real-time occupancy rates through smart data scraping',
      'Generate automated dynamic pricing suggestions to maximize revenue',
    ],
  },
  {
    category: 'Product Sellers', icon: <StorefrontOutlinedIcon />,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80',
    title: 'Smart Inventory & Sales Optimization',
    benefits: [
      'Identify dead stock and suggest targeted discount campaigns to clear it',
      'Plan smart promotional strategies to move slow-moving inventory quickly',
      'Track highest-selling products and provide optimal restocking timelines',
      'Forecast future demand to prevent costly out-of-stock situations',
      'Generate actionable AI advice to continuously increase product revenue',
    ],
  },
  {
    category: 'Trips & Activities', icon: <TerrainOutlinedIcon />,
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1000&q=80',
    title: 'Optimize Activity Bookings & Reviews',
    benefits: [
      'AI automatically analyzes incoming reviews to generate ready-to-publish website testimonials',
      'AI scans your database to automatically target and re-invite past customers',
      'Smart bot instantly calculates custom activity quotes and manages live slot inventory',
    ],
  },
];

const AISuggestionsSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box id="ai-insights" sx={{ py: { xs: 10, md: 16 }, background: '#F8F7FF' }}>
      <Container maxWidth="lg">
        <FadeUp delay={0.1}>
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, background: '#EEF0FF', color: '#4E5FFD', px: 2.5, py: 1, borderRadius: 9999, mb: 3, border: '1px solid rgba(78,95,253,0.2)' }}>
              <AutoGraphOutlinedIcon sx={{ fontSize: '1rem' }} />
              <Typography sx={{ fontWeight: 600, fontSize: '0.8rem' }}>AI Revenue Suggestions</Typography>
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, color: '#1A1A2E', lineHeight: 1.2, letterSpacing: '-0.02em', mb: 2 }}>
              Scale your revenue with smart insights
            </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: '1.05rem', maxWidth: 560, mx: 'auto', lineHeight: 1.7 }}>
              Our AI analyzes market data, demand, and inventory to give you actionable suggestions that directly increase your bottom line.
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
            {suggestions.map((s, i) => (
              <Tab
                key={i}
                icon={s.icon}
                iconPosition="start"
                label={s.category}
                disableRipple
                sx={{
                  borderRadius: 9999,
                  border: '1.5px solid',
                  borderColor: activeTab === i ? '#4E5FFD' : '#E5E7EB',
                  color: activeTab === i ? '#4E5FFD !important' : '#6B7280',
                  background: activeTab === i ? '#EEF0FF' : '#ffffff',
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
                <Box sx={{ p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, color: '#4E5FFD' }}>
                    {suggestions[activeTab].icon}
                    <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {suggestions[activeTab].category}
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, color: '#1A1A2E', mb: 4, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                    {suggestions[activeTab].title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {suggestions[activeTab].benefits.map((b, i) => (
                      <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                        <CheckCircleOutlineIcon sx={{ color: '#4E5FFD', fontSize: '1.2rem', flexShrink: 0, mt: 0.1 }} />
                        <Typography sx={{ color: '#374151', fontSize: '0.925rem', lineHeight: 1.6 }}>{b}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ height: { xs: 280, md: '100%' }, minHeight: { md: 480 }, position: 'relative', overflow: 'hidden', borderLeft: { md: '1px solid #F3F4F6' } }}>
                  <img
                    src={suggestions[activeTab].image}
                    alt={suggestions[activeTab].category}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.4s ease' }}
                  />
                  <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent 60%, rgba(255,255,255,0.2) 100%)' }} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </FadeUp>
      </Container>
    </Box>
  );
};

export default AISuggestionsSection;
