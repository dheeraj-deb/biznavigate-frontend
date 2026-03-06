import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import FadeUp from './FadeUp';

const problems = [
    {
        title: 'Missed enquiries',
        icon: <NotificationsOffOutlinedIcon fontSize="medium" />,
        description: 'Customers message you off-hours and leave when they don’t get a reply.',
    },
    {
        title: 'Slow replies',
        icon: <HourglassEmptyOutlinedIcon fontSize="medium" />,
        description: 'Delayed responses hurt your conversion rate and frustrate leads.',
    },
    {
        title: 'Manual handling',
        icon: <EditNoteOutlinedIcon fontSize="medium" />,
        description: 'Wasting hours copying orders and bookings into your system.',
    },
    {
        title: 'Broadcast Chaos',
        icon: <NotificationsOffOutlinedIcon fontSize="medium" />,
        description: 'Frustrating event attendees with messy community WhatsApp groups or manual broadcast lists.',
    }
];

const ProblemSection = () => {

    return (
        <Box sx={{
            py: { xs: 15, md: 24 },
            background: '#FFFFFF',
            color: '#0A0A0A',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid rgba(0,0,0,0.05)',
            overflow: 'hidden'
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={8} alignItems="center">

                    {/* Content Side */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FadeUp delay={0.2}>
                            <Box sx={{ mb: 6 }}>
                                <Typography variant="overline" sx={{ color: '#2563EB', fontWeight: 900, letterSpacing: '0.2em' }}>
                                    // THE PROBLEM
                                </Typography>
                                <Typography variant="h2" sx={{ my: 3, fontWeight: 900, fontSize: { xs: '2.5rem', md: '4rem' }, textTransform: 'uppercase', lineHeight: 1 }}>
                                    The manual way <br />
                                    <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(10,10,10,0.6)' }}>
                                        costing customers
                                    </Box>
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'rgba(10,10,10,0.65)', fontSize: '1.25rem' }}>
                                    Operating a business shouldn't mean being tied to your phone 24/7. Here is what happens without an AI employee handling the frontline.
                                </Typography>
                            </Box>
                        </FadeUp>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {problems.map((problem, index) => (
                                <FadeUp delay={0.3 + index * 0.1} key={index}>
                                    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                                        <Box sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '1px solid #2563EB',
                                            color: '#2563EB',
                                            flexShrink: 0
                                        }}>
                                            {problem.icon}
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontSize: '1.1rem', mb: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>
                                                {problem.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(10,10,10,0.65)', lineHeight: 1.6 }}>
                                                {problem.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </FadeUp>
                            ))}
                        </Box>
                    </Grid>

                    {/* Visual Side */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FadeUp delay={0.1}>
                            <Box sx={{ position: 'relative', width: '100%', pt: '100%', borderRadius: 0, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80"
                                    alt="Overwhelmed business owner managing multiple channels"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                {/* Overlay Gradient */}
                                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(255,255,255,0.6) 0%, transparent 80%)' }} />

                                {/* Floating Alert Card - Dark theme styled */}
                                <Paper
                                    elevation={0}
                                    sx={{
                                        position: 'absolute',
                                        bottom: 32,
                                        left: 32,
                                        right: 32,
                                        p: 3,
                                        background: '#FFFFFF',
                                        color: '#0A0A0A',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255, 68, 68, 0.4)',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}
                                >
                                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <NotificationsOffOutlinedIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={700} color="#0A0A0A" sx={{ letterSpacing: '0.05em' }}>8 UNREAD MESSAGES</Typography>
                                        <Typography variant="caption" sx={{ color: 'rgba(10,10,10,0.6)' }}>from Instagram & WhatsApp</Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        </FadeUp>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ProblemSection;
