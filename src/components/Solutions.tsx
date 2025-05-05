import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, useTheme, useMediaQuery, ButtonBase, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import AnalyticsIcon from '@mui/icons-material/BarChart';
import StorageIcon from '@mui/icons-material/Storage';
import AutomationIcon from '@mui/icons-material/AutoFixHigh';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface SolutionItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  background: string;
  borderColor: string;
  detailedDescription: string;
}

// Solution cards data
const solutions: SolutionItem[] = [
  {
    id: 1,
    title: 'WhatsApp Order Capture',
    description: 'Instantly convert customer WhatsApp messages into structured orders',
    icon: <WhatsAppIcon sx={{ fontSize: '2.5rem' }} />,
    color: '#25D366',
    background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.1) 0%, rgba(37, 211, 102, 0.05) 100%)',
    borderColor: 'rgba(37, 211, 102, 0.3)',
    detailedDescription: 'Our AI automatically processes incoming WhatsApp messages from your customers, extracts product details, quantities, and delivery information, and creates standardized order entries. No more manual data entry or transcription errors.'
  },
  {
    id: 2,
    title: 'Email Order Processing',
    description: 'Convert email orders into structured data with intelligent extraction',
    icon: <EmailIcon sx={{ fontSize: '2.5rem' }} />,
    color: '#5364FF',
    background: 'linear-gradient(135deg, rgba(83, 100, 255, 0.1) 0%, rgba(83, 100, 255, 0.05) 100%)',
    borderColor: 'rgba(83, 100, 255, 0.3)',
    detailedDescription: 'Our email processing AI reads customer order emails, recognizes purchase details regardless of format, and automatically enters orders into your system. Works with attachments, forwarded messages, and various email layouts.'
  },
  {
    id: 3,
    title: 'Order Analytics',
    description: 'Gain valuable insights into order patterns and customer behavior',
    icon: <AnalyticsIcon sx={{ fontSize: '2.5rem' }} />,
    color: '#FF5364',
    background: 'linear-gradient(135deg, rgba(255, 83, 100, 0.1) 0%, rgba(255, 83, 100, 0.05) 100%)',
    borderColor: 'rgba(255, 83, 100, 0.3)',
    detailedDescription: 'Our analytics dashboard reveals ordering trends, popular products, customer purchasing patterns, and predictive insights to optimize inventory and improve customer relationships.'
  },
  {
    id: 4,
    title: 'CRM Integration',
    description: 'Seamlessly connect processed orders with your existing CRM system',
    icon: <StorageIcon sx={{ fontSize: '2.5rem' }} />,
    color: '#A353FF',
    background: 'linear-gradient(135deg, rgba(163, 83, 255, 0.1) 0%, rgba(163, 83, 255, 0.05) 100%)',
    borderColor: 'rgba(163, 83, 255, 0.3)',
    detailedDescription: 'We integrate with popular CRM platforms to automatically update customer records, order history, and account information. Works with Salesforce, HubSpot, Microsoft Dynamics, and custom CRM solutions.'
  },
  {
    id: 5,
    title: 'Automated Inventory Updates',
    description: 'Keep inventory levels accurate with real-time order processing',
    icon: <AutomationIcon sx={{ fontSize: '2.5rem' }} />,
    color: '#FFB400',
    background: 'linear-gradient(135deg, rgba(255, 180, 0, 0.1) 0%, rgba(255, 180, 0, 0.05) 100%)',
    borderColor: 'rgba(255, 180, 0, 0.3)',
    detailedDescription: 'As orders are processed, our system automatically adjusts inventory levels, creates purchase alerts for low-stock items, and helps optimize warehouse operations and reordering schedules.'
  },
  {
    id: 6,
    title: 'Secure & Compliant',
    description: 'Enterprise-grade security for sensitive customer and order data',
    icon: <SecurityIcon sx={{ fontSize: '2.5rem' }} />,
    color: '#00B467',
    background: 'linear-gradient(135deg, rgba(0, 180, 103, 0.1) 0%, rgba(0, 180, 103, 0.05) 100%)',
    borderColor: 'rgba(0, 180, 103, 0.3)',
    detailedDescription: 'Our platform maintains strict data security protocols, encryption standards, and compliance requirements to keep customer information and order data protected at all times.'
  }
];

const Solutions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [animatedCards, setAnimatedCards] = useState<Array<number>>([]);
  
  // Stagger card animations on first render
  useEffect(() => {
    const timer = setTimeout(() => {
      const intervalId = setInterval(() => {
        setAnimatedCards((previousCards: Array<number>) => {
          if (previousCards.length === solutions.length) {
            clearInterval(intervalId);
            return previousCards;
          }
          return [...previousCards, previousCards.length];
        });
      }, 100);
      
      return () => clearInterval(intervalId);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      id="solutions"
      sx={{
        py: { xs: 10, md: 16 },
        background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fancy background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '30%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(83, 100, 255, 0.05) 0%, rgba(83, 100, 255, 0) 70%)',
          zIndex: 1,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '0',
          width: '40%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(0, 181, 168, 0.05) 0%, rgba(0, 181, 168, 0) 70%)',
          zIndex: 1,
        }}
      />
      
      {/* Geometric patterns */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '30px',
          height: '30px',
          border: '3px solid rgba(0, 181, 168, 0.2)',
          borderRadius: '50%',
          zIndex: 1,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '60px',
          height: '60px',
          border: '3px solid rgba(83, 100, 255, 0.2)',
          transform: 'rotate(45deg)',
          zIndex: 1,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '30%',
          width: '15px',
          height: '15px',
          backgroundColor: 'rgba(255, 83, 100, 0.2)',
          borderRadius: '50%',
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header with animation */}
        <Box 
          sx={{ 
            mb: 10, 
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <Typography
            variant="h6"
            component="p"
            sx={{
              color: '#00b5a8',
              mb: 2,
              textTransform: 'uppercase',
              letterSpacing: 2,
              fontWeight: 600,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '3px',
                background: '#00b5a8',
                borderRadius: '3px',
              }
            }}
          >
            HOW WE HELP
          </Typography>
          
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 3,
              color: '#222',
              fontSize: { xs: '2.25rem', md: '3.5rem' },
            }}
          >
            Automate Your <Box component="span" sx={{ color: '#00b5a8' }}>Order Management</Box>
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: '#555',
              maxWidth: '750px',
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: '1.1rem',
            }}
          >
            Our AI-powered platform transforms how wholesalers and distributors handle orders by automatically processing
            messages from WhatsApp and emails, eliminating manual data entry, and seamlessly updating your business systems.
          </Typography>
        </Box>

        {/* Interactive Card Grid */}
        <Box sx={{ position: 'relative' }}>          
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              mx: -2,
              position: 'relative',
              zIndex: 2
            }}
          >
            {solutions.map((solution, index) => {
              const isInView = animatedCards.includes(index);
              
              return (
                <Box 
                  key={solution.id}
                  sx={{ 
                    width: { xs: '100%', sm: '50%', md: '33.333%' },
                    p: 2,
                    transform: isInView ? 'translateY(0)' : 'translateY(50px)',
                    opacity: isInView ? 1 : 0,
                    transition: 'transform 0.6s ease, opacity 0.6s ease',
                  }}
                >
                  <ButtonBase 
                    component="div" 
                    disableRipple
                    onClick={() => setActiveCard(activeCard === solution.id ? null : solution.id)}
                    sx={{ 
                      display: 'block', 
                      width: '100%',
                      textAlign: 'left' 
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',
                        background: activeCard === solution.id 
                          ? `linear-gradient(135deg, ${solution.color}15 0%, ${solution.color}05 100%)` 
                          : solution.background,
                        border: `1px solid ${activeCard === solution.id ? solution.color : solution.borderColor}`,
                        borderRadius: '16px',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        overflow: 'hidden',
                        position: 'relative',
                        transform: activeCard === solution.id ? 'scale(1.03)' : 'scale(1)',
                        '&:hover': {
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                          borderColor: solution.color,
                          transform: 'translateY(-8px)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4, position: 'relative' }}>
                        <Box 
                          sx={{
                            color: solution.color,
                            mb: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                          }}
                        >
                          {solution.icon}
                        </Box>
                        
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{
                            fontWeight: 700,
                            mb: 2,
                            color: '#222',
                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                          }}
                        >
                          {solution.title}
                        </Typography>
                        
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#555',
                            lineHeight: 1.7,
                            fontSize: '0.95rem',
                            mb: activeCard === solution.id ? 3 : 0,
                          }}
                        >
                          {solution.description}
                        </Typography>
                        
                        {/* Expanded content */}
                        <Box
                          sx={{
                            height: activeCard === solution.id ? 'auto' : '0',
                            opacity: activeCard === solution.id ? 1 : 0,
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            transform: activeCard === solution.id ? 'translateY(0)' : 'translateY(-20px)',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#555',
                              lineHeight: 1.7,
                              mb: 2,
                              fontSize: '0.95rem',
                            }}
                          >
                            {solution.detailedDescription}
                          </Typography>
                          
                          <Button
                            size="small"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                              color: solution.color,
                              textTransform: 'none',
                              fontWeight: 600,
                              p: 0,
                              '&:hover': {
                                background: 'transparent',
                                opacity: 0.8,
                              }
                            }}
                          >
                            Learn more
                          </Button>
                        </Box>
                        
                        {/* Decorative corner element */}
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                            width: '30px',
                            height: '30px',
                            opacity: 0.1,
                            borderRight: `2px solid ${solution.color}`,
                            borderBottom: `2px solid ${solution.color}`,
                          }}
                        />
                        
                        {/* Expansion indicator */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: solution.color,
                            transition: 'all 0.3s ease',
                            transform: activeCard === solution.id ? 'rotate(45deg)' : 'rotate(0)',
                            opacity: 0.7,
                            '&::before, &::after': {
                              content: '""',
                              position: 'absolute',
                              background: solution.color,
                            },
                            '&::before': {
                              width: '12px',
                              height: '2px',
                            },
                            '&::after': {
                              width: '2px',
                              height: '12px',
                            }
                          }}
                        />
                      </CardContent>
                    </Card>
                  </ButtonBase>
                </Box>
              );
            })}
          </Box>
        </Box>
        
        {/* CTA Section */}
        <Box 
          sx={{ 
            mt: 10,
            textAlign: 'center',
          }}
        >
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: '#00b5a8',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: '0 10px 25px rgba(0, 181, 168, 0.25)',
              '&:hover': {
                backgroundColor: '#009b92',
                boxShadow: '0 15px 30px rgba(0, 181, 168, 0.35)',
                transform: 'translateY(-3px)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Explore All Solutions
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Solutions; 