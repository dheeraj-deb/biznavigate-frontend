import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FadeUp from './FadeUp';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        background: '#FFFFFF',
        color: '#0A0A0A',
        borderTop: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Container maxWidth="lg">
        <FadeUp delay={0.1}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2, justifyContent: 'space-between' }}>
            <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 2 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  color: '#0A0A0A',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}
              >
                BizNavigo
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(10,10,10,0.65)',
                  mb: 4,
                  maxWidth: 280,
                  lineHeight: 1.6
                }}
              >
                Transforming B2B sales automation with WhatsApp-powered AI technology.
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(10,10,10,0.45)', fontSize: '0.8rem' }}>
                © {new Date().getFullYear()} BizNavigo TECHNOLOGIES PRIVATE LIMITED. <br />
                All rights reserved.
              </Typography>
            </Box>
            <Box sx={{ width: { xs: '50%', sm: '25%', md: '16.67%' }, p: 2 }}>
              <Typography
                variant="subtitle2"
                component="h6"
                sx={{
                  color: '#0A0A0A',
                  fontWeight: 700,
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Legal
              </Typography>
              <Stack spacing={2}>
                <Link
                  component={RouterLink}
                  to="/privacy-policy"
                  underline="none"
                  sx={{
                    color: 'rgba(10,10,10,0.65)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'color 0.3s',
                    '&:hover': { color: '#2563EB' }
                  }}
                >
                  Privacy Policy
                </Link>
                <Link
                  component={RouterLink}
                  to="/terms"
                  underline="none"
                  sx={{
                    color: 'rgba(10,10,10,0.65)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'color 0.3s',
                    '&:hover': { color: '#2563EB' }
                  }}
                >
                  Terms of Service
                </Link>
                <Link
                  component={RouterLink}
                  to="/data-deletion"
                  underline="none"
                  sx={{
                    color: 'rgba(10,10,10,0.65)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'color 0.3s',
                    '&:hover': { color: '#2563EB' }
                  }}
                >
                  Data Deletion
                </Link>
              </Stack>
            </Box>
            <Box sx={{ width: { xs: '50%', sm: '25%', md: '16.67%' }, p: 2 }}>
              <Typography
                variant="subtitle2"
                component="h6"
                sx={{
                  color: '#0A0A0A',
                  fontWeight: 700,
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Support
              </Typography>
              <Stack spacing={2}>
                {['About', 'Contact', 'Support'].map((item) => (
                  <Link
                    href="#"
                    key={item}
                    underline="none"
                    sx={{
                      color: 'rgba(242,242,242,0.6)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      transition: 'color 0.3s',
                      '&:hover': { color: '#2563EB' }
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Box>
        </FadeUp>
      </Container>
    </Box>
  );
};

export default Footer;
