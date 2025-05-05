import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText, Divider, Grid, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const pricingTiers = [
  {
    title: 'Starter',
    price: '$499',
    period: '/month',
    description: 'Perfect for small wholesalers looking to automate order processing',
    features: [
      'WhatsApp order processing (up to 500/month)',
      'Email order capture (up to 500/month)',
      'Basic CRM integration',
      'Standard support',
      '1 language support'
    ],
    highlighted: false,
    buttonText: 'Get Started'
  },
  {
    title: 'Professional',
    price: '$999',
    period: '/month',
    description: 'Ideal for growing distributors with moderate order volume',
    features: [
      'WhatsApp order processing (up to 2,000/month)',
      'Email order capture (up to 2,000/month)',
      'Full CRM & inventory integration',
      'Voice order recognition',
      'Priority support',
      '10 language support',
      'Shipment tracking'
    ],
    highlighted: true,
    buttonText: 'Start Free Trial'
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large distributors with high volume and custom needs',
    features: [
      'Unlimited order processing',
      'Custom integrations',
      'Dedicated support manager',
      'Advanced analytics dashboard',
      '30+ language support',
      'Voice order recognition',
      'Full shipment logistics',
      'White-label options'
    ],
    highlighted: false,
    buttonText: 'Contact Sales'
  }
];

const Pricing = () => {
  return (
    <Box
      id="pricing"
      sx={{
        py: { xs: 12, md: 16 },
        background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background elements */}
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

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            PRICING
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
            Simple, Transparent <Box component="span" sx={{ color: '#00b5a8' }}>Pricing</Box>
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
            Choose the plan that fits your business needs. All plans include our core AI-powered order automation technology.
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {pricingTiers.map((tier, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                elevation={tier.highlighted ? 8 : 1}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  border: tier.highlighted ? '2px solid #00b5a8' : '1px solid #eaeaea',
                  transform: tier.highlighted ? 'scale(1.05)' : 'scale(1)',
                  '&:hover': {
                    transform: tier.highlighted ? 'scale(1.07)' : 'scale(1.02)',
                    boxShadow: tier.highlighted ? '0 20px 40px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.05)',
                  },
                }}
              >
                {tier.highlighted && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 2,
                    }}
                  >
                    <Chip
                      label="MOST POPULAR"
                      sx={{
                        bgcolor: '#00b5a8',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>
                )}
                
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ 
                    align: 'center',
                    fontWeight: 700,
                    fontSize: '1.75rem',
                    color: tier.highlighted ? '#00b5a8' : '#222',
                  }}
                  sx={{
                    bgcolor: tier.highlighted ? 'rgba(0, 181, 168, 0.05)' : 'transparent',
                    pb: 1,
                  }}
                />
                
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography component="h3" variant="h3" fontWeight={800} color="#222">
                      {tier.price}
                      <Typography component="span" variant="h6" color="#666" fontWeight={400}>
                        {tier.period}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="#666" mt={1}>
                      {tier.description}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <List sx={{ mb: 3, flexGrow: 1 }}>
                    {tier.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: '36px' }}>
                          <CheckIcon sx={{ color: '#00b5a8' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          primaryTypographyProps={{ 
                            fontSize: '0.95rem',
                            color: '#444'
                          }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                  
                  <Button
                    variant={tier.highlighted ? 'contained' : 'outlined'}
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      mt: 'auto',
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: '8px',
                      textTransform: 'none',
                      bgcolor: tier.highlighted ? '#00b5a8' : 'transparent',
                      borderColor: tier.highlighted ? '#00b5a8' : '#00b5a8',
                      color: tier.highlighted ? 'white' : '#00b5a8',
                      '&:hover': {
                        bgcolor: tier.highlighted ? '#009b92' : 'rgba(0, 181, 168, 0.05)',
                        borderColor: '#00b5a8',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* Enterprise Section */}
        <Box 
          sx={{
            mt: 10,
            p: 5,
            borderRadius: '16px',
            bgcolor: 'rgba(108, 92, 231, 0.03)',
            border: '1px solid rgba(108, 92, 231, 0.1)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Box sx={{ maxWidth: { md: '70%' }}}>
            <Typography variant="h4" fontWeight={700} mb={2} color="#222">
              Need a custom solution?
            </Typography>
            <Typography variant="body1" color="#666">
              We offer tailored enterprise solutions for businesses with specific requirements. Our team will work with you to build a custom package that fits your exact needs.
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              bgcolor: '#6C5CE7',
              '&:hover': {
                bgcolor: '#5a49e3',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 20px rgba(108, 92, 231, 0.3)',
              },
            }}
          >
            Contact Our Sales Team
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Pricing; 