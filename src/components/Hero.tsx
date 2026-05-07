import React, { useState } from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContactFormDialog from './ContactFormDialog';

const Hero = () => {
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);

  

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } }
  };

  return (
    <>
      <Box
        id="hero"
        sx={{
          background: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: '80px', md: '80px' },
          pb: { xs: 10, md: 4 },
        }}
      >
        {/* Soft background gradient blobs */}
        <Box sx={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '55vw', height: '65vh',
          background: 'radial-gradient(ellipse, rgba(78,95,253,0.08) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />
        <Box sx={{
          position: 'absolute', bottom: '5%', left: '-10%',
          width: '45vw', height: '50vh',
          background: 'radial-gradient(ellipse, rgba(255,107,107,0.06) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Box sx={{ maxWidth: 780, mx: 'auto', textAlign: 'center' }}>

              {/* Badges row */}
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  <Chip
                    label="✦ AI-powered business automation"
                    sx={{
                      background: '#EEF0FF',
                      color: '#4E5FFD',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      border: '1px solid rgba(78,95,253,0.2)',
                      borderRadius: 9999,
                      height: 36,
                      px: 1,
                    }}
                  />
                  {/* Meta Tech Provider badge */}
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1.25,
                      background: '#ffffff',
                      border: '1.5px solid #E5E7EB',
                      borderRadius: '12px',
                      px: 2,
                      py: 0.9,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/meta-lockup-primary.png"
                      alt="Meta"
                      sx={{
                        height: 22,
                        width: 'auto',
                        display: 'block',
                        flexShrink: 0,
                        maxWidth: 90,
                        objectFit: 'contain',
                      }}
                    />

                    <Box
                      sx={{
                        width: '1px',
                        height: 18,
                        background: '#E5E7EB',
                        flexShrink: 0,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        color: '#374151',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Official Tech Provider
                    </Typography>
                  </Box>
                  {/* WhatsApp Business badge */}
                  <Box sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 1.25,
                    background: '#ffffff',
                    border: '1.5px solid #E5E7EB',
                    borderRadius: '12px',
                    px: 2, py: 0.9,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}>
                    {/* WhatsApp Business icon */}
                    <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="24" cy="24" r="24" fill="#25D366" />
                      <path d="M24 10C16.3 10 10 16.3 10 24C10 26.6 10.7 29 11.9 31.1L10 38L17.1 36.1C19.1 37.2 21.5 37.9 24 37.9C31.7 37.9 38 31.6 38 23.9C38 16.3 31.7 10 24 10ZM31.3 29.7C31 30.5 29.6 31.2 28.9 31.3C28.2 31.4 27.4 31.4 26.5 31.1C25.9 30.9 25.2 30.6 24.3 30.2C20.8 28.6 18.5 25.1 18.3 24.8C18.1 24.6 16.8 22.9 16.8 21.1C16.8 19.3 17.7 18.5 18.1 18C18.4 17.6 18.8 17.5 19.1 17.5H19.8C20.1 17.5 20.5 17.4 20.9 18.3C21.3 19.3 22.2 21.1 22.3 21.3C22.4 21.5 22.5 21.7 22.3 22C22.2 22.3 22.1 22.5 21.9 22.7C21.7 22.9 21.4 23.2 21.2 23.4C21 23.6 20.8 23.8 21 24.1C21.2 24.4 22.2 26 23.6 27.3C25.4 28.9 26.9 29.4 27.2 29.6C27.5 29.8 27.7 29.7 27.9 29.5C28.1 29.3 29 28.3 29.3 28C29.6 27.7 29.8 27.7 30.1 27.8C30.4 27.9 32.2 28.8 32.5 29C32.8 29.2 33 29.3 33.1 29.4C33.2 29.7 33.2 30.2 32.9 30.9L31.3 29.7Z" fill="white" />
                    </svg>
                    <Typography sx={{ fontSize: '0.68rem', fontWeight: 600, color: '#25D366', whiteSpace: 'nowrap' }}>
                      WhatsApp Business
                    </Typography>
                  </Box>
                </Box>
              </motion.div>

              {/* Headline */}
              <motion.div variants={itemVariants}>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.75rem', sm: '3.75rem', md: '5rem' },
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: '#1A1A2E',
                    mb: 3,
                  }}
                >
                  Automate your customer workflows{' '}
                  <Box component="span" sx={{ color: '#4E5FFD', position: 'relative', display: 'inline-block' }}>
                    with AI power
                    <Box
                      component="span"
                      sx={{
                        position: 'absolute', bottom: -4, left: 0, right: 0, height: 3,
                        background: 'linear-gradient(90deg, #4E5FFD, #FF6B6B)',
                        borderRadius: 9999,
                        display: { xs: 'none', md: 'block' },
                      }}
                    />
                  </Box>
                  .
                </Typography>
              </motion.div>

              {/* Subheading */}
              <motion.div variants={itemVariants}>
                <Typography
                  sx={{
                    fontSize: { xs: '1.05rem', md: '1.2rem' },
                    color: '#6B7280',
                    lineHeight: 1.7,
                    maxWidth: 560,
                    mx: 'auto',
                    mb: 5,
                  }}
                >
                  Build visual conversation journeys, activate AI handlers to manage interactions instantly 24/7, and track node drop-offs with continuous AI analysis.
                </Typography>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 4 }}>
                  <Box
                    onClick={() => setDemoDialogOpen(true)}
                    sx={{
                      background: '#4E5FFD',
                      color: '#fff',
                      px: { xs: 3.5, md: 4 },
                      py: { xs: 1.75, md: 2 },
                      borderRadius: 9999,
                      fontWeight: 600,
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 20px rgba(78,95,253,0.3)',
                      '&:hover': {
                        background: '#3A4AE8',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 28px rgba(78,95,253,0.4)',
                      },
                    }}
                  >
                    Get started for free
                    <ArrowForwardIcon sx={{ fontSize: '1rem' }} />
                  </Box>
                  <Box
                    onClick={() => {
                      const el = document.getElementById('solutions');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    sx={{
                      background: '#ffffff',
                      color: '#1A1A2E',
                      px: { xs: 3.5, md: 4 },
                      py: { xs: 1.75, md: 2 },
                      borderRadius: 9999,
                      fontWeight: 600,
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      cursor: 'pointer',
                      border: '1.5px solid #E5E7EB',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {
                        borderColor: '#4E5FFD',
                        color: '#4E5FFD',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                      },
                    }}
                  >
                    See how it works
                  </Box>
                </Box>
              </motion.div>

              {/* Social proof */}
              <motion.div variants={itemVariants}>
                <Typography sx={{ color: '#9CA3AF', fontSize: '0.85rem', mb: 6 }}>
                  No credit card required · Setup in 5 minutes
                </Typography>
              </motion.div>

              {/* Stats row */}
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: { xs: 4, md: 8 },
                    flexWrap: 'wrap',
                    pt: 4,
                    borderTop: '1px solid #F3F4F6',
                  }}
                >
                  {[
                    { value: '24/7', label: 'AI availability' },
                    { value: '300%', label: 'Sales lift' },
                    { value: '85%', label: 'Cost reduction' },
                    { value: '98%', label: 'Resolution rate' },
                  ].map((stat) => (
                    <Box key={stat.value} sx={{ textAlign: 'center' }}>
                      <Typography sx={{ fontSize: { xs: '1.75rem', md: '2rem' }, fontWeight: 700, color: '#1A1A2E', lineHeight: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: '#9CA3AF', mt: 0.5, fontWeight: 500 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>

            </Box>
          </motion.div>
        </Container>
      </Box>

      <ContactFormDialog open={demoDialogOpen} onClose={() => setDemoDialogOpen(false)} formType="demo" />
    </>
  );
};

export default Hero;
