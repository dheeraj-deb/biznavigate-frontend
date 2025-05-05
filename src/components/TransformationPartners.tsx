import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const TransformationPartners = () => {
  return (
    <Box
      sx={{
        py: 12,
        background: '#fff',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{
            fontWeight: 700,
            mb: 6,
            color: '#222',
          }}
        >
          AI transformation partners
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            alignItems: 'stretch',
            mx: -2 
          }}
        >
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 2, display: 'flex' }}>
            <Card
              sx={{
                backgroundColor: 'white',
                border: '1px solid #eaeaea',
                borderRadius: 2,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                p: 1,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: '#f4f7fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <AutoGraphIcon sx={{ fontSize: 30, color: '#00b5a8' }} />
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: '#222',
                  }}
                >
                  AI-Powered Analytics
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    lineHeight: 1.6,
                  }}
                >
                  Leverage advanced AI algorithms to analyze your sales data and identify patterns that drive business growth and customer retention.
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 2, display: 'flex' }}>
            <Card
              sx={{
                backgroundColor: 'white',
                border: '1px solid #eaeaea',
                borderRadius: 2,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                p: 1,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: '#f4f7fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <SettingsIcon sx={{ fontSize: 30, color: '#00b5a8' }} />
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: '#222',
                  }}
                >
                  Seamless Integration
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    lineHeight: 1.6,
                  }}
                >
                  Connect BizNavigate with your existing ERP, CRM, and payment systems to create a unified, automated business ecosystem without disruption.
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 2, display: 'flex' }}>
            <Card
              sx={{
                backgroundColor: 'white',
                border: '1px solid #eaeaea',
                borderRadius: 2,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                p: 1,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: '#f4f7fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <SupportAgentIcon sx={{ fontSize: 30, color: '#00b5a8' }} />
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: '#222',
                  }}
                >
                  24/7 Intelligent Support
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    lineHeight: 1.6,
                  }}
                >
                  Our AI-powered customer support system handles customer queries via WhatsApp around the clock, ensuring prompt resolution and satisfaction.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TransformationPartners; 