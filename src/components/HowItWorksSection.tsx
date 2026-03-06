import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LinkIcon from '@mui/icons-material/Link';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FadeUp from './FadeUp';

const steps = [
    {
        num: '01',
        title: 'Connect Channels',
        description: 'Link your WhatsApp, Instagram, or website to our platform in one click.',
        color: '#2563EB',
        icon: <LinkIcon sx={{ fontSize: 40, color: '#2563EB' }} />
    },
    {
        num: '02',
        title: 'Build Your Flow',
        description: 'Use the visual builder to create your conversation journey — greeting → menu → catalog → checkout.',
        color: '#2563EB',
        icon: <AccountTreeIcon sx={{ fontSize: 40, color: '#2563EB' }} />
    },
    {
        num: '03',
        title: 'Go Live',
        description: 'Activate your workflow. Every customer message is handled automatically, 24/7.',
        color: '#2563EB',
        icon: <PlayCircleOutlineIcon sx={{ fontSize: 40, color: '#2563EB' }} />
    },
    {
        num: '04',
        title: 'Track & Optimize',
        description: 'See which nodes customers drop off at and improve your flow with AI analysis.',
        color: '#2563EB',
        icon: <ShowChartIcon sx={{ fontSize: 40, color: '#2563EB' }} />
    }
];

const HowItWorksSection = () => {
    return (
        <Box sx={{ py: { xs: 15, md: 24 }, background: '#FFFFFF', color: '#0A0A0A', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <Container maxWidth="lg">
                <FadeUp delay={0.1}>
                    <Box sx={{ textAlign: 'center', mb: { xs: 12, md: 16 } }}>
                        <Typography variant="overline" sx={{ color: '#2563EB', fontWeight: 900, letterSpacing: '0.2em' }}>
                            {"// THE PROCESS"}
                        </Typography>
                        <Typography variant="h2" sx={{ my: 3, fontSize: { xs: '3rem', md: '5rem' }, fontWeight: 900, textTransform: 'uppercase' }}>
                            HOW IT <Box component="span" sx={{ fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.02em', color: 'rgba(10,10,10,0.6)' }}>WORKS</Box>
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(10,10,10,0.65)', fontSize: '1.25rem' }}>
                            Get your AI employee working in three simple steps.
                        </Typography>
                    </Box>
                </FadeUp>

                <Grid container spacing={4} alignItems="stretch">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <Grid size={{ xs: 12, md: 3 }} sx={{ position: 'relative' }}>
                                <FadeUp delay={0.2 + index * 0.1} fullWidth>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 4,
                                            height: '100%',
                                            borderRadius: '16px',
                                            background: '#FFFFFF',
                                            color: '#0A0A0A',
                                            border: '1px solid rgba(0,0,0,0.08)',
                                            boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            '&:hover': {
                                                borderColor: step.color,
                                                background: '#F8F9FA',
                                                boxShadow: '0 10px 40px rgba(37,99,235,0.08)'
                                            }
                                        }}
                                    >
                                        <Box sx={{ width: 80, height: 80, borderRadius: '16px', background: 'rgba(37,99,235,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, position: 'relative', border: '1px solid rgba(37,99,235,0.2)', transition: 'all 0.3s ease', '.MuiPaper-root:hover &': { transform: 'scale(1.1) translateY(-5px)', background: '#2563EB', '& > svg': { color: '#FFF' }, boxShadow: '0 10px 30px rgba(37,99,235,0.3)' } }}>
                                            {step.icon}
                                        </Box>

                                        <Typography
                                            variant="h1"
                                            sx={{
                                                position: 'absolute',
                                                top: { xs: -5, md: -10 },
                                                right: { xs: 5, md: 10 },
                                                fontSize: { xs: '5rem', md: '8rem' },
                                                fontWeight: 900,
                                                color: 'transparent',
                                                WebkitTextStroke: `1px rgba(0,0,0,0.05)`,
                                                zIndex: 0,
                                                userSelect: 'none'
                                            }}
                                        >
                                            {step.num}
                                        </Typography>

                                        <Box sx={{ position: 'relative', zIndex: 1, flex: 1 }}>
                                            <Typography variant="h4" sx={{ mb: 2, fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase' }}>
                                                {step.title}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'rgba(10,10,10,0.65)' }}>
                                                {step.description}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </FadeUp>

                                {/* Arrow for desktop */}
                                {index < steps.length - 1 && (
                                    <Box
                                        sx={{
                                            display: { xs: 'none', md: 'flex' },
                                            position: 'absolute',
                                            top: '50%',
                                            right: -24,
                                            transform: 'translateY(-50%)',
                                            zIndex: 2,
                                            width: 48,
                                            height: 48,
                                            borderRadius: '50%',
                                            background: '#2563EB',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ArrowForwardIosIcon sx={{ fontSize: 16, color: '#000000', ml: 0.5 }} />
                                    </Box>
                                )}
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default HowItWorksSection;
