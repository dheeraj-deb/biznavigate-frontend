import React, { useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { motion, useInView } from 'framer-motion';

const metricsData = [
  { value: '98%', label: 'Resolution Rate', desc: 'AI handles customer queries without human intervention' },
  { value: '300%', label: 'Sales Lift', desc: 'Average revenue increase our clients experience' },
  { value: '85%', label: 'Cost Reduction', desc: 'Lower operational costs compared to manual processes' },
  { value: '24/7', label: 'Uptime', desc: 'Round-the-clock AI availability, every single day' },
];

const MetricsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } }
  };

  return (
    <Box
      id="metrics"
      sx={{
        py: { xs: 10, md: 16 },
        background: '#0F0C2E',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box sx={{
        position: 'absolute', top: '-30%', right: '-10%', width: '50vw', height: '80vh',
        background: 'radial-gradient(ellipse, rgba(78,95,253,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" ref={ref}>
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
            <Typography sx={{ color: '#4E5FFD', fontWeight: 600, fontSize: '0.85rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Proven Impact
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', mb: 2 }}>
              Delivering real results
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', maxWidth: 480, mx: 'auto' }}>
              Businesses that switch to BizNavigo see measurable impact within the first month.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {metricsData.map((metric, i) => (
              <Grid size={{ xs: 6, md: 3 }} key={i}>
                <motion.div variants={itemVariants}>
                  <Box
                    sx={{
                      p: 4, borderRadius: '20px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      textAlign: 'center',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        background: 'rgba(78,95,253,0.15)',
                        borderColor: 'rgba(78,95,253,0.4)',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, color: '#4E5FFD', lineHeight: 1, mb: 1 }}>
                      {metric.value}
                    </Typography>
                    <Typography sx={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem', mb: 1 }}>
                      {metric.label}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                      {metric.desc}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default MetricsSection;
