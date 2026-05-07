import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import FadeUp from './FadeUp';

const comparisons = [
  { old: 'Manual data entry and copy-pasting orders.', new: 'Complete end-to-end automation from chat to CRM.' },
  { old: 'Simple rigid chatbot menus and keyword replies.', new: 'Natural language understanding and human-like chats.' },
  { old: 'Using multiple tools for chat, booking, and payment.', new: 'One unified platform handling your entire workflow.' },
];

const DifferentiationSection = () => (
  <Box sx={{ py: { xs: 10, md: 16 }, background: '#F8F7FF' }}>
    <Container maxWidth="lg">
      <FadeUp delay={0.1}>
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 }, maxWidth: 700, mx: 'auto' }}>
          <Typography sx={{ color: '#4E5FFD', fontWeight: 600, fontSize: '0.85rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            The Difference
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, color: '#1A1A2E', lineHeight: 1.2, letterSpacing: '-0.02em', mb: 2 }}>
            Not just a chatbot.<br />A digital workforce.
          </Typography>
          <Typography sx={{ color: '#6B7280', fontSize: '1.05rem', lineHeight: 1.7 }}>
            We don't just send automated replies. Our AI agents understand context and execute business tasks.
          </Typography>
        </Box>
      </FadeUp>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 860, mx: 'auto' }}>
        {comparisons.map((item, i) => (
          <FadeUp delay={0.1 + i * 0.1} key={i}>
            <Grid container spacing={0} sx={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid #F3F4F6', background: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              {/* Old way */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{
                  p: { xs: 3, md: 4 }, display: 'flex', gap: 2.5, alignItems: 'flex-start',
                  background: '#FFF9F9',
                  borderRight: { sm: '1px solid #F3F4F6' },
                  borderBottom: { xs: '1px solid #F3F4F6', sm: 'none' },
                  height: '100%',
                }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', background: '#FFE8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF6B6B', flexShrink: 0, mt: 0.25 }}>
                    <CloseOutlinedIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#FF6B6B', fontWeight: 600, fontSize: '0.75rem', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>The old way</Typography>
                    <Typography sx={{ color: '#9CA3AF', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.old}</Typography>
                  </Box>
                </Box>
              </Grid>
              {/* New way */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: { xs: 3, md: 4 }, display: 'flex', gap: 2.5, alignItems: 'flex-start', height: '100%' }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0, mt: 0.25 }}>
                    <CheckOutlinedIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#10B981', fontWeight: 600, fontSize: '0.75rem', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>With AI employee</Typography>
                    <Typography sx={{ color: '#1A1A2E', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500 }}>{item.new}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </FadeUp>
        ))}
      </Box>
    </Container>
  </Box>
);

export default DifferentiationSection;
