import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
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
  Divider,
  Paper,
  Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import VideocamIcon from '@mui/icons-material/Videocam';
import { alpha } from '@mui/material/styles';

interface ContactFormDialogProps {
  open: boolean;
  onClose: () => void;
  formType: 'contact' | 'demo';
}

// Memoized form field component to prevent re-renders
const FormTextField = React.memo(({ 
  name, 
  label, 
  value, 
  onChange, 
  required = false, 
  type = 'text', 
  multiline = false, 
  rows = 1,
  placeholder = '',
  fullWidth = true,
  InputLabelProps = {},
  sx = {}
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  fullWidth?: boolean;
  InputLabelProps?: Record<string, any>;
  sx?: any;
}) => {
  return (
    <TextField
      required={required}
      fullWidth={fullWidth}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      variant="outlined"
      multiline={multiline}
      rows={rows}
      placeholder={placeholder}
      InputLabelProps={InputLabelProps}
      sx={sx}
    />
  );
});

// Memoized select field component
const FormSelectField = React.memo(({
  name,
  label,
  value,
  onChange,
  options,
  required = false,
  sx = {}
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: SelectChangeEvent) => void;
  options: string[];
  required?: boolean;
  sx?: any;
}) => {
  return (
    <FormControl fullWidth required={required} sx={sx}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

const ContactFormDialog = ({ open, onClose, formType }: ContactFormDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  // Prevent background scrolling when dialog is open
  useEffect(() => {
    const handleBodyScrollLock = () => {
      if (open) {
        // Get current scroll position
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        
        // Store the current scroll position as a data attribute
        document.body.setAttribute('data-scroll-position', `${scrollX},${scrollY}`);
        
        // Add styles to body to prevent scrolling
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.body.style.width = '100%';
      } else {
        // Restore scrolling
        document.body.style.overflow = '';
        document.body.style.height = '';
        document.body.style.width = '';
        
        // Get stored scroll position
        const scrollPos = document.body.getAttribute('data-scroll-position');
        if (scrollPos) {
          const [scrollX, scrollY] = scrollPos.split(',').map(Number);
          window.scrollTo(scrollX, scrollY);
        }
      }
    };
    
    handleBodyScrollLock();
    
    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.width = '';
    };
  }, [open]);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    jobTitle: '',
    industry: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
  });

  // Memoize handle input change for better performance
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Memoize handle select change for better performance
  const handleSelectChange = useCallback((e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would add your form submission logic
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
      jobTitle: '',
      industry: '',
      message: '',
      preferredDate: '',
      preferredTime: '',
    });
    // Close dialog
    onClose();
  }, [formData, onClose]);

  // Memoize arrays to prevent rerenders
  const industries = useMemo(() => [
    'Healthcare',
    'Finance & Banking',
    'Manufacturing',
    'Retail',
    'Technology',
    'Education',
    'Government',
    'Energy & Utilities',
    'Transportation',
    'Other'
  ], []);

  const times = useMemo(() => [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM'
  ], []);

  // Memoize styles to prevent recalculation on every render
  const textFieldStyleMemo = useMemo(() => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.2)',
      },
      '&:hover fieldset': {
        borderColor: alpha('#00b5a8', 0.5),
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00b5a8',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(0, 0, 0, 0.7)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#00b5a8',
    },
    '& .MuiInputBase-input': {
      color: '#333',
    },
  }), []);

  // Memoize select styles
  const selectFieldStyleMemo = useMemo(() => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.2)',
      },
      '&:hover fieldset': {
        borderColor: alpha('#00b5a8', 0.5),
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00b5a8',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(0, 0, 0, 0.7)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#00b5a8',
    },
    '& .MuiSelect-select': {
      color: '#333',
    },
  }), []);

  // Memoize message text field style
  const messageTextFieldStyle = useMemo(() => ({
    ...textFieldStyleMemo,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      '&:hover fieldset': {
        borderColor: alpha('#00b5a8', 0.5),
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00b5a8',
      },
    },
  }), [textFieldStyleMemo]);

  // Memoize dialog content to prevent unnecessary rerenders
  const renderDialogContent = useMemo(() => (
    <DialogContent 
      sx={{ 
        py: 5, 
        px: { xs: 3, md: 5 },
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        overflow: 'auto',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Subtle background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.02,
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
        }}
      />
      
      <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            required
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            sx={textFieldStyleMemo}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            required
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            sx={textFieldStyleMemo}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            required
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            sx={textFieldStyleMemo}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            sx={textFieldStyleMemo}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            required
            name="company"
            label="Company"
            value={formData.company}
            onChange={handleInputChange}
            sx={textFieldStyleMemo}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            name="jobTitle"
            label="Job Title"
            value={formData.jobTitle}
            onChange={handleInputChange}
            sx={textFieldStyleMemo}
          />
        </Grid>
        <Grid size={12}>
          <FormSelectField
            required
            name="industry"
            label="Industry"
            value={formData.industry}
            onChange={handleSelectChange}
            options={industries}
            sx={selectFieldStyleMemo}
          />
        </Grid>
        
        {formType === 'demo' && (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormTextField
                required
                name="preferredDate"
                label="Preferred Date"
                type="date"
                value={formData.preferredDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={textFieldStyleMemo}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormSelectField
                required
                name="preferredTime"
                label="Preferred Time"
                value={formData.preferredTime}
                onChange={handleSelectChange}
                options={times}
                sx={selectFieldStyleMemo}
              />
            </Grid>
          </>
        )}
        
        <Grid size={12}>
          <FormTextField
            name="message"
            label="Message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            placeholder={formType === 'contact' 
              ? "How can we help you with order automation today?" 
              : "Tell us about your business needs for the demo"}
            sx={messageTextFieldStyle}
          />
        </Grid>
      </Grid>
    </DialogContent>
  ), [formData, formType, handleInputChange, handleSelectChange, industries, messageTextFieldStyle, selectFieldStyleMemo, textFieldStyleMemo, times]);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      scroll="paper"
      disableRestoreFocus
      aria-labelledby="contact-dialog-title"
      aria-describedby="contact-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: { xs: '12px', md: '16px' },
          boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
          width: { xs: '95%', sm: '90%', md: '80%' },
          maxWidth: '900px',
          maxHeight: { xs: '90vh', md: '80vh' },
          m: { xs: 1, sm: 2, md: 'auto' },
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(to bottom, #ffffff, #f9faff)',
        }
      }}
    >
      {/* Header Section with Gradient Background */}
      <Box sx={{ 
        position: 'relative',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        px: { xs: 3, md: 5 },
        py: { xs: 4, md: 5 },
        flexShrink: 0,
      }}>
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '30%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(0, 181, 168, 0.15) 0%, rgba(0, 181, 168, 0) 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            zIndex: 0,
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '30%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(108, 92, 231, 0.15) 0%, rgba(108, 92, 231, 0) 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            zIndex: 0,
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.1)', 
              width: 60, 
              height: 60,
              backdropFilter: 'blur(8px)',
              color: formType === 'contact' ? '#00b5a8' : '#6C5CE7',
            }}
          >
            {formType === 'contact' ? <EmailIcon sx={{ fontSize: 30 }} /> : <VideocamIcon sx={{ fontSize: 30 }} />}
          </Avatar>
          
          <Box>
            <DialogTitle 
              id="contact-dialog-title"
              sx={{ 
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                fontWeight: 800,
                p: 0,
                lineHeight: 1.2,
                backgroundImage: 'linear-gradient(90deg, #ffffff, #e0e0e0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {formType === 'contact' ? 'Get in Touch' : 'Schedule a Demo'}
            </DialogTitle>
            
            <Typography 
              id="contact-dialog-description" 
              variant="body1" 
              sx={{ 
                mt: 1, 
                color: 'rgba(255,255,255,0.8)', 
                maxWidth: '550px' 
              }}
            >
              {formType === 'contact' 
                ? 'Have questions about our AI order automation? We\'d love to hear from you.' 
                : 'See our AI-powered platform in action with a personalized demo tailored to your business.'}
            </Typography>
          </Box>
        </Box>
        
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.2)',
            },
            zIndex: 2,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
        {renderDialogContent}
        
        <Divider sx={{ opacity: 0.1 }} />
        
        <DialogActions sx={{ 
          px: { xs: 3, md: 5 }, 
          py: 3, 
          justifyContent: { xs: 'center', sm: 'flex-start' },
          flexWrap: 'wrap',
          gap: 2,
          background: 'linear-gradient(to top, rgba(249, 250, 251, 0.8), transparent)',
          flexShrink: 0,
        }}>
          <Button 
            type="submit"
            variant="contained" 
            size="large"
            sx={{
              px: { xs: 3, sm: 5 },
              py: 1.5,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              fontWeight: 600,
              background: 'linear-gradient(90deg, #00b5a8, #00a99d)',
              color: 'white',
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: '0 10px 20px rgba(0, 181, 168, 0.3)',
              '&:hover': {
                background: 'linear-gradient(90deg, #00c2b3, #00b5a8)',
                transform: 'translateY(-2px)',
                boxShadow: '0 15px 30px rgba(0, 181, 168, 0.4)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            {formType === 'contact' ? 'Send Message' : 'Schedule Demo'}
          </Button>
          <Button 
            onClick={onClose} 
            variant="outlined"
            size="large"
            sx={{ 
              px: { xs: 3, sm: 4 },
              py: 1.5,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              fontWeight: 600,
              color: '#64748b',
              borderColor: 'rgba(100, 116, 139, 0.2)',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#94a3b8',
                backgroundColor: 'rgba(148, 163, 184, 0.05)',
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default React.memo(ContactFormDialog); 