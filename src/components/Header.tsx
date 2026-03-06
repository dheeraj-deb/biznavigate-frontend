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

const pages = [
  { name: 'PRODUCT', id: 'hero', scroll: true },
  { name: 'FEATURES', id: 'features', scroll: true },
  { name: 'AGENCY', id: 'agency', scroll: false, route: '/pricing' },
  { name: 'CONTACT', id: 'contact', scroll: false },
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
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    handleCloseNavMenu();
  };

  // Light tech SaaS theme text color
  const textColor = '#0A0A0A';

  return (
    <>
      <Slide appear={false} direction="down" in={visible}>
        <AppBar
          position="fixed"
          color="transparent"
          elevation={0}
          sx={{
            backdropFilter: scrolled ? "blur(20px)" : "none",
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
            borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
            pt: scrolled ? 0 : 2,
            pb: scrolled ? 0 : 0,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ py: 1 }}>
              {/* Logo */}
              <Box
                component={RouterLink}
                to="/"
                sx={{
                  mr: 4,
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  textDecoration: 'none',
                  gap: 0.5
                }}
              >
                <Box
                  component="img"
                  src="/logo.png"
                  alt="BizNavigo Logo"
                  sx={{ height: 60, width: 'auto', verticalAlign: 'middle', borderRadius: '4px' }}
                />
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1, ml: 0.5, position: 'relative', top: '-4px' }}>
                  BizNavigo
                </Typography>
              </Box>

              {/* Mobile menu */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton size="large" onClick={handleOpenNavMenu} sx={{ color: textColor }}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElNav}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: 'block', md: 'none' } }}
                  PaperProps={{ sx: { background: '#FFFFFF', color: '#0A0A0A', border: '1px solid #E0E0E0', borderRadius: '12px', mt: 2, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' } }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.name} onClick={() => page.name === 'CONTACT' ? (setContactDialogOpen(true), handleCloseNavMenu()) : scrollToSection(page.id)}>
                      <Typography textAlign="center" fontWeight={700} letterSpacing="0.1em">{page.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* Mobile logo */}
              <Box
                component={RouterLink}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  alignItems: 'center',
                  textDecoration: 'none',
                  gap: 0.25
                }}
              >
                <Box
                  component="img"
                  src="/logo.png"
                  alt="BizNavigo Logo"
                  sx={{ height: 50, width: 'auto', verticalAlign: 'middle', borderRadius: '4px' }}
                />
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1, ml: 0.5, position: 'relative', top: '-3px' }}>
                  BizNavigo
                </Typography>
              </Box>

              {/* Desktop navigation */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', mr: 4 }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => page.name === 'CONTACT' ? setContactDialogOpen(true) : scrollToSection(page.id)}
                    sx={{
                      mx: 2,
                      color: 'rgba(10, 10, 10, 0.65)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      position: 'relative',
                      padding: '4px 8px',
                      border: 'none',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '0%',
                        height: '2px',
                        backgroundColor: '#2563EB',
                        transition: 'width 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                      },
                      '&:hover': {
                        color: '#0A0A0A',
                        background: 'transparent',
                        border: 'none',
                        '&::after': { width: '100%' }
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>

              {/* Action button */}
              <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  onClick={() => setContactDialogOpen(true)}
                  sx={{
                    borderRadius: '50px',
                    borderColor: 'rgba(10, 10, 10, 0.1)',
                    color: '#0A0A0A',
                    padding: '8px 24px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 14px 0 rgba(0,0,0,0.05)',
                    '&:hover': { borderColor: '#2563EB', color: '#fff', background: '#2563EB', boxShadow: '0 6px 20px rgba(37,99,235,0.23)' }
                  }}
                  variant="outlined"
                >
                  START NOW
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>

      <ContactFormDialog open={contactDialogOpen} onClose={() => setContactDialogOpen(false)} formType="contact" />
    </>
  );
};

export default Header;
