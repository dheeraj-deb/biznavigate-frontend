import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContactFormDialog from './ContactFormDialog';

const FinalCTASection = () => {
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);

  return (
    <Box
      sx={{
        py: { xs: 12, md: 20 },
        background: 'linear-gradient(135deg, #4E5FFD 0%, #7B3FE4 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <Box sx={{ position: 'absolute', top: '-20%', right: '-5%', width: '40vw', height: '60vh', background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '50vw', height: '60vh', background: 'radial-gradient(ellipse, rgba(255,107,107,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '0.85rem', mb: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Ready to scale?
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              mb: 3,
            }}
          >
            Let's talk business.
          </Typography>

          <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: { xs: '1rem', md: '1.15rem' }, mb: 6, maxWidth: 480, mx: 'auto', lineHeight: 1.7 }}>
            Join businesses that are already automating their customer workflows with AI. Start your free trial today.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Box
              onClick={() => setDemoDialogOpen(true)}
              sx={{
                background: '#ffffff',
                color: '#4E5FFD',
                px: { xs: 4, md: 5 },
                py: { xs: 1.75, md: 2 },
                borderRadius: 9999,
                fontWeight: 700,
                fontSize: { xs: '0.95rem', md: '1rem' },
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' },
              }}
            >
              Request a demo
              <ArrowForwardIcon sx={{ fontSize: '1rem' }} />
            </Box>
            <Box
              onClick={() => setDemoDialogOpen(true)}
              sx={{
                background: 'rgba(255,255,255,0.12)',
                color: '#ffffff',
                px: { xs: 4, md: 5 },
                py: { xs: 1.75, md: 2 },
                borderRadius: 9999,
                fontWeight: 600,
                fontSize: { xs: '0.95rem', md: '1rem' },
                cursor: 'pointer',
                border: '1.5px solid rgba(255,255,255,0.3)',
                transition: 'all 0.2s ease',
                '&:hover': { background: 'rgba(255,255,255,0.2)', transform: 'translateY(-2px)' },
              }}
            >
              Contact sales
            </Box>
          </Box>

          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', mt: 4 }}>
            No credit card required · Setup in 5 minutes
          </Typography>
        </motion.div>
      </Container>

      <ContactFormDialog open={demoDialogOpen} onClose={() => setDemoDialogOpen(false)} formType="demo" />
    </Box>
  );
};

export default FinalCTASection;
