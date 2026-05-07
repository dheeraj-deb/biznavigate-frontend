import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: '#0F0C2E',
        color: '#ffffff',
        pt: { xs: 8, md: 12 },
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Top row */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            justifyContent: 'space-between',
            mb: 8,
          }}
        >
          {/* Brand */}
          <Box sx={{ maxWidth: 300 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '1.2rem',
                color: '#ffffff',
                letterSpacing: '-0.02em',
                mb: 2,
              }}
            >
              BizNavigo
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              Transforming B2B sales automation with WhatsApp-powered AI technology.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', mb: 3 }}>
              © {new Date().getFullYear()} BizNavigo TECHNOLOGIES PRIVATE LIMITED.
              <br />All rights reserved.
            </Typography>

            {/* Partner badges */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {/* Meta badge */}
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
              {/* WhatsApp badge */}
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1.25,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                px: 2, py: 1,
              }}>
                <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="24" fill="#25D366"/>
                  <path d="M24 10C16.3 10 10 16.3 10 24C10 26.6 10.7 29 11.9 31.1L10 38L17.1 36.1C19.1 37.2 21.5 37.9 24 37.9C31.7 37.9 38 31.6 38 23.9C38 16.3 31.7 10 24 10ZM31.3 29.7C31 30.5 29.6 31.2 28.9 31.3C28.2 31.4 27.4 31.4 26.5 31.1C25.9 30.9 25.2 30.6 24.3 30.2C20.8 28.6 18.5 25.1 18.3 24.8C18.1 24.6 16.8 22.9 16.8 21.1C16.8 19.3 17.7 18.5 18.1 18C18.4 17.6 18.8 17.5 19.1 17.5H19.8C20.1 17.5 20.5 17.4 20.9 18.3C21.3 19.3 22.2 21.1 22.3 21.3C22.4 21.5 22.5 21.7 22.3 22C22.2 22.3 22.1 22.5 21.9 22.7C21.7 22.9 21.4 23.2 21.2 23.4C21 23.6 20.8 23.8 21 24.1C21.2 24.4 22.2 26 23.6 27.3C25.4 28.9 26.9 29.4 27.2 29.6C27.5 29.8 27.7 29.7 27.9 29.5C28.1 29.3 29 28.3 29.3 28C29.6 27.7 29.8 27.7 30.1 27.8C30.4 27.9 32.2 28.8 32.5 29C32.8 29.2 33 29.3 33.1 29.4C33.2 29.7 33.2 30.2 32.9 30.9L31.3 29.7Z" fill="white"/>
                </svg>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, color: '#25D366', whiteSpace: 'nowrap' }}>
                  WhatsApp Business
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Legal */}
          <Box>
            <Typography
              sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 3 }}
            >
              Legal
            </Typography>
            <Stack spacing={2.5}>
              {[
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Terms of Service', to: '/terms' },
                { label: 'Data Deletion', to: '/data-deletion' },
              ].map(({ label, to }) => (
                <Link
                  key={label}
                  component={RouterLink}
                  to={to}
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    transition: 'color 0.2s',
                    '&:hover': { color: '#ffffff' },
                  }}
                >
                  {label}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Support */}
          <Box>
            <Typography
              sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 3 }}
            >
              Support
            </Typography>
            <Stack spacing={2.5}>
              {['About', 'Contact', 'Support'].map((item) => (
                <Link
                  href="#"
                  key={item}
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    transition: 'color 0.2s',
                    '&:hover': { color: '#ffffff' },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Bottom CTA strip */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            pt: 6,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            Ready to automate your business?
          </Typography>
          <Box
            sx={{
              background: '#4E5FFD',
              color: '#fff',
              px: 4,
              py: 1.5,
              borderRadius: 9999,
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': { background: '#3A4AE8', transform: 'translateY(-1px)' },
            }}
          >
            Get started for free →
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
