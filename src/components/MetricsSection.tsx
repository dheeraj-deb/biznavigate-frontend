import React, { useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { motion, useInView } from 'framer-motion';

const metricsData = [
    { value: '98%', label: 'Resolution Rate' },
    { value: '300%', label: 'Sales Lift' },
    { value: '85%', label: 'Cost Reduction' },
    { value: '24/7', label: 'Uptime' }
];

const MetricsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-15%" });

    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, scale: 0.9, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] } }
    };

    return (
        <Box
            id="metrics"
            sx={{
                py: { xs: 15, md: 30 },
                background: '#FAFAFA',
                color: '#0A0A0A',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="lg" ref={ref}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <Box sx={{ textAlign: 'center', mb: { xs: 10, md: 15 } }}>
                        <Typography
                            variant="overline"
                            sx={{ color: '#2563EB', fontWeight: 900, letterSpacing: '0.2em', mb: 2, display: 'block' }}
                        >
                            {"// PROVEN IMPACT"}
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 900,
                                fontSize: { xs: '3rem', md: '5rem' },
                                textTransform: 'uppercase',
                                lineHeight: 1
                            }}
                        >
                            Delivering <br />
                            <Box component="span" sx={{ fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
                                Real Results
                            </Box>
                        </Typography>
                    </Box>

                    <Grid container spacing={0} sx={{ borderTop: '1px solid rgba(0,0,0,0.1)', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
                        {metricsData.map((metric, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i} sx={{ borderRight: '1px solid rgba(0,0,0,0.1)', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                                <motion.div variants={itemVariants}>
                                    <Box
                                        sx={{
                                            p: 6,
                                            textAlign: 'center',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            minHeight: 300,
                                            transition: 'background 0.4s',
                                            '&:hover': {
                                                background: '#2563EB',
                                                color: '#FFFFFF'
                                            }
                                        }}
                                    >
                                        <Typography variant="h2" sx={{ fontWeight: 900, mb: 1, fontSize: '4rem' }}>
                                            {metric.value}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {metric.label}
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
