import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContactFormDialog from './ContactFormDialog';

const FinalCTASection = () => {
    const [demoDialogOpen, setDemoDialogOpen] = useState(false);

    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0.8, 1], [-50, 50]);

    return (
        <Box
            sx={{
                py: { xs: 15, md: 30 },
                background: 'radial-gradient(circle at center, #FFFFFF 0%, #F4F6F8 100%)',
                color: '#0A0A0A',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Subtle Vignette Top */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-20%',
                    right: '10%',
                    width: '60vw',
                    height: '40vh',
                    background: 'radial-gradient(ellipse at top, rgba(37, 99, 235, 0.15) 0%, rgba(0,0,0,0) 70%)',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div style={{ y: yParallax }}>
                    <Typography
                        variant="overline"
                        sx={{ color: '#2563EB', fontWeight: 900, letterSpacing: '0.2em', mb: 4, display: 'block' }}
                    >
                        // READY TO SCALE?
                    </Typography>

                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '3.5rem', md: '7rem' },
                            fontWeight: 900,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            mb: 10
                        }}
                    >
                        Let's Talk <br />
                        <Box component="span" sx={{ fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.02em', color: 'rgba(10,10,10,0.6)' }}>
                            Business.
                        </Box>
                    </Typography>

                    {/* Ultra-Premium Modern SaaS CTA Array (Centered) */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 3 }, alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'center', mt: 6, position: 'relative', zIndex: 10, width: { xs: '100%', md: 'auto' } }}>
                        {/* Primary Pill */}
                        <Box
                            onClick={() => setDemoDialogOpen(true)}
                            sx={{
                                background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                                color: '#FFF',
                                px: { xs: 0, sm: 4, md: 6 },
                                py: { xs: 2, sm: 2.5 },
                                borderRadius: '50px',
                                fontWeight: 800,
                                letterSpacing: '0.05em',
                                fontSize: { xs: '0.95rem', md: '1rem' },
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3), inset 0 2px 0 rgba(255,255,255,0.2)',
                                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 1.5,
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 20px 40px rgba(37, 99, 235, 0.4), inset 0 2px 0 rgba(255,255,255,0.3)',
                                },
                                '&:active': {
                                    transform: 'translateY(0)',
                                }
                            }}
                        >
                            REQUEST A DEMO
                            <ArrowForwardIcon sx={{ fontSize: '1.2rem', transition: 'transform 0.3s ease', '.MuiBox-root:hover &': { transform: 'translateX(4px)' } }} />
                        </Box>

                        {/* Secondary Ghost Pill */}
                        <Box
                            onClick={() => setDemoDialogOpen(true)}
                            sx={{
                                background: '#FFFFFF',
                                color: '#0A0A0A',
                                px: { xs: 0, sm: 4, md: 5 },
                                py: { xs: 2, sm: 2.5 },
                                borderRadius: '50px',
                                fontWeight: 700,
                                letterSpacing: '0.05em',
                                fontSize: { xs: '0.95rem', md: '1rem' },
                                cursor: 'pointer',
                                border: '1px solid rgba(0,0,0,0.08)',
                                boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                justifyContent: 'center',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    background: '#F8F9FA',
                                    borderColor: '#2563EB',
                                    color: '#2563EB',
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 10px 30px rgba(37, 99, 235, 0.1)'
                                }
                            }}
                        >
                            CONTACT SALES
                        </Box>
                    </Box>
                </motion.div>
            </Container>

            <ContactFormDialog open={demoDialogOpen} onClose={() => setDemoDialogOpen(false)} formType="demo" />
        </Box>
    );
};

export default FinalCTASection;
