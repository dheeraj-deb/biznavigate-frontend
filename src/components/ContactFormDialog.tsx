import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Grid,
  Box,
  Typography,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface ContactFormDialogProps {
  open: boolean;
  onClose: () => void;
  formType: 'contact' | 'demo';
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    background: '#F8F7FF',
    fontSize: '0.9rem',
    '& fieldset': { borderColor: '#E5E7EB' },
    '&:hover fieldset': { borderColor: '#4E5FFD' },
    '&.Mui-focused fieldset': { borderColor: '#4E5FFD', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root': { color: '#9CA3AF', fontSize: '0.9rem' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#4E5FFD' },
  '& .MuiInputBase-input': { color: '#1A1A2E' },
  '& .MuiSelect-select': { color: '#1A1A2E' },
};

const FormTextField = React.memo(({
  name, label, value, onChange, required = false, type = 'text',
  multiline = false, rows = 1, placeholder = '', InputLabelProps = {},
}: {
  name: string; label: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; type?: string; multiline?: boolean; rows?: number;
  placeholder?: string; InputLabelProps?: Record<string, any>;
}) => (
  <TextField
    required={required} fullWidth label={label} name={name} type={type}
    value={value} onChange={onChange} variant="outlined"
    multiline={multiline} rows={rows} placeholder={placeholder}
    InputLabelProps={InputLabelProps} sx={fieldSx}
  />
));

const FormSelectField = React.memo(({
  name, label, value, onChange, options, required = false,
}: {
  name: string; label: string; value: string;
  onChange: (e: SelectChangeEvent) => void;
  options: string[]; required?: boolean;
}) => (
  <FormControl fullWidth required={required} sx={fieldSx}>
    <InputLabel id={`${name}-label`} sx={{ fontSize: '0.9rem' }}>{label}</InputLabel>
    <Select labelId={`${name}-label`} name={name} value={value} label={label} onChange={onChange}>
      {options.map(option => (
        <MenuItem key={option} value={option} sx={{ fontSize: '0.9rem' }}>{option}</MenuItem>
      ))}
    </Select>
  </FormControl>
));

const ContactFormDialog = ({ open, onClose, formType }: ContactFormDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDemo = formType === 'demo';

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.setAttribute('data-scroll-position', `0,${scrollY}`);
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.width = '';
      const pos = document.body.getAttribute('data-scroll-position');
      if (pos) {
        const [x, y] = pos.split(',').map(Number);
        window.scrollTo(x, y);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.width = '';
    };
  }, [open]);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', company: '',
    phone: '', jobTitle: '', industry: '', message: '',
    preferredDate: '', preferredTime: '',
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectChange = useCallback((e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      firstName: '', lastName: '', email: '', company: '', phone: '',
      jobTitle: '', industry: '', message: '', preferredDate: '', preferredTime: '',
    });
    onClose();
  }, [formData, onClose]);

  const industries = useMemo(() => [
    'Resorts & Hotels', 'Trips & Activities', 'Ecommerce & Retail',
    'Real Estate & Property', 'Food & Restaurants', 'Healthcare',
    'Education', 'Finance & Banking', 'Other',
  ], []);

  const times = useMemo(() => [
    '9:00 AM - 11:00 AM', '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM', '3:00 PM - 5:00 PM',
  ], []);

  const trustPoints = isDemo
    ? ['Personalised walkthrough for your industry', 'No commitment required', 'Setup in under 5 minutes']
    : ['We reply within a few hours', 'No spam, ever', 'Direct line to our team'];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="lg"
      scroll="paper"
      disableRestoreFocus
      aria-labelledby="contact-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: { xs: '16px', md: '24px' },
          boxShadow: '0 32px 80px rgba(78,95,253,0.18)',
          width: { xs: '95%', sm: '92%', md: '88%' },
          maxWidth: '960px',
          maxHeight: { xs: '92vh', md: '85vh' },
          m: { xs: 1, sm: 2, md: 'auto' },
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          background: 'transparent',
        }
      }}
    >
      {/* ── Left panel ── */}
      {!isMobile && (
        <Box sx={{
          width: '38%',
          flexShrink: 0,
          background: 'linear-gradient(160deg, #4E5FFD 0%, #7B3FE4 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 4,
        }}>
          {/* Background blobs */}
          <Box sx={{ position: 'absolute', top: '-20%', right: '-20%', width: '70%', height: '60%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <Box sx={{ position: 'absolute', bottom: '-15%', left: '-15%', width: '60%', height: '50%', background: 'radial-gradient(ellipse, rgba(255,107,107,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Top content */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{
              width: 52, height: 52, borderRadius: '14px',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mb: 3,
            }}>
              {isDemo
                ? <VideocamOutlinedIcon sx={{ fontSize: '1.6rem', color: '#fff' }} />
                : <EmailOutlinedIcon sx={{ fontSize: '1.6rem', color: '#fff' }} />
              }
            </Box>

            <Typography
              id="contact-dialog-title"
              sx={{ fontSize: '1.7rem', fontWeight: 700, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.02em', mb: 1.5 }}
            >
              {isDemo ? 'Schedule a Demo' : 'Get in Touch'}
            </Typography>

            <Typography sx={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.92rem', lineHeight: 1.65 }}>
              {isDemo
                ? 'See how BizNavigo automates your entire customer workflow — live, in real time.'
                : 'Have questions about our AI platform? Our team would love to help you out.'}
            </Typography>

            {/* Trust points */}
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {trustPoints.map((point, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircleOutlineIcon sx={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', flexShrink: 0 }} />
                  <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>{point}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Bottom content */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Response time badge */}
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 1.5,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '12px', p: 2,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              mb: 2,
            }}>
              <AccessTimeOutlinedIcon sx={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }} />
              <Box>
                <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1 }}>Average response time</Typography>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', mt: 0.25 }}>Under 3 hours</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LockOutlinedIcon sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }} />
              <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>
                Your data is private and never shared.
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* ── Right panel (form) ── */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', overflow: 'hidden', position: 'relative' }}>
        {/* Mobile header */}
        {isMobile && (
          <Box sx={{
            background: 'linear-gradient(135deg, #4E5FFD 0%, #7B3FE4 100%)',
            px: 3, py: 3, flexShrink: 0,
          }}>
            <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
              {isDemo ? 'Schedule a Demo' : 'Get in Touch'}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.85rem', mt: 0.5 }}>
              {isDemo ? 'See the platform live.' : 'We reply within a few hours.'}
            </Typography>
          </Box>
        )}

        {/* Close button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute', right: 14, top: 14, zIndex: 10,
            color: isMobile ? '#fff' : '#9CA3AF',
            background: isMobile ? 'rgba(255,255,255,0.15)' : '#F3F4F6',
            width: 34, height: 34,
            '&:hover': { background: isMobile ? 'rgba(255,255,255,0.25)' : '#E5E7EB', color: '#4E5FFD' },
          }}
        >
          <CloseIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
          {/* Form section label */}
          <Box sx={{ px: { xs: 3, md: 4 }, pt: { xs: 3, md: 4 }, pb: 0, flexShrink: 0 }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#4E5FFD', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {isDemo ? 'Book your session' : 'Send us a message'}
            </Typography>
          </Box>

          <DialogContent sx={{ px: { xs: 3, md: 4 }, pt: 2.5, pb: 2, overflowY: 'auto', flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormTextField required name="firstName" label="First name" value={formData.firstName} onChange={handleInputChange} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormTextField required name="lastName" label="Last name" value={formData.lastName} onChange={handleInputChange} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormTextField required name="email" label="Work email" type="email" value={formData.email} onChange={handleInputChange} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormTextField name="phone" label="Phone number" value={formData.phone} onChange={handleInputChange} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormTextField required name="company" label="Company name" value={formData.company} onChange={handleInputChange} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormTextField name="jobTitle" label="Job title" value={formData.jobTitle} onChange={handleInputChange} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormSelectField required name="industry" label="Industry" value={formData.industry} onChange={handleSelectChange} options={industries} />
              </Grid>

              {isDemo && (
                <>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormTextField
                      required name="preferredDate" label="Preferred date" type="date"
                      value={formData.preferredDate} onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormSelectField required name="preferredTime" label="Preferred time" value={formData.preferredTime} onChange={handleSelectChange} options={times} />
                  </Grid>
                </>
              )}

              <Grid size={{ xs: 12 }}>
                <FormTextField
                  name="message" label="Message (optional)" multiline rows={3}
                  value={formData.message} onChange={handleInputChange}
                  placeholder={isDemo
                    ? 'Tell us about your business and what you want to see...'
                    : 'How can we help you today?'}
                />
              </Grid>
            </Grid>
          </DialogContent>

          {/* Footer */}
          <Box sx={{
            px: { xs: 3, md: 4 }, py: 2.5,
            borderTop: '1px solid #F3F4F6',
            display: 'flex', alignItems: 'center', gap: 2,
            flexShrink: 0,
            background: '#ffffff',
          }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                px: 4, py: 1.4,
                fontWeight: 700,
                fontSize: '0.9rem',
                background: 'linear-gradient(135deg, #4E5FFD 0%, #7B3FE4 100%)',
                color: '#fff',
                borderRadius: '9999px',
                textTransform: 'none',
                boxShadow: '0 6px 20px rgba(78,95,253,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3A4AE8 0%, #6B2FD4 100%)',
                  boxShadow: '0 10px 28px rgba(78,95,253,0.4)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {isDemo ? 'Schedule Demo' : 'Send Message'}
            </Button>

            <Button
              onClick={onClose}
              size="large"
              sx={{
                px: 3, py: 1.4,
                fontWeight: 600,
                fontSize: '0.9rem',
                color: '#6B7280',
                borderRadius: '9999px',
                textTransform: 'none',
                border: '1.5px solid #E5E7EB',
                '&:hover': { borderColor: '#4E5FFD', color: '#4E5FFD', background: '#F8F7FF' },
                transition: 'all 0.2s ease',
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default React.memo(ContactFormDialog);
