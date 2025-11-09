import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        background: '#fff',
        borderTop: '1px solid #eaeaea',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2, justifyContent: 'space-between' }}>
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 2 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#222',
              }}
            >
              Biznavigate
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                mb: 2,
                maxWidth: 280,
              }}
            >
              Transforming B2B sales automation with WhatsApp-powered AI technology.
            </Typography>
            <Typography variant="body2" sx={{ color: '#888' }}>
              © {new Date().getFullYear()} Biznavigate Solutions LLP. All rights reserved.
            </Typography>
          </Box>
          <Box sx={{ width: { xs: '50%', sm: '25%', md: '16.67%' }, p: 2 }}>
            <Typography
              variant="subtitle2"
              component="h6"
              sx={{
                color: '#222',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Legal
            </Typography>
            <Stack spacing={1}>
              <Link
                component={RouterLink}
                to="/privacy-policy"
                underline="hover"
                sx={{
                  color: '#666',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: '#00b5a8',
                  },
                }}
              >
                Privacy Policy
              </Link>
            </Stack>
          </Box>
          <Box sx={{ width: { xs: '50%', sm: '25%', md: '16.67%' }, p: 2 }}>
            <Typography
              variant="subtitle2"
              component="h6"
              sx={{
                color: '#222',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Support
            </Typography>
            <Stack spacing={1}>
              {['Product', 'Features', 'Pricing', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  underline="hover"
                  sx={{
                    color: '#666',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#00b5a8',
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 