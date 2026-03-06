import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import FadeUp from './FadeUp';

const features = [
    { title: 'Handles enquiries like a human', icon: <ChatBubbleOutlineIcon sx={{ color: '#2563EB' }} /> },
    { title: 'Collects booking payments', icon: <PaymentOutlinedIcon sx={{ color: '#2563EB' }} /> },
    { title: 'Auto-gathers reviews & photos', icon: <StarBorderOutlinedIcon sx={{ color: '#2563EB' }} /> },
    { title: 'Direct website widget integration', icon: <PsychologyOutlinedIcon sx={{ color: '#2563EB' }} /> },
    { title: 'Automates packages, dates & slots', icon: <EventAvailableOutlinedIcon sx={{ color: '#2563EB' }} /> },
    { title: 'Replaces messy broadcast lists', icon: <SendOutlinedIcon sx={{ color: '#2563EB' }} /> },
];

const SolutionSection = () => {
    return (
        <Box id="solutions" sx={{
            py: { xs: 15, md: 24 },
            background: '#F8F9FA',
            color: '#0A0A0A',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 2,
            borderTop: '1px solid rgba(0,0,0,0.05)'
        }}>
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <FadeUp delay={0.1}>
                    <Box sx={{ textAlign: 'center', mb: { xs: 12, md: 16 }, maxWidth: '800px', mx: 'auto' }}>
                        <Typography variant="overline" sx={{ color: '#2563EB', fontWeight: 900, letterSpacing: '0.2em' }}>
                            {"// THE SOLUTION"}
                        </Typography>
                        <Typography variant="h2" sx={{ my: 3, fontWeight: 900, fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 1 }}>
                            MEET YOUR <br />
                            <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(10,10,10,0.6)' }}>
                                AI EMPLOYEE
                            </Box>
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(10,10,10,0.65)', fontSize: '1.25rem' }}>
                            A digital workforce that works around the clock, perfectly executing everything your natural staff would do—only faster.
                        </Typography>
                    </Box>
                </FadeUp>

                <Grid container spacing={6} alignItems="center">
                    {/* Left Side Features */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <FadeUp delay={0.2}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {features.slice(0, 3).map((feature, idx) => (
                                    <Paper key={idx} elevation={0} sx={{ p: 3, borderRadius: '8px', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', color: '#0A0A0A', textAlign: { xs: 'center', md: 'right' }, transition: 'all 0.3s ease', boxShadow: '0 4px 14px rgba(0,0,0,0.02)', '&:hover': { background: '#F8F9FA', borderColor: '#2563EB', boxShadow: '0 10px 40px rgba(37,99,235,0.08)' } }}>
                                        <Box sx={{ mb: 2, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                                            <Box sx={{ width: 48, height: 48, borderRadius: 0, border: '1px solid #2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {feature.icon}
                                            </Box>
                                        </Box>
                                        <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase' }}>{feature.title}</Typography>
                                    </Paper>
                                ))}
                            </Box>
                        </FadeUp>
                    </Grid>

                    {/* Center Graphic - Dark Chat Mockup */}
                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ position: 'relative', width: '100%', maxWidth: 360, height: 650 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    width: '100%', height: '100%', borderRadius: '24px', border: '8px solid #000', // Phone border
                                    background: '#FFFFFF', overflow: 'hidden', position: 'relative',
                                    zIndex: 1, display: 'flex', flexDirection: 'column',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                                }}
                            >
                                {/* Simulated WhatsApp Header */}
                                <Box sx={{ p: 2, background: '#075E54', display: 'flex', alignItems: 'center', color: '#FFFFFF', gap: 2 }}>
                                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', background: '#128C7E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <PsychologyOutlinedIcon sx={{ color: '#FFF' }} />
                                    </Box>
                                    <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                                        <Typography variant="subtitle1" fontWeight={600} sx={{ lineHeight: 1.2 }}>AI Assistant</Typography>
                                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem' }}>online</Typography>
                                    </Box>
                                </Box>
                                {/* Simulated WhatsApp Interface */}
                                <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1, background: '#EFEAE2', position: 'relative', overflow: 'hidden' }}>
                                    <Box sx={{ alignSelf: 'flex-end', background: '#DCF8C6', color: '#000', p: 1, borderRadius: '8px', borderTopRightRadius: 0, boxShadow: '0 1px 1px rgba(0,0,0,0.1)', maxWidth: '85%' }}>
                                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Hi there!</Typography>
                                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', fontSize: '0.6rem', color: 'rgba(0,0,0,0.45)' }}>10:41 AM</Typography>
                                    </Box>
                                    <Box sx={{ alignSelf: 'flex-start', background: '#FFFFFF', color: '#000', p: 1, borderRadius: '8px', borderTopLeftRadius: 0, boxShadow: '0 1px 1px rgba(0,0,0,0.1)', maxWidth: '85%' }}>
                                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Hello! 👋 Welcome to our store. How can I assist you today?</Typography>
                                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', fontSize: '0.6rem', color: 'rgba(0,0,0,0.45)' }}>10:41 AM</Typography>
                                    </Box>
                                    <Box sx={{ alignSelf: 'flex-end', background: '#DCF8C6', color: '#000', p: 1, borderRadius: '8px', borderTopRightRadius: 0, boxShadow: '0 1px 1px rgba(0,0,0,0.1)', maxWidth: '85%' }}>
                                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Do you have any running shoes on sale?</Typography>
                                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', fontSize: '0.6rem', color: 'rgba(0,0,0,0.45)' }}>10:42 AM</Typography>
                                    </Box>
                                    <Box sx={{ alignSelf: 'flex-start', background: '#FFFFFF', color: '#000', p: 1, pb: 0.5, borderRadius: '8px', borderTopLeftRadius: 0, boxShadow: '0 1px 1px rgba(0,0,0,0.1)', maxWidth: '85%', width: '100%' }}>
                                        <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 1 }}>Yes! Our highest-rated running shoes are currently 20% off. Here is the catalog item:</Typography>

                                        {/* Rich Media Product Card Mockup within Chat */}
                                        <Box sx={{ background: '#F8F9FA', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E0E0E0', mb: 0.5 }}>
                                            <Box
                                                component="img"
                                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"
                                                alt="Running Shoe"
                                                sx={{ width: '100%', height: '100px', objectFit: 'cover' }}
                                            />
                                            <Box sx={{ p: 1 }}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.8rem' }}>AeroSprint Pro Runners</Typography>
                                                <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.25, fontSize: '0.65rem' }}>Lightweight, Breathable</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#2563EB', fontSize: '0.8rem' }}>$120.00 <Box component="span" sx={{ color: '#999', textDecoration: 'line-through', fontSize: '0.65rem', fontWeight: 400 }}>$150.00</Box></Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', borderTop: '1px solid #E0E0E0' }}>
                                                <Box sx={{ flex: 1, textAlign: 'center', py: 0.75, color: '#2563EB', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', borderRight: '1px solid #E0E0E0' }}>
                                                    View Details
                                                </Box>
                                                <Box sx={{ flex: 1, textAlign: 'center', py: 0.75, color: '#FFFFFF', background: '#2563EB', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer' }}>
                                                    Buy Now
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', fontSize: '0.6rem', color: 'rgba(0,0,0,0.45)' }}>10:42 AM</Typography>
                                    </Box>

                                    {/* Absolute positioning typing indicator (Whatsapp style) */}
                                    <Box sx={{ alignSelf: 'flex-start', display: 'flex', gap: 0.5, p: 1, px: 2, background: '#FFFFFF', borderTopLeftRadius: 0, borderRadius: '16px', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#128C7E', animation: 'bounce 1.4s infinite ease-in-out both' }} />
                                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#128C7E', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.2s' }} />
                                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#128C7E', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.4s' }} />
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>

                    {/* Right Side Features */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <FadeUp delay={0.4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {features.slice(3).map((feature, idx) => (
                                    <Paper key={idx} elevation={0} sx={{ p: 3, borderRadius: '8px', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', color: '#0A0A0A', textAlign: { xs: 'center', md: 'left' }, transition: 'all 0.3s ease', boxShadow: '0 4px 14px rgba(0,0,0,0.02)', '&:hover': { background: '#F8F9FA', borderColor: '#2563EB', boxShadow: '0 10px 40px rgba(37,99,235,0.08)' } }}>
                                        <Box sx={{ mb: 2, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                            <Box sx={{ width: 48, height: 48, borderRadius: 0, border: '1px solid #2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {feature.icon}
                                            </Box>
                                        </Box>
                                        <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase' }}>{feature.title}</Typography>
                                    </Paper>
                                ))}
                            </Box>
                        </FadeUp>
                    </Grid>
                </Grid>
            </Container>
            <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
        </Box>
    );
};

export default SolutionSection;
