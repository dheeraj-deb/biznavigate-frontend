import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
        pt: { xs: 15, md: 20 },
        pb: { xs: 10, md: 10 },
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: '16px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.05)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: '40%',
              height: '40%',
              background: 'radial-gradient(circle, rgba(0, 181, 168, 0.05) 0%, rgba(0, 181, 168, 0) 70%)',
              zIndex: 1,
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              bottom: '-10%',
              left: '-5%',
              width: '40%',
              height: '40%',
              background: 'radial-gradient(circle, rgba(108, 92, 231, 0.05) 0%, rgba(108, 92, 231, 0) 70%)',
              zIndex: 1,
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: '#00b5a8',
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: 2,
                fontWeight: 600,
                display: 'inline-block',
              }}
            >
              COMING SOON
            </Typography>
            
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: '#222',
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Our Pricing Plans Are Being Updated
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: '#555',
                maxWidth: '600px',
                mx: 'auto',
                mb: 6,
                lineHeight: 1.8,
                fontSize: '1.1rem',
              }}
            >
              We're finalizing our pricing structure to ensure we offer the best value for your business. 
              Please check back soon or contact us directly for custom pricing information.
            </Typography>
            
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              sx={{
                backgroundColor: '#00b5a8',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#009b92',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 20px rgba(0, 181, 168, 0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Return to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ComingSoon; 