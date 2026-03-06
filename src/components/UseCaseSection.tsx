import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Tab, Tabs } from '@mui/material';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FadeUp from './FadeUp';

const useCases = [
    {
        category: 'Resorts & Hotels',
        icon: <HotelOutlinedIcon />,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80',
        title: 'Automate Bookings & Guest Queries',
        benefits: [
            'Check room availability instantly via WhatsApp',
            'Process secure booking payments 24/7',
            'Answer FAQs about amenities and check-in times',
            'Provide an AI chatbot during the guest\'s stay for instant query resolution and higher satisfaction',
            'Send automated pre-arrival instructions'
        ]
    },
    {
        category: 'Trips & Activities',
        icon: <TerrainOutlinedIcon />,
        image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1000&q=80',
        title: 'Automate Activity Organization',
        benefits: [
            'Replace messy WhatsApp broadcast groups with an automated chatbot',
            'Automate camping slot availability and instant booking',
            'Collect attendee photos and reviews automatically post-trip',
            'Sync reviews directly to your website testimonials via widget'
        ]
    },
    {
        category: 'Ecommerce',
        icon: <StorefrontOutlinedIcon />,
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80',
        title: 'Sell Products directly in Chat',
        benefits: [
            'Recommend products based on customer requests',
            'Share secure checkout links for instant purchases',
            'Provide automated order tracking updates',
            'Handle returns and exchange requests effortlessly'
        ]
    }
];

const UseCaseSection = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{
            py: { xs: 15, md: 24 },
            background: '#FFFFFF',
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
                        <Typography variant="overline" sx={{ color: '#2563EB', fontWeight: 900, letterSpacing: '0.2em' }}>
                            {"// USE CASES"}
                        </Typography>
                        <Typography variant="h2" sx={{ my: 3, fontWeight: 900, fontSize: { xs: '3rem', md: '5rem' }, textTransform: 'uppercase' }}>
                            Built for your <br />
                            <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(10,10,10,0.6)' }}>
                                industry
                            </Box>
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(10,10,10,0.65)', fontSize: '1.25rem', maxWidth: '700px', mx: 'auto' }}>
                            Discover how AI Employees can transform operations for your specific business type.
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
                        {useCases.map((useCase, index) => (
                            <Tab
                                key={index}
                                icon={useCase.icon}
                                iconPosition="start"
                                label={useCase.category}
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
                            background: '#F8F9FA',
                            color: '#0A0A0A',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.03)'
                        }}
                    >
                        <Grid container>
                            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
                                <Box
                                    sx={{
                                        minHeight: { xs: 300, md: 500 },
                                        width: '100%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRight: { md: '1px solid rgba(0,0,0,0.08)' },
                                        borderBottom: { xs: '1px solid rgba(0,0,0,0.08)', md: 'none' }
                                    }}
                                >
                                    <img
                                        src={useCases[activeTab].image}
                                        alt={useCases[activeTab].category}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease-in-out' }}
                                    />
                                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `linear-gradient(to right, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.0) 100%)` }} />
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ p: { xs: 4, md: 8 } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, color: '#2563EB' }}>
                                        {useCases[activeTab].icon}
                                        <Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: '0.2em' }}>
                                            {useCases[activeTab].category}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h3" sx={{ mb: 6, fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1 }}>
                                        {useCases[activeTab].title}
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        {useCases[activeTab].benefits.map((benefit, idx) => (
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
                        </Grid>
                    </Paper>
                </FadeUp>

            </Container>
        </Box>
    );
};

export default UseCaseSection;
