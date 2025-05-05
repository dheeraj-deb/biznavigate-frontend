import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Container, Typography, Chip, useTheme, useMediaQuery, Paper, Grid, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ContactFormDialog from './ContactFormDialog';

const heroImages = [
  {
    id: 1,
    title: 'Order Management Dashboard',
    imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: 2,
    title: 'WhatsApp & Email Order Processing',
    imageUrl: '/images/whatsapp.jpg',
  },
  {
    id: 3,
    title: 'Payment & Shipping Automation',
    imageUrl: '/images/payment&shipping.jpg',
  },
];

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const handleOpenDemoDialog = () => {
    setDemoDialogOpen(true);
  };

  const handleCloseDemoDialog = () => {
    setDemoDialogOpen(false);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroImages.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  useEffect(() => {
    if (sliderRef.current && isMobile) {
      const slideWidth = sliderRef.current.scrollWidth / heroImages.length;
      sliderRef.current.scrollTo({
        left: slideWidth * activeSlide,
        behavior: 'smooth'
      });
    }
  }, [activeSlide, isMobile]);
  
  return (
    <>
    <Box
        id="hero"
      sx={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          pt: { xs: 14, md: 18 },
          pb: { xs: 14, md: 18 },
        position: 'relative',
        overflow: 'hidden',
          color: 'white',
          minHeight: { xs: '85vh', md: '90vh' },
          display: 'flex',
          alignItems: 'center',
      }}
    >
        {/* Animated Gradient Orbs */}
      <Box
        sx={{
          position: 'absolute',
            top: '-10%',
            left: '-5%',
            width: '50vw',
            height: '50vw',
            maxWidth: '800px',
            maxHeight: '800px',
          borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 181, 168, 0.15) 0%, rgba(0, 181, 168, 0) 70%)',
            filter: 'blur(50px)',
            animation: 'float 20s infinite alternate ease-in-out',
            '@keyframes float': {
              '0%': { transform: 'translate(0, 0)' },
              '50%': { transform: 'translate(5%, 5%)' },
              '100%': { transform: 'translate(-5%, -10%)' }
            },
          zIndex: 1,
        }}
      />
        
      <Box
        sx={{
          position: 'absolute',
            bottom: '-10%',
            right: '-10%',
            width: '60vw',
            height: '60vw',
            maxWidth: '900px',
            maxHeight: '900px',
          borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(108, 92, 231, 0.15) 0%, rgba(108, 92, 231, 0) 70%)',
            filter: 'blur(50px)',
            animation: 'floatReverse 25s infinite alternate ease-in-out',
            '@keyframes floatReverse': {
              '0%': { transform: 'translate(0, 0)' },
              '50%': { transform: 'translate(-5%, -5%)' },
              '100%': { transform: 'translate(5%, 10%)' }
            },
          zIndex: 1,
        }}
      />
        
        {/* Particle Grid Effect */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            zIndex: 1,
            opacity: 0.3,
          }}
        />
      
      {/* Main content */}
        <Container 
          maxWidth="lg" 
          sx={{ 
            position: 'relative', 
            zIndex: 2,
          }}
        >
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              {/* Highlight Badge */}
              <Chip
                label="AI-POWERED ORDER AUTOMATION"
                sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(5px)',
                  color: '#00b5a8',
                  fontWeight: 600,
                  mb: 4,
                  px: 2,
                  py: 2.5,
                  borderRadius: '100px',
                  '& .MuiChip-label': {
                    px: 1.5,
                  },
                  boxShadow: '0 4px 20px rgba(0, 181, 168, 0.15)',
                }}
              />
              
              {/* Main heading with animated gradient text */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  fontWeight: 800,
                mb: 3,
                  backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                  textShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
                  lineHeight: 1.1,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
                Automate Your <br />
                <Box 
                  component="span" 
                  sx={{ 
                    position: 'relative',
                    display: 'inline-block',
                    backgroundImage: 'linear-gradient(90deg, #00b5a8, #6C5CE7)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '5%',
                      width: '90%',
                      height: '4px',
                      background: 'linear-gradient(90deg, #00b5a8, #6C5CE7)',
                      borderRadius: '2px',
                    }
                  }}
                >
                  Order Processing
                </Box> 
                <br />
                with AI Power
            </Typography>
            
              {/* Subheading with enhanced typography */}
            <Typography
                variant="h5"
              sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 5,
                  maxWidth: '600px',
                  mx: { xs: 'auto', md: 0 },
                  lineHeight: 1.8,
                  fontWeight: 300,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
                We automate <Box component="span" sx={{ fontWeight: 600, color: 'white' }}>order capture</Box>, update your <Box component="span" sx={{ fontWeight: 600, color: 'white' }}>business systems</Box>, and provide a <Box component="span" sx={{ fontWeight: 600, color: 'white' }}>branded website</Box> for direct ordering.
            </Typography>
            
              {/* CTA Buttons with improved styling */}
              <Box sx={{ display: 'flex', gap: 3, flexWrap: { xs: 'wrap', sm: 'nowrap' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                    py: 1.8,
                    fontSize: '1rem',
                    fontWeight: 600,
                    backgroundColor: '#00b5a8',
                    color: 'white',
                    borderRadius: '8px',
                    textTransform: 'none',
                    boxShadow: '0 10px 20px rgba(0, 181, 168, 0.3)',
                    '&:hover': {
                      backgroundColor: '#009b92',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 15px 30px rgba(0, 181, 168, 0.4)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  See How It Works
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleOpenDemoDialog}
                  sx={{
                    px: 4,
                    py: 1.8,
                    fontSize: '1rem',
                  fontWeight: 600,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    borderRadius: '8px',
                    textTransform: 'none',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    '&:hover': {
                      borderColor: '#00b5a8',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Schedule a Demo
              </Button>
            </Box>
          </Grid>
          
            {/* Right Side - Image Cards */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              {isMobile ? (
                // Mobile Carousel Design
                <Box sx={{ 
                  width: '100%', 
                  mt: 6,
                  position: 'relative',
                  maxWidth: '100%'
                }}>
                  {/* Slider container */}
                  <Box
                    ref={sliderRef}
                    sx={{
                      display: 'flex',
                      overflowX: 'auto',
                      scrollSnapType: 'x mandatory',
                      scrollbarWidth: 'none', // Firefox
                      '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari
                      WebkitOverflowScrolling: 'touch',
                      position: 'relative',
                      mx: -2,
                      px: 2
                    }}
                  >
                    {heroImages.map((image, index) => (
                      <Paper
                        key={image.id}
                        elevation={8}
                        sx={{
                          flex: '0 0 auto',
                          width: 'calc(100% - 32px)', // Full width minus padding
                          mx: 2,
                          height: '220px',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          scrollSnapAlign: 'center',
                          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                          transform: index === activeSlide ? 'scale(1)' : 'scale(0.9)',
                          transition: 'all 0.3s ease',
                          opacity: index === activeSlide ? 1 : 0.7,
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                          }}
                        >
                          <Box
                            component="img"
                            src={image.imageUrl}
                            alt={image.title}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                          
                          {/* Overlay */}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              p: 2,
                              background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: 'white',
                                fontWeight: 600,
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                fontSize: '1.1rem',
                              }}
                            >
                              {image.title}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </Box>

                  {/* Navigation buttons */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    mt: 2,
                    gap: 1
                  }}>
                    <IconButton 
                      onClick={handlePrevSlide}
                      sx={{ 
                        color: 'white',
                        bgcolor: 'rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(4px)',
                        '&:hover': { bgcolor: 'rgba(0, 181, 168, 0.3)' }
                      }}
                    >
                      <NavigateBeforeIcon />
                    </IconButton>
                    
                    {/* Dots indicator */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {heroImages.map((_, index) => (
                        <Box 
                          key={index} 
                          onClick={() => setActiveSlide(index)}
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: index === activeSlide ? '#00b5a8' : 'rgba(255, 255, 255, 0.4)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      ))}
                    </Box>
                    
                    <IconButton 
                      onClick={handleNextSlide}
                      sx={{ 
                        color: 'white',
                        bgcolor: 'rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(4px)',
                        '&:hover': { bgcolor: 'rgba(0, 181, 168, 0.3)' }
                      }}
                    >
                      <NavigateNextIcon />
                    </IconButton>
                  </Box>
                </Box>
              ) : (
                // Desktop 3D Card Stack (existing code)
                <Box
                  sx={{
                    width: '100%',
                    position: 'relative',
                    height: { xs: '450px', sm: '450px', md: '550px' },
                    perspective: '1500px',
                    mt: { xs: 6, md: 0 },
                    maxWidth: { xs: '320px', sm: '350px', md: '100%' },
                    mx: 'auto',
                  }}
                >
                  {/* Floating image cards */}
                  {heroImages.map((image, index) => (
                    <Paper
                      key={image.id}
                      elevation={24}
                      sx={{
                        position: 'absolute',
                        width: { xs: '280px', sm: '300px', md: '350px' },
                        maxWidth: '100%',
                        height: { xs: '200px', sm: '220px', md: '250px' },
                        borderRadius: '16px',
                        overflow: 'hidden',
                        transform: `
                          translateY(${index * 40}px) 
                          translateX(${index % 2 === 0 ? index * 20 : 0}px) 
                          rotateY(${index % 2 === 0 ? -5 : 5}deg) 
                          rotateX(${index * 2}deg)
                          scale(${1 - index * 0.05})
                        `,
                        transformStyle: 'preserve-3d',
                        zIndex: 5 - index,
                        transition: 'all 0.5s ease',
                        animation: `float-card-${index} 8s infinite alternate ease-in-out`,
                        top: `${10 + index * 10}%`,
                        left: `${index % 2 === 0 ? 0 : 20}%`,
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                        '&:hover': {
                          transform: `
                            translateY(${index * 40 - 10}px) 
                            translateX(${index % 2 === 0 ? index * 20 + 5 : 5}px) 
                            rotateY(${index % 2 === 0 ? -2 : 2}deg) 
                            rotateX(${index * 2 - 2}deg)
                            scale(${1 - index * 0.05 + 0.05})
                          `,
                          zIndex: 10,
                        },
                        '@keyframes float-card-0': {
                          '0%': { 
                            transform: 'translateY(0px) translateX(0px) rotateY(-5deg) rotateX(0deg) scale(1)'
                          },
                          '100%': { 
                            transform: 'translateY(-10px) translateX(10px) rotateY(-3deg) rotateX(2deg) scale(1.02)'
                          }
                        },
                        '@keyframes float-card-1': {
                          '0%': { 
                            transform: 'translateY(40px) translateX(0px) rotateY(5deg) rotateX(2deg) scale(0.95)'
                          },
                          '100%': { 
                            transform: 'translateY(30px) translateX(-10px) rotateY(3deg) rotateX(0deg) scale(0.97)'
                          }
                        },
                        '@keyframes float-card-2': {
                          '0%': { 
                            transform: 'translateY(80px) translateX(40px) rotateY(-5deg) rotateX(4deg) scale(0.9)'
                          },
                          '100%': { 
                            transform: 'translateY(70px) translateX(30px) rotateY(-7deg) rotateX(6deg) scale(0.92)'
                          }
                        },
                      }}
                    >
                      {/* Image */}
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          component="img"
                          src={image.imageUrl}
                          alt={image.title}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            },
                          }}
                        />
                        
                        {/* Overlay */}
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 2,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'white',
                              fontWeight: 600,
                              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                              fontSize: '1.25rem',
                            }}
                          >
                            {image.title}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                  
                  {/* Decorative elements */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -15,
                      right: -15,
                      width: '100px',
                      height: '100px',
                      borderRadius: '16px',
                      background: 'radial-gradient(circle, rgba(0, 181, 168, 0.3) 0%, rgba(0, 181, 168, 0) 70%)',
                      filter: 'blur(20px)',
                      zIndex: -1,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -20,
                      left: -20,
                      width: '120px',
                      height: '120px',
                      borderRadius: '20px',
                      background: 'radial-gradient(circle, rgba(108, 92, 231, 0.3) 0%, rgba(108, 92, 231, 0) 70%)',
                      filter: 'blur(25px)',
                      zIndex: -1,
                    }}
                  />
                </Box>
              )}
            </Grid>
        </Grid>
      </Container>
    </Box>
      
      {/* Demo Form Dialog */}
      <ContactFormDialog 
        open={demoDialogOpen} 
        onClose={handleCloseDemoDialog} 
        formType="demo" 
      />
    </>
  );
};

export default Hero; 