import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Slide
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ContactFormDialog from './ContactFormDialog';

// Navigation links
const pages = [
  { name: 'Product', id: 'hero', scroll: true },
  { name: 'Features', id: 'solutions', scroll: true },
  { name: 'Pricing', id: 'pricing', scroll: false, route: '/pricing' },
  { name: 'Contact', id: 'contact', scroll: false },
];

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Show header when scrolling up or at the top
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
      
      // Change background when scrolled down
      setScrolled(currentScrollPos > 50);
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenContactDialog = () => {
    setContactDialogOpen(true);
  };

  const handleCloseContactDialog = () => {
    setContactDialogOpen(false);
  };
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    handleCloseNavMenu();
  };

  // Always use the solid background if not on the homepage
  const headerBackground = isHomePage 
    ? (scrolled ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : 'transparent')
    : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';

  return (
    <>
      <Slide appear={false} direction="down" in={visible}>
        <AppBar position="fixed" color="transparent" elevation={scrolled || !isHomePage ? 4 : 0} sx={{ 
          backdropFilter: scrolled || !isHomePage ? "blur(10px)" : "none",
          background: headerBackground,
          transition: 'all 0.3s ease-in-out',
          boxShadow: scrolled || !isHomePage ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
        }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ py: 1 }}>
              {/* Logo */}
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  mr: 4,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                Biznavigate
              </Typography>

              {/* Mobile menu */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{ color: 'white' }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => {
                    if (page.name === 'Pricing') {
                      return (
                        <MenuItem
                          key={page.name}
                          component={RouterLink}
                          to={page.route as string}
                          onClick={handleCloseNavMenu}
                        >
                          <Typography textAlign="center">{page.name}</Typography>
                        </MenuItem>
                      );
                    }
                    
                    return (
                      <MenuItem 
                        key={page.name} 
                        onClick={() => page.name === 'Contact' ? handleOpenContactDialog() : scrollToSection(page.id)}
                      >
                        <Typography textAlign="center">{page.name}</Typography>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Box>

              {/* Mobile logo */}
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                Biznavigate
              </Typography>

              {/* Desktop navigation */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                {pages.map((page) => {
                  if (page.name === 'Pricing') {
                    return (
                      <Button
                        key={page.name}
                        component={RouterLink}
                        to={page.route as string}
                        sx={{ 
                          mx: 1.5, 
                          color: 'rgba(255, 255, 255, 0.8)', 
                          display: 'flex', 
                          alignItems: 'center',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          '&:hover': {
                            color: '#00b5a8',
                            background: 'transparent',
                          },
                        }}
                      >
                        {page.name}
                      </Button>
                    );
                  }
                  
                  return (
                    <Button
                      key={page.name}
                      onClick={() => page.name === 'Contact' ? handleOpenContactDialog() : scrollToSection(page.id)}
                      sx={{ 
                        mx: 1.5, 
                        color: 'rgba(255, 255, 255, 0.8)', 
                        display: 'flex', 
                        alignItems: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        '&:hover': {
                          color: '#00b5a8',
                          background: 'transparent',
                        },
                      }}
                    >
                      {page.name}
                    </Button>
                  );
                })}
              </Box>

              {/* Contact Us button */}
              <Box sx={{ flexGrow: 0 }}>
                <Button 
                  variant="contained"
                  onClick={handleOpenContactDialog}
                  sx={{ 
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    borderRadius: '8px',
                    backgroundColor: '#00b5a8',
                    boxShadow: '0 10px 20px rgba(0, 181, 168, 0.3)',
                    '&:hover': {
                      backgroundColor: '#009b92',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 15px 30px rgba(0, 181, 168, 0.4)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  CONTACT US
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>

      {/* Contact Form Dialog */}
      <ContactFormDialog 
        open={contactDialogOpen} 
        onClose={handleCloseContactDialog} 
        formType="contact" 
      />
    </>
  );
};

export default Header; 