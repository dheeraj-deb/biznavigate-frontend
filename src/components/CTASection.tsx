import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CTASection = () => {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        background: '#f9f9f9',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box 
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            background: '#fff',
            borderRadius: 2,
            border: '1px solid #eaeaea',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            p: { xs: 4, md: 6 },
          }}
        >
          <Box sx={{ width: { xs: '100%', md: 'calc(66.66% - 16px)' } }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#222',
              }}
            >
              Get the playbook
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                color: '#666',
                maxWidth: '600px',
                mb: 2,
              }}
            >
              From AI hype to <Box component="span" sx={{ color: '#00b5a8' }}>business outcomes</Box>
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                maxWidth: '600px',
              }}
            >
              Join the AI revolution and streamline your B2B processes with our specialized AI solutions.
            </Typography>
          </Box>
          
          <Box sx={{ 
            width: { xs: '100%', md: 'calc(33.33% - 16px)' }, 
            display: 'flex', 
            justifyContent: { xs: 'center', md: 'flex-end' },
            alignItems: 'center',
          }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: '#00b5a8',
                borderRadius: '30px',
                '&:hover': {
                  backgroundColor: '#009b92',
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection; 