import React from 'react';
import { Box, Container, Typography } from '@mui/material';

// Usually these would be imported from assets folder
const partnerLogos = [
  { name: 'Microsoft', logo: '📱' },
  { name: 'Accenture', logo: '💻' },
  { name: 'SAP', logo: '🖥️' },
  { name: 'Oracle', logo: '📊' },
  { name: 'Salesforce', logo: '☁️' },
  { name: 'IBM', logo: '🔧' },
  { name: 'Amazon', logo: '📦' },
  { name: 'Google', logo: '🔍' },
];

const Partners = () => {
  return (
    <Box
      sx={{
        py: 8,
        background: '#f9f9f9',
        borderTop: '1px solid #eaeaea',
        borderBottom: '1px solid #eaeaea',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="subtitle1"
          component="p"
          align="center"
          sx={{
            color: '#666',
            mb: 6,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          OUR CLIENTS
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2, justifyContent: 'center' }}>
          {partnerLogos.map((partner, index) => (
            <Box 
              key={index}
              sx={{
                width: { xs: '50%', sm: '25%', md: '20%' },
                p: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  opacity: 0.6,
                  transition: 'opacity 0.3s',
                  filter: 'grayscale(100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              >
                {partner.logo}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Partners; 