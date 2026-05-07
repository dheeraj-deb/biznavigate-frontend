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
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ContactFormDialog from './ContactFormDialog';

const pages = [
  { name: 'Product', id: 'hero', scroll: true },
  { name: 'Features', id: 'features', scroll: true },
  { name: 'Agency', id: 'agency', scroll: false, route: '/pricing' },
  { name: 'Contact', id: 'contact', scroll: false },
];

const Header = () => {
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

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    handleCloseNavMenu();
  };

  return (
    <>
      <Slide appear={false} direction="down" in={visible}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.0)',
            borderBottom: scrolled ? '1px solid #F3F4F6' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ py: 1.5 }}>
              {/* Desktop Logo */}
              <Box
                component={RouterLink}
                to="/"
                sx={{ mr: 6, display: { xs: 'none', md: 'flex' }, alignItems: 'center', textDecoration: 'none', gap: 1 }}
              >
                <Box
                  component="img"
                  src="/logo.png"
                  alt="BizNavigo Logo"
                  sx={{ height: 40, width: 'auto', borderRadius: '8px' }}
                />
                <Typography sx={{ fontWeight: 700, color: '#1A1A2E', fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
                  BizNavigo
                </Typography>
              </Box>

              {/* Mobile menu */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton size="large" onClick={handleOpenNavMenu} sx={{ color: '#1A1A2E' }}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElNav}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: 'block', md: 'none' } }}
                  PaperProps={{
                    sx: {
                      background: '#ffffff',
                      color: '#1A1A2E',
                      border: '1px solid #F3F4F6',
                      borderRadius: '16px',
                      mt: 2,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    }
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.name}
                      onClick={() => page.name === 'Contact' ? (setContactDialogOpen(true), handleCloseNavMenu()) : scrollToSection(page.id)}
                      sx={{ py: 1.5 }}
                    >
                      <Typography fontWeight={500} fontSize="0.95rem">{page.name}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem sx={{ px: 2, py: 1 }}>
                    <Button
                      fullWidth
                      onClick={() => { setContactDialogOpen(true); handleCloseNavMenu(); }}
                      variant="contained"
                      sx={{ borderRadius: 9999, background: '#4E5FFD', color: '#fff', fontWeight: 600, py: 1 }}
                    >
                      Get Started
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>

              {/* Mobile Logo */}
              <Box
                component={RouterLink}
                to="/"
                sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, alignItems: 'center', textDecoration: 'none', gap: 0.75 }}
              >
                <Box component="img" src="/logo.png" alt="BizNavigo Logo" sx={{ height: 36, width: 'auto', borderRadius: '6px' }} />
                <Typography sx={{ fontWeight: 700, color: '#1A1A2E', fontSize: '1rem', letterSpacing: '-0.02em' }}>
                  BizNavigo
                </Typography>
              </Box>

              {/* Desktop Nav */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => page.name === 'Contact' ? setContactDialogOpen(true) : scrollToSection(page.id)}
                    sx={{
                      color: '#6B7280',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      borderRadius: 9999,
                      px: 2,
                      '&:hover': { color: '#1A1A2E', background: '#F8F7FF' },
                    }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>

              {/* Desktop CTA */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                <Button
                  onClick={() => setContactDialogOpen(true)}
                  variant="contained"
                  sx={{
                    borderRadius: 9999,
                    background: '#4E5FFD',
                    color: '#ffffff',
                    px: 3,
                    py: 1.25,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    boxShadow: 'none',
                    '&:hover': { background: '#3A4AE8', boxShadow: '0 4px 16px rgba(78,95,253,0.3)' },
                  }}
                >
                  Get Started
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
