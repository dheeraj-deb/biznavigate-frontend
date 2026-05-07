import React from 'react';
import { Box, Container, Typography, Grid, Avatar, Paper } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

const Sidebar = () => (
    <Box sx={{ width: { xs: '100%', md: '90px' }, height: { xs: 'auto', md: '100%' }, background: '#1A1A2E', color: '#fff', display: 'flex', flexDirection: { xs: 'row', md: 'column' }, alignItems: 'center', justifyContent: { xs: 'space-between', md: 'flex-start' }, py: { xs: 1.5, md: 3 }, px: { xs: 2, md: 0 }, gap: { xs: 2, md: 4 }, flexShrink: 0, overflowX: { xs: 'auto', md: 'visible' } }}>
        <Box component="img" src="/logo.png" alt="BizNavigo App" sx={{ minWidth: 40, width: 40, height: 'auto', borderRadius: '8px' }} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, gap: 3, opacity: 0.8, width: { xs: 'auto', md: '100%' }, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: '#4E5FFD' }}>
                <Box sx={{ width: 22, height: 22, background: 'currentColor', borderRadius: '6px' }} />
                <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 700 }}>Overview</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: '#fff', opacity: 0.7, '&:hover': { color: '#4E5FFD', opacity: 1 } }}>
                <Box sx={{ width: 22, height: 22, border: '2px solid currentColor', borderRadius: '6px' }} />
                <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>Leads</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: '#fff', opacity: 0.7, '&:hover': { color: '#4E5FFD', opacity: 1 } }}>
                <Box sx={{ width: 22, height: 22, border: '2px solid currentColor', borderRadius: '6px' }} />
                <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>Orders</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: '#fff', opacity: 0.7, '&:hover': { color: '#4E5FFD', opacity: 1 } }}>
                <Box sx={{ width: 22, height: 22, border: '2px dashed currentColor', borderRadius: '6px' }} />
                <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>Inventory</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: '#fff', opacity: 0.7, '&:hover': { color: '#4E5FFD', opacity: 1 } }}>
                <Box sx={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: 22 }}>
                    <Box sx={{ width: 6, height: 12, background: 'currentColor' }} />
                    <Box sx={{ width: 6, height: 22, background: 'currentColor' }} />
                    <Box sx={{ width: 6, height: 16, background: 'currentColor' }} />
                </Box>
                <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>Analytics</Typography>
            </Box>
        </Box>
        <Box sx={{ mt: { xs: 0, md: 'auto' }, flexShrink: 0 }}>
            <Avatar src="https://i.pravatar.cc/150?img=11" sx={{ width: 40, height: 40 }} />
        </Box>
    </Box>
);

const ResortInventoryTracker = () => (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid #F3F4F6', borderRadius: '16px', background: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1A1A2E' }}>Live Activity Logs</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1.5, py: 0.5, borderRadius: '9999px', background: '#EEF0FF', border: '1px solid rgba(78,95,253,0.2)' }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#4E5FFD', animation: 'pulse 2s infinite' }} />
                <Typography variant="caption" sx={{ color: '#4E5FFD', fontWeight: 700, fontSize: '0.65rem' }}>Tracking live</Typography>
            </Box>
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2.5, overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', mt: 0.8, flexShrink: 0 }} />
                <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1A1A2E', display: 'block' }}>Payment Received: ₹18,500</Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280' }}>Order #4409 - Silk Evening Gown via UPI</Typography>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', display: 'block', mt: 0.5, fontSize: '0.65rem' }}>Just now</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#4E5FFD', mt: 0.8, flexShrink: 0 }} />
                <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1A1A2E', display: 'block' }}>New Enquiry: Resort Booking</Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280' }}>Sarah J. asked about Ocean-View Villa availability</Typography>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', display: 'block', mt: 0.5, fontSize: '0.65rem' }}>2 mins ago</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B', mt: 0.8, flexShrink: 0 }} />
                <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1A1A2E', display: 'block' }}>Order Placed</Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280' }}>Michael T. ordered Diamond Solitaire Ring</Typography>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', display: 'block', mt: 0.5, fontSize: '0.65rem' }}>5 mins ago</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#7B3FE4', mt: 0.8, flexShrink: 0 }} />
                <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1A1A2E', display: 'block' }}>New Chat Lead Captured</Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280' }}>User: +91 98765-XXXXX joined via Instagram intent</Typography>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', display: 'block', mt: 0.5, fontSize: '0.65rem' }}>12 mins ago</Typography>
                </Box>
            </Box>
        </Box>
    </Paper>
);

const CampaignGenerator = () => (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid #F3F4F6', borderRadius: '16px', background: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2, color: '#1A1A2E' }}>Campaign Flow Builder</Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, flexGrow: 1, overflow: { xs: 'visible', md: 'hidden' } }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Select Template</Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
                    <Box sx={{ p: 1, border: '2px solid #4E5FFD', borderRadius: '10px', flex: 1, textAlign: 'center', background: '#EEF0FF' }}>
                        <Typography variant="caption" sx={{ color: '#4E5FFD', fontWeight: 600 }}>Oct 24th Workshop</Typography>
                    </Box>
                    <Box sx={{ p: 1, border: '1px solid #F3F4F6', borderRadius: '10px', flex: 1, textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#6B7280' }}>Post-Event Review</Typography>
                    </Box>
                </Box>

                <Typography variant="caption" sx={{ fontWeight: 700, color: '#6B7280', mt: 1, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Message UI Editor</Typography>
                <Box sx={{ flexGrow: 1, border: '1px solid #F3F4F6', borderRadius: '12px', p: 2, background: '#F8F7FF' }}>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#374151' }}>
                        Hi {"{{name}}"} 👋<br /><br />
                        Ready to unleash your creativity? 🎨 Book your slot for the Oct 24th Clay Art Workshop! Only 12 slots available.<br /><br />
                        Tap below to book instantly:
                    </Typography>
                </Box>
                <Box sx={{ p: 1, background: '#4E5FFD', color: '#fff', textAlign: 'center', borderRadius: '9999px', fontWeight: 700, cursor: 'pointer', '&:hover': { background: '#3A4AE8' } }}>
                    <Typography variant="caption">Generate Campaign</Typography>
                </Box>
            </Box>

            <Box sx={{ width: { xs: '100%', md: '220px' }, height: { xs: '300px', md: 'auto' }, border: '1px solid #F3F4F6', borderRadius: '16px', background: '#E5DDD5', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Box sx={{ p: 1.5, background: '#075E54', color: '#fff', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>Live Preview</Typography>
                </Box>
                <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto' }}>
                    <Box sx={{ background: '#FFF', p: 1.5, borderRadius: '0 10px 10px 10px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                        <Box sx={{ width: '100%', height: 60, background: '#E5E7EB', mb: 1, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="art workshop" />
                        </Box>
                        <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#1A1A2E', lineHeight: 1.2, display: 'block' }}>
                            Hi John 👋<br />Ready to unleash your creativity? 🎨 Book your slot for the Oct 24th Clay Art Workshop! Only 12 slots available.
                        </Typography>
                        <Box sx={{ mt: 1, p: 0.5, borderTop: '1px solid #F3F4F6', textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#4E5FFD', fontWeight: 600 }}>Book Slot</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Paper>
);


const DashboardPreviewSection = () => {
    const { scrollYProgress } = useScroll();
    const mockY = useTransform(scrollYProgress, [0, 1], [150, -50]);
    const mockScale = useTransform(scrollYProgress, [0.3, 0.6], [0.95, 1.05]);

    return (
        <Box
            sx={{
                py: { xs: 15, md: 24 },
                background: '#ffffff',
                color: '#1A1A2E',
                position: 'relative',
                overflow: 'hidden',
                borderTop: '1px solid #F3F4F6',
            }}
        >
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        sx={{ color: '#4E5FFD', fontWeight: 600, fontSize: '0.85rem', mb: 2, display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                    >
                        Command Center
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            fontWeight: 700,
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                            color: '#1A1A2E',
                        }}
                    >
                        Absolute{' '}
                        <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 400, color: '#4E5FFD' }}>
                            Control
                        </Box>
                    </Typography>
                </Box>

                <motion.div
                    style={{
                        y: mockY,
                        scale: mockScale,
                        perspective: '1500px'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: { xs: 'auto', md: '700px' },
                            background: '#fafafa',
                            border: '1px solid #F3F4F6',
                            borderRadius: '20px',
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(78,95,253,0.1)',
                        }}
                    >
                        <Sidebar />

                        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
                            <Box sx={{ p: 3, borderBottom: '1px solid #F3F4F6', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A1A2E' }}>Workspace Overview</Typography>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Box sx={{ px: 2, py: 1, background: '#F8F7FF', borderRadius: '9999px', border: '1px solid #F3F4F6', color: '#6B7280' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>Search campaigns...</Typography>
                                    </Box>
                                    <Box sx={{ p: 1, background: '#4E5FFD', color: '#fff', borderRadius: '9999px', px: 3, cursor: 'pointer' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>+ New Flow</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Grid container spacing={2} sx={{ px: 3, pt: 3, pb: 0 }}>
                                {[
                                    { label: 'Total Sales', value: '₹2.4M', trend: '+14%' },
                                    { label: 'Active Orders', value: '342', trend: '+8%' },
                                    { label: 'New Leads', value: '1,284', trend: '+22%' },
                                    { label: 'Conversion Rate', value: '8.4%', trend: '+2%' },
                                ].map((stat, i) => (
                                    <Grid size={{ xs: 6, md: 3 }} key={i}>
                                        <Box sx={{ p: 2, background: '#F8F7FF', borderRadius: '12px', border: '1px solid #F3F4F6' }}>
                                            <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 600, display: 'block', mb: 1 }}>{stat.label}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                                                <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A1A2E' }}>{stat.value}</Typography>
                                                <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700 }}>{stat.trend}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            <Grid container spacing={3} sx={{ p: 3, flexGrow: 1, height: { xs: 'auto', md: 'calc(100% - 150px)' } }}>
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <ResortInventoryTracker />
                                </Grid>
                                <Grid size={{ xs: 12, md: 7 }}>
                                    <CampaignGenerator />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default DashboardPreviewSection;
