import React, { useState } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import FadeUp from './FadeUp';

const benefits = [
  'Answers customer queries instantly, 24/7 without human effort',
  'Lets visitors place orders or book appointments directly in chat',
  'Collects lead details and qualifies prospects automatically',
  'Shares catalogues, brochures, and pricing on demand',
  'Embeds on any website with a single line of code',
];

const chatMessages = [
  { from: 'user', text: 'Hi! Do you have any 3 BHK units available?' },
  { from: 'bot', text: 'Yes! 🏗️ We have 3 BHK units in Block C of Skyline Heights. Here\'s an overview:' },
  { from: 'bot', isProduct: true },
  { from: 'user', text: 'Can I book a site visit this weekend?' },
  { from: 'bot', text: 'Of course! I\'ve noted your interest. Please share your preferred date and I\'ll confirm your slot right away. 📅' },
];

const BrowserMockup = () => {
  const [typing] = useState(true);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Browser Chrome */}
      <Box sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(78,95,253,0.15)',
        border: '1px solid #F3F4F6',
      }}>
        {/* Browser Top Bar */}
        <Box sx={{ background: '#F8F7FF', borderBottom: '1px solid #F3F4F6', px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 0.75 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: '#FF6B6B' }} />
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
          </Box>
          <Box sx={{ flex: 1, background: '#ffffff', borderRadius: '6px', px: 2, py: 0.5, border: '1px solid #E5E7EB' }}>
            <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF' }}>www.skylineheights.com</Typography>
          </Box>
        </Box>

        {/* Website Content */}
        <Box sx={{ background: '#ffffff', height: { xs: 420, md: 500 }, position: 'relative', overflow: 'hidden' }}>
          {/* Fake website header */}
          <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 24, height: 24, borderRadius: '6px', background: '#1A1A2E' }} />
              <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#1A1A2E' }}>Skyline Heights</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {['Projects', 'Apartments', 'Amenities', 'Contact'].map(item => (
                <Typography key={item} sx={{ fontSize: '0.7rem', color: '#6B7280' }}>{item}</Typography>
              ))}
            </Box>
          </Box>

          {/* Fake website hero */}
          <Box sx={{ px: 3, py: 3 }}>
            <Box sx={{
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative',
              height: 150,
            }}>
              <Box component="img"
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,26,46,0.75) 0%, transparent 70%)', display: 'flex', alignItems: 'center', p: 2.5 }}>
                <Box>
                  <Typography sx={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600, mb: 0.5 }}>Premium Residences · Phase 2 Open</Typography>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.3 }}>Luxury Living<br />Redefined</Typography>
                  <Box sx={{ mt: 1.5, display: 'inline-block', background: '#4E5FFD', color: '#fff', borderRadius: '9999px', px: 2, py: 0.4 }}>
                    <Typography sx={{ fontSize: '0.6rem', fontWeight: 700 }}>Explore Units</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* AI Chat Widget — bottom right */}
          <Box sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            width: 240,
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}>
            {/* Chat Window */}
            <Box sx={{
              background: '#ffffff',
              borderRadius: '16px 16px 4px 16px',
              boxShadow: '0 8px 32px rgba(78,95,253,0.2)',
              border: '1px solid #F3F4F6',
              overflow: 'hidden',
              mb: 1.5,
            }}>
              {/* Chat Header */}
              <Box sx={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #4E5FFD 100%)', p: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SmartToyOutlinedIcon sx={{ fontSize: '0.9rem', color: '#fff' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>Sales Assistant</Typography>
                  <Typography sx={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.7)' }}>● Online now</Typography>
                </Box>
              </Box>

              {/* Messages */}
              <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 1, background: '#F8F7FF', maxHeight: 200, overflowY: 'auto' }}>
                {chatMessages.map((msg, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                    {msg.isProduct ? (
                      <Box sx={{ background: '#fff', borderRadius: '10px', overflow: 'hidden', border: '1px solid #E5E7EB', width: '90%' }}>
                        <Box component="img"
                          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80"
                          sx={{ width: '100%', height: 55, objectFit: 'cover' }}
                        />
                        <Box sx={{ p: 1 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.6rem', color: '#1A1A2E' }}>Block C — 3 BHK, 1,450 sq.ft</Typography>
                          <Typography sx={{ fontSize: '0.6rem', color: '#4E5FFD', fontWeight: 700 }}>From ₹85L <Box component="span" sx={{ color: '#9CA3AF', fontWeight: 400 }}>onwards</Box></Typography>
                          <Box sx={{ mt: 0.5, display: 'flex', gap: 0.5 }}>
                            <Box sx={{ flex: 1, background: '#EEF0FF', color: '#4E5FFD', textAlign: 'center', py: 0.3, borderRadius: '4px', fontSize: '0.55rem', fontWeight: 600 }}>Brochure</Box>
                            <Box sx={{ flex: 1, background: '#4E5FFD', color: '#fff', textAlign: 'center', py: 0.3, borderRadius: '4px', fontSize: '0.55rem', fontWeight: 600 }}>Book Visit</Box>
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      <Box sx={{
                        background: msg.from === 'user' ? '#4E5FFD' : '#ffffff',
                        color: msg.from === 'user' ? '#fff' : '#1A1A2E',
                        px: 1.5, py: 0.75,
                        borderRadius: msg.from === 'user' ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
                        maxWidth: '85%',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                      }}>
                        <Typography sx={{ fontSize: '0.65rem', lineHeight: 1.4 }}>{msg.text}</Typography>
                      </Box>
                    )}
                  </Box>
                ))}
                {typing && (
                  <Box sx={{ display: 'flex', gap: 0.5, p: 1, px: 1.5, background: '#fff', borderRadius: '10px', width: 'fit-content', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    {[0, 0.2, 0.4].map((d, i) => (
                      <Box key={i} sx={{ width: 5, height: 5, borderRadius: '50%', background: '#4E5FFD', animation: 'bounce 1.4s infinite ease-in-out', animationDelay: `${d}s` }} />
                    ))}
                  </Box>
                )}
              </Box>

              {/* Input */}
              <Box sx={{ p: 1, background: '#fff', borderTop: '1px solid #F3F4F6', display: 'flex', gap: 0.75, alignItems: 'center' }}>
                <Box sx={{ flex: 1, background: '#F8F7FF', borderRadius: '9999px', px: 1.5, py: 0.5, border: '1px solid #E5E7EB' }}>
                  <Typography sx={{ fontSize: '0.6rem', color: '#9CA3AF' }}>Ask about units, pricing...</Typography>
                </Box>
                <Box sx={{ width: 26, height: 26, background: '#4E5FFD', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Typography sx={{ fontSize: '0.7rem', color: '#fff', ml: 0.3 }}>➤</Typography>
                </Box>
              </Box>
            </Box>

            {/* Chat Toggle Button */}
            <Box sx={{ alignSelf: 'flex-end', width: 40, height: 40, background: 'linear-gradient(135deg, #1A1A2E 0%, #4E5FFD 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(78,95,253,0.4)', cursor: 'pointer' }}>
              <SmartToyOutlinedIcon sx={{ fontSize: '1.1rem', color: '#fff' }} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Embed badge */}
      <Box sx={{
        position: 'absolute',
        bottom: -20,
        left: { xs: 16, md: -24 },
        background: '#1A1A2E',
        borderRadius: '12px',
        px: 2.5,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        zIndex: 2,
      }}>
        <CodeOutlinedIcon sx={{ color: '#4E5FFD', fontSize: '1.1rem' }} />
        <Box>
          <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1 }}>One-line embed</Typography>
          <Typography sx={{ fontSize: '0.7rem', color: '#A5B4FC', fontFamily: 'monospace', mt: 0.25 }}>{'<script src="biznavigo.js" />'}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const WebsiteChatbotSection = () => (
  <Box id="website-chatbot" sx={{ py: { xs: 12, md: 20 }, background: '#ffffff', overflow: 'hidden' }}>
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
        {/* Left: Text */}
        <Grid size={{ xs: 12, md: 5 }}>
          <FadeUp delay={0.1}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, background: '#EEF0FF', color: '#4E5FFD', px: 2, py: 0.75, borderRadius: '9999px', mb: 3, border: '1px solid rgba(78,95,253,0.2)' }}>
              <SmartToyOutlinedIcon sx={{ fontSize: '0.9rem' }} />
              <Typography sx={{ fontWeight: 600, fontSize: '0.78rem' }}>Website Widget</Typography>
            </Box>

            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 700, color: '#1A1A2E', lineHeight: 1.2, letterSpacing: '-0.02em', mb: 2 }}>
              Add an AI chatbot to{' '}
              <Box component="span" sx={{ color: '#4E5FFD' }}>any website</Box>
              {' '}in minutes
            </Typography>

            <Typography sx={{ color: '#6B7280', fontSize: '1.05rem', lineHeight: 1.7, mb: 4 }}>
              Paste one line of code and your website gets a smart AI assistant that handles customer queries, drives conversions, and completes orders — without any developer needed.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
              {benefits.map((b, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <CheckCircleOutlineIcon sx={{ color: '#4E5FFD', fontSize: '1.2rem', flexShrink: 0, mt: 0.1 }} />
                  <Typography sx={{ color: '#374151', fontSize: '0.925rem', lineHeight: 1.6 }}>{b}</Typography>
                </Box>
              ))}
            </Box>

            {/* Stats row */}
            <Box sx={{ display: 'flex', gap: 4 }}>
              {[
                { value: '< 5 min', label: 'Setup time' },
                { value: '3×', label: 'More conversions' },
                { value: '24/7', label: 'Always available' },
              ].map((s, i) => (
                <Box key={i}>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: '#4E5FFD', lineHeight: 1 }}>{s.value}</Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: '#6B7280', mt: 0.5 }}>{s.label}</Typography>
                </Box>
              ))}
            </Box>
          </FadeUp>
        </Grid>

        {/* Right: Browser Mockup */}
        <Grid size={{ xs: 12, md: 7 }}>
          <FadeUp delay={0.2}>
            <Box sx={{ position: 'relative', pb: 4 }}>
              <BrowserMockup />
            </Box>
          </FadeUp>
        </Grid>
      </Grid>
    </Container>
    <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }`}</style>
  </Box>
);

export default WebsiteChatbotSection;
