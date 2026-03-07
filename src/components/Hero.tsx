import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ContactFormDialog from './ContactFormDialog';

const Hero = () => {
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Framer motion variants for clean typographic reveal
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }
    }
  };

  return (
    <>
      <Box
        id="hero"
        sx={{
          background: 'radial-gradient(ellipse at top, #FFFFFF 0%, #F4F6F8 100%)',
          position: 'relative',
          overflow: 'hidden',
          color: '#0A0A0A',
          minHeight: '100vh',
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'center' },
          pt: { xs: '12vh', md: 0 },
          pb: { xs: 16, md: 0 },
        }}
      >
        {/* Subtle Ambient Vignette glow at bottom */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '-20%',
            left: '20%',
            width: '60vw',
            height: '40vh',
            background: 'radial-gradient(ellipse at bottom, rgba(37, 99, 235, 0.25) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        {/* Subtle Grid overlay for that SaaS tech vibe */}
        <Box
          sx={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Dynamic Parallax Container */}
        <motion.div
          style={{ width: '100%', y: yParallax, opacity: opacityParallax, zIndex: 1, position: 'relative' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Container maxWidth="xl" sx={{ position: 'relative' }}>

            {/* Minimalist Micro-Label */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="overline"
                sx={{
                  fontFamily: 'Montserrat',
                  letterSpacing: '0.2em',
                  color: '#2563EB',
                  display: 'block',
                  mb: 4,
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                {"// AI AUTOMATION AGENCY"}
              </Typography>
            </motion.div>

            {/* Massive Typographic Headline following Oroya Pattern */}
            <Typography
              component="h1"
              sx={{
                fontFamily: 'Montserrat',
                fontSize: { xs: '3rem', sm: '4.5rem', md: '7vw' },
                lineHeight: 1.05,
                textTransform: 'uppercase',
                mb: 6,
                letterSpacing: '-0.02em',
              }}
            >
              <motion.div variants={itemVariants}>
                <Box component="span" sx={{ fontWeight: 900 }}>Automate your</Box>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Box component="span" sx={{ fontWeight: 300, fontStyle: 'italic', letterSpacing: '0.02em', color: 'rgba(10, 10, 10, 0.6)' }}>
                  customer workflows
                </Box>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Box component="span" sx={{ fontWeight: 900 }}>with AI power.</Box>
              </motion.div>
            </Typography>

            <motion.div variants={itemVariants}>
              <Typography
                sx={{
                  fontFamily: 'Montserrat',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  maxWidth: '500px',
                  fontWeight: 500,
                  color: 'rgba(10, 10, 10, 0.65)',
                  lineHeight: 1.6,
                }}
              >
                Build visual conversation journeys, activate AI handlers to manage interactions instantly 24/7, and track node drop-offs with continuous AI analysis.
              </Typography>
            </motion.div>

            {/* Ultra-Premium Modern SaaS CTA Array */}
            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 3 }, alignItems: 'center', mt: { xs: 5, md: 6 }, position: 'relative', zIndex: 10 }}>
                {/* Primary Pill */}
                <Box
                  onClick={() => setDemoDialogOpen(true)}
                  sx={{
                    background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                    color: '#FFF',
                    px: { xs: 4, sm: 4, md: 5 },
                    py: { xs: 2, sm: 2.5 },
                    borderRadius: '50px',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3), inset 0 2px 0 rgba(255,255,255,0.2)',
                    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1.5,
                    boxSizing: 'border-box',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 40px rgba(37, 99, 235, 0.4), inset 0 2px 0 rgba(255,255,255,0.3)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    }
                  }}
                >
                  START NOW
                  <ArrowDownwardIcon sx={{ fontSize: '1.2rem', transform: 'rotate(-90deg)', transition: 'transform 0.3s ease', '.MuiBox-root:hover &': { transform: 'rotate(-90deg) translateX(4px)' } }} />
                </Box>
                {/* Secondary Ghost Pill */}
                <Box
                  onClick={() => {
                    const el = document.getElementById('solutions');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  sx={{
                    background: '#FFFFFF',
                    color: '#0A0A0A',
                    px: { xs: 4, sm: 4, md: 5 },
                    py: { xs: 2, sm: 2.5 },
                    borderRadius: '50px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    cursor: 'pointer',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    boxSizing: 'border-box',
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
                  DISCOVER MORE
                </Box>
              </Box>
            </motion.div>

          </Container>
        </motion.div>
      </Box>

      <ContactFormDialog open={demoDialogOpen} onClose={() => setDemoDialogOpen(false)} formType="demo" />
    </>
  );
};

export default Hero;
