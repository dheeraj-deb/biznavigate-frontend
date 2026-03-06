import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Tab, Tabs } from '@mui/material';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import FadeUp from './FadeUp';

const suggestions = [
    {
        category: 'Resorts & Hotels',
        icon: <TrendingUpOutlinedIcon />,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
        title: 'Dynamic Pricing & Demand Analysis',
        benefits: [
            'Analyze weekend vs. weekday trends to optimize rates automatically',
            'Adjust pricing based on upcoming festival seasons and local weather forecasts',
            'Track local events and attractions to capture high-demand periods',
            'Monitor real-time occupancy rates through smart data scraping',
            'Generate automated dynamic pricing suggestions to maximize revenue and occupancy'
        ]
    },
    {
        category: 'Product Sellers',
        icon: <StorefrontOutlinedIcon />,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80',
        title: 'Smart Inventory & Sales Optimization',
        benefits: [
            'Identify dead stock and suggest targeted discount campaigns to clear it',
            'Plan smart promotional strategies to move slow-moving inventory quickly',
            'Track highest-selling products and provide optimal restocking timelines',
            'Forecast future demand to prevent costly out-of-stock situations',
            'Generate actionable AI advice to continuously increase product revenue'
        ]
    },
    {
        category: 'Trips & Activities',
        icon: <TerrainOutlinedIcon />,
        image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1000&q=80',
        title: 'Optimize Activity Bookings & Reviews',
        benefits: [
            'AI automatically analyzes incoming reviews to generate ready-to-publish website testimonials',
            'AI scans your database to automatically target and re-invite customers who attended similar past events',
            'Smart bot instantly calculates custom activity quotes and autonomously manages live slot inventory'
        ]
    }
];

const AISuggestionsSection = () => {
    const [activeTab, setActiveTab] = useState(0);""

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{
            py: { xs: 15, md: 24 },
            background: '#F8F9FA',
            color: '#0A0A0A',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid rgba(0,0,0,0.05)'
        }}>
            <Container maxWidth="lg" sx={{ width: '100%' }}>
                <FadeUp delay={0.1}>
                    <Box sx={{ textAlign: 'center', mb: { xs: 10, md: 16 } }}>
                        <Typography variant="overline" sx={{ color: '#2563EB', fontWeight: 900, letterSpacing: '0.2em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <AutoGraphOutlinedIcon fontSize="small" /> AI REVENUE SUGGESTIONS
                        </Typography>
                        <Typography variant="h2" sx={{ my: 3, fontWeight: 900, fontSize: { xs: '2.5rem', md: '4.5rem' }, textTransform: 'uppercase' }}>
                            Scale your revenue with <br />
                            <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(10,10,10,0.6)' }}>
                                smart insights
                            </Box>
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(10,10,10,0.65)', fontSize: '1.25rem', maxWidth: '700px', mx: 'auto' }}>
                            Our AI analyzes market data, demand, and inventory to give you actionable suggestions that directly increase your bottom line.
                        </Typography>
                    </Box>
                </FadeUp>

                {/* Tabs */}
                <Box sx={{ mb: 8 }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        centered={false}
                        TabIndicatorProps={{ style: { display: 'none' } }}
                        sx={{
                            '& .MuiTabs-flexContainer': { gap: 2, justifyContent: { xs: 'flex-start', md: 'center' }, px: { xs: 2, md: 0 } },
                            mb: 2
                        }}
                    >
                        {suggestions.map((suggestion, index) => (
                            <Tab
                                key={index}
                                icon={suggestion.icon}
                                iconPosition="start"
                                label={suggestion.category}
                                disableRipple
                                sx={{
                                    textTransform: 'uppercase',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    letterSpacing: '0.1em',
                                    minHeight: 48,
                                    borderRadius: '8px',
                                    border: '1px solid',
                                    borderColor: activeTab === index ? '#2563EB' : 'rgba(0,0,0,0.1)',
                                    bgcolor: activeTab === index ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                                    color: activeTab === index ? '#2563EB !important' : 'rgba(10,10,10,0.65)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#2563EB',
                                        color: '#0A0A0A',
                                    }
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>

                {/* Content Area */}
                <FadeUp delay={0.3} fullWidth>
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid rgba(0,0,0,0.08)',
                            background: '#FFFFFF',
                            color: '#0A0A0A',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
                        }}
                    >
                        <Grid container>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ p: { xs: 4, md: 8 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, color: '#2563EB' }}>
                                        {suggestions[activeTab].icon}
                                        <Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: '0.2em' }}>
                                            {suggestions[activeTab].category}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h3" sx={{ mb: 6, fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1 }}>
                                        {suggestions[activeTab].title}
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        {suggestions[activeTab].benefits.map((benefit, idx) => (
                                            <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                                <CheckCircleOutlineIcon sx={{ color: '#2563EB', mt: 0.5 }} />
                                                <Typography variant="body1" sx={{ color: 'rgba(10,10,10,0.7)', lineHeight: 1.6, fontWeight: 500 }}>
                                                    {benefit}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
                                <Box
                                    sx={{
                                        minHeight: { xs: 300, md: 550 },
                                        width: '100%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderLeft: { md: '1px solid rgba(0,0,0,0.08)' },
                                        borderTop: { xs: '1px solid rgba(0,0,0,0.08)', md: 'none' }
                                    }}
                                >
                                    <img
                                        src={suggestions[activeTab].image}
                                        alt={suggestions[activeTab].category}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease-in-out' }}
                                    />
                                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `linear-gradient(to left, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.0) 100%)` }} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </FadeUp>

            </Container>
        </Box>
    );
};

export default AISuggestionsSection;
