import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Paper, Tab, Tabs, Card, CardContent, Avatar, Chip, useTheme, useMediaQuery } from '@mui/material';
import AutomationIcon from '@mui/icons-material/SmartToy';
import AnalyticsIcon from '@mui/icons-material/QueryStats';
import SupportIcon from '@mui/icons-material/SupportAgent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SpeedIcon from '@mui/icons-material/Speed';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PrecisionIcon from '@mui/icons-material/PrecisionManufacturing';
import StorageIcon from '@mui/icons-material/Storage';
import LanguageIcon from '@mui/icons-material/Translate';

// AI agent capabilities data
const aiCapabilities = [
  {
    id: 'orderProcessing',
    title: 'Order Processing',
    icon: <AutomationIcon sx={{ fontSize: '2rem' }} />,
    color: '#00B5A8',
    description: 'Automatically extract and process orders from WhatsApp messages and emails with high accuracy.',
    features: [
      'Intelligent message parsing from WhatsApp',
      'Email attachment and text extraction',
      'Product and quantity recognition',
      'Order validation and confirmation'
    ]
  },
  {
    id: 'integration',
    title: 'System Integration',
    icon: <StorageIcon sx={{ fontSize: '2rem' }} />,
    color: '#6C5CE7',
    description: 'Seamlessly connect with your CRM, inventory, and accounting systems to update records in real-time.',
    features: [
      'CRM data synchronization',
      'Inventory level updates',
      'Automated invoice generation',
      'Purchase order management'
    ]
  },
  {
    id: 'analytics',
    title: 'Business Intelligence',
    icon: <AnalyticsIcon sx={{ fontSize: '2rem' }} />,
    color: '#FF9F43',
    description: 'Gain valuable insights into ordering patterns, inventory needs, and customer behaviors.',
    features: [
      'Order volume and trend analysis',
      'Customer purchasing patterns',
      'Inventory optimization recommendations',
      'Sales performance metrics'
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Features',
    icon: <SupportIcon sx={{ fontSize: '2rem' }} />,
    color: '#FF5364',
    description: 'Process orders in multiple languages, voice formats, and provide comprehensive shipment tracking.',
    features: [
      'Multi-language order processing',
      'Voice order recognition and support',
      'Real-time shipment tracking integration',
      'Delivery status notifications'
    ]
  }
];

// Benefits data
const aiBenefits = [
  {
    icon: <SpeedIcon />,
    title: '85% Faster',
    description: 'Reduce order processing time from hours to minutes with automated digital capture'
  },
  {
    icon: <ScheduleIcon />,
    title: '98% Error Reduction',
    description: 'Eliminate manual data entry errors with AI-powered order recognition and validation'
  },
  {
    icon: <PrecisionIcon />,
    title: '35% Cost Savings',
    description: 'Lower operational costs by automating order management and inventory updates'
  },
  {
    icon: <LanguageIcon />,
    title: 'Multilingual Support',
    description: 'Process orders via voice recognition for maximum customer convenience'
  }
];

const AIAgents = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Auto-scroll tabs when changing selection
  useEffect(() => {
    if (tabsRef.current && isMobile) {
      const tabsContainer = tabsRef.current;
      const tabList = Array.from(tabsContainer.querySelectorAll('.MuiTab-root')) as HTMLElement[];
      
      // When the second tab (index 1) is selected, scroll to show tabs 2 and 3 (indexes 1 and 2)
      if (activeTab === 1 && tabList.length > 2) {
        // Calculate scroll position to show tabs 1 and 2 (hide tab 0)
        const firstTabWidth = tabList[0].offsetWidth;
        tabsContainer.scrollTo({
          left: firstTabWidth,
          behavior: 'smooth'
        });
      } 
      // For other tabs, center the active tab
      else if (activeTab > 1) {
        const selectedTab = tabList[activeTab];
        if (selectedTab) {
          const containerWidth = tabsContainer.clientWidth;
          const tabWidth = selectedTab.offsetWidth;
          const scrollPosition = selectedTab.offsetLeft - (containerWidth / 2) + (tabWidth / 2);
          
          tabsContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        }
      }
      // If first tab is selected, scroll to beginning
      else if (activeTab === 0) {
        tabsContainer.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab, isMobile]);

  return (
    <Box
      sx={{
        pt: { xs: 10, md: 16 },
        pb: { xs: 10, md: 16 },
        background: 'linear-gradient(135deg, #051937 0%, #004d7a 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Abstract geometric shapes in background */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '40%',
          height: '70%',
          background: 'radial-gradient(circle at center, rgba(108, 92, 231, 0.15) 0%, rgba(108, 92, 231, 0) 70%)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          zIndex: 1,
          animation: 'float 20s infinite alternate ease-in-out',
          '@keyframes float': {
            '0%': { transform: 'translate(0, 0) rotate(0deg)' },
            '50%': { transform: 'translate(2%, 5%) rotate(5deg)' },
            '100%': { transform: 'translate(-2%, -5%) rotate(-5deg)' }
          }
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '-10%',
          width: '50%',
          height: '60%',
          background: 'radial-gradient(circle at center, rgba(0, 181, 168, 0.15) 0%, rgba(0, 181, 168, 0) 70%)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          transform: 'rotate(-15deg)',
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            label="AI-POWERED AUTOMATION"
            sx={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#00B5A8',
              fontWeight: 600,
              mb: 2,
              borderRadius: '4px',
              px: 1,
            }}
          />
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              mb: 3,
              backgroundImage: 'linear-gradient(90deg, #ffffff, #e0e0e0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 5px 25px rgba(0, 0, 0, 0.2)',
            }}
          >
            Streamline Order Processing <br />
            with Intelligent Automation
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              maxWidth: '750px',
              mx: 'auto',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Our AI agents transform how wholesalers and distributors operate by automating
            order capture from WhatsApp and emails, with support for multiple languages, voice recognition,
            and integrated shipment tracking - all seamlessly connecting with your existing business systems.
          </Typography>
        </Box>

        {/* Tabbed Interface */}
        <Box sx={{ 
          mb: 8, 
          overflowX: 'auto', 
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          <Tabs
            variant="scrollable"
            allowScrollButtonsMobile
            scrollButtons={false}
            value={activeTab}
            onChange={handleTabChange}
            ref={tabsRef}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#00B5A8',
                height: 3,
              },
              '& .MuiTabs-flexContainer': {
                gap: { xs: 0, md: 2 },
              },
              '& .MuiTabs-scroller': {
                '&::-webkit-scrollbar': {
                  display: 'none'
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              },
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 600,
                fontSize: '1rem',
                px: 4,
                py: 2,
                minWidth: { xs: 120, md: 'auto' },
                whiteSpace: 'nowrap',
                '&.Mui-selected': {
                  color: '#00B5A8',
                },
              },
              mb: 4,
              width: '100%'
            }}
          >
            {aiCapabilities.map((capability) => (
              <Tab key={capability.id} label={capability.title} />
            ))}
          </Tabs>

          {/* Tab Panel Content */}
          <Box sx={{ position: 'relative' }}>
            {aiCapabilities.map((capability, index) => (
              <Box
                key={capability.id}
                sx={{
                  display: activeTab === index ? 'block' : 'none',
                  animation: activeTab === index ? 'fadeIn 0.5s ease-in-out' : 'none',
                  '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'translateY(10px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                  }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4,
                    alignItems: 'center',
                    p: { xs: 2, md: 5 },
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {/* Left side - description */}
                  <Box sx={{ width: { xs: '100%', md: '40%' }, textAlign: { xs: 'center', md: 'left' } }}>
                    <Avatar
                      sx={{
                        bgcolor: capability.color,
                        width: 60,
                        height: 60,
                        mb: 2,
                        mx: { xs: 'auto', md: '0' }
                      }}
                    >
                      {capability.icon}
                    </Avatar>
                    <Typography variant="h4" fontWeight={700} mb={2} sx={{ color: 'white' }}>
                      {capability.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.8)' }}>
                      {capability.description}
                    </Typography>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        backgroundColor: capability.color,
                        color: 'white',
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        borderRadius: '8px',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: capability.color,
                          opacity: 0.9,
                        }
                      }}
                    >
                      Learn how it works
                    </Button>
                  </Box>

                  {/* Right side - feature cards */}
                  <Box
                    sx={{
                      width: { xs: '100%', md: '60%' },
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 2,
                    }}
                  >
                    {capability.features.map((feature, idx) => (
                      <Card
                        key={idx}
                        sx={{
                          width: { xs: '100%', sm: 'calc(50% - 8px)' },
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          backdropFilter: 'blur(5px)',
                          color: 'white',
                          border: `1px solid ${capability.color}25`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: `0 10px 20px ${capability.color}15`,
                            borderColor: capability.color,
                          }
                        }}
                      >
                        <CardContent>
                          <Typography variant="body2" fontWeight={600}>
                            {feature}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Benefits Section */}
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight={700}
            mb={6}
            sx={{
              color: 'white',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 3,
                backgroundColor: '#00B5A8',
              }
            }}
          >
            Benefits of Order Automation
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              justifyContent: 'center'
            }}
          >
            {aiBenefits.map((benefit, index) => (
              <Card
                key={index}
                sx={{
                  width: { xs: '100%', md: '30%' },
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  textAlign: 'center',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  p: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  }
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      width: 70,
                      height: 70,
                      mx: 'auto',
                      mb: 2,
                      color: '#00B5A8'
                    }}
                  >
                    {benefit.icon}
                  </Avatar>
                  <Typography variant="h5" fontWeight={700} mb={1}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            mt: 10,
            textAlign: 'center',
            p: 4,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Typography variant="h4" fontWeight={700} mb={2}>
            Ready to Automate Your Order Process?
          </Typography>
          <Typography variant="body1" mb={4} sx={{ maxWidth: '700px', mx: 'auto', color: 'rgba(255, 255, 255, 0.8)' }}>
            Join leading wholesalers and distributors who've transformed their business with our AI-powered platform.
            Process orders in multiple languages, capture voice orders, and provide real-time shipment tracking for your customers.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#00B5A8',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#009b92',
                },
              }}
            >
              Schedule a Demo
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              See Success Stories
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AIAgents; 