import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import FadeUp from './FadeUp';

const comparisons = [
    {
        old: 'Manual data entry and copy-pasting orders.',
        new: 'Complete end-to-end automation from chat to CRM.',
    },
    {
        old: 'Simple rigid chatbot menus and keyword replies.',
        new: 'Natural language understanding and human-like chats.',
    },
    {
        old: 'Using multiple tools for chat, booking, and payment.',
        new: 'One unified platform handling your entire workflow.',
    },
];

const DifferentiationSection = () => {
    return (
        <Box sx={{ py: { xs: 15, md: 24 }, background: '#FFFFFF', color: '#0A0A0A', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <Container maxWidth="lg">
                <FadeUp delay={0.1}>
                    <Box sx={{ textAlign: 'center', mb: { xs: 10, md: 16 }, maxWidth: '800px', mx: 'auto' }}>
                        <Typography variant="overline" sx={{ color: '#2563EB', fontWeight: 900, letterSpacing: '0.2em' }}>
                            // THE DIFFERENCE
                        </Typography>
                        <Typography variant="h2" sx={{ my: 3, fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 900, textTransform: 'uppercase' }}>
                            NOT JUST A CHATBOT. <br />
                            <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(10,10,10,0.6)', letterSpacing: '0.02em' }}>
                                A DIGITAL WORKFORCE.
                            </Box>
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(10,10,10,0.65)', fontSize: '1.25rem' }}>
                            We don't just send automated replies. Our AI agents understand context and execute business tasks.
                        </Typography>
                    </Box>
                </FadeUp>

                <Grid container spacing={4} justifyItems="center" justifyContent="center">
                    {comparisons.map((item, idx) => (
                        <Grid size={{ xs: 12, md: 10 }} key={idx}>
                            <FadeUp delay={0.2 + idx * 0.1}>
                                <Grid container spacing={0} sx={{ border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FFFFFF', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                                    {/* Old Way */}
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, height: '100%', background: '#F8F9FA', borderRadius: 0, borderRight: { sm: '1px solid rgba(0,0,0,0.05)' }, borderBottom: { xs: '1px solid rgba(0,0,0,0.05)', sm: 'none' }, color: '#0A0A0A' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                                                <Box sx={{ p: 1, border: '1px solid rgba(255, 68, 68, 0.4)', color: '#d32f2f' }}>
                                                    <CloseOutlinedIcon fontSize="small" />
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ color: '#d32f2f', fontWeight: 900, mb: 1, textTransform: 'uppercase', letterSpacing: '0.1em' }}>THE OLD WAY</Typography>
                                                    <Typography variant="body1" sx={{ color: 'rgba(10,10,10,0.5)' }}>{item.old}</Typography>
                                                </Box>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    {/* New Way */}
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, height: '100%', background: '#FFFFFF', color: '#0A0A0A', borderRadius: 0 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                                                <Box sx={{ p: 1, border: '1px solid #2563EB', color: '#2563EB' }}>
                                                    <CheckOutlinedIcon fontSize="small" />
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ color: '#2563EB', fontWeight: 900, mb: 1, textTransform: 'uppercase', letterSpacing: '0.1em' }}>WITH AI EMPLOYEE</Typography>
                                                    <Typography variant="body1" sx={{ color: '#0A0A0A', fontWeight: 500 }}>{item.new}</Typography>
                                                </Box>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </FadeUp>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default DifferentiationSection;
