import { Box, Container, Typography } from '@mui/material';

const TermsOfService = () => {
  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', color: '#222', py: 20 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Terms of Service
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 6,
            color: '#666',
            fontSize: '0.875rem'
          }}
        >
          Last updated: 10 November 2025
        </Typography>

        {/* 1.1 Introduction */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.1 Introduction
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            These Terms of Service ("Terms") govern your use of the services operated by biznvaigate, an Indian
            private limited company. When you register as a merchant or use our platform (the "Service"), you accept
            these Terms and our Privacy Policy.
          </Typography>
        </Box>

        {/* 1.2 Definitions */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.2 Definitions
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                <strong>Merchant:</strong> a business user who subscribes to or uses the Service.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                <strong>End-User/Customer:</strong> any individual interacting with Merchants via chats, orders, or minisites.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                <strong>Platform:</strong> our software-as-a-service, including micro-store builder, AI chat, WhatsApp/Instagram integration, campaign tools.
              </Typography>
            </li>
          </Box>
        </Box>

        {/* 1.3 Eligibility */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.3 Eligibility
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            You must be a business entity or duly authorised to act on behalf of one (for Merchants). End-users must be 16 years or older.
          </Typography>
        </Box>

        {/* 1.4 Service Use & Access */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.4 Service Use & Access
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            We grant you a non-exclusive, non-transferable right to use the Service as per your subscription plan.
            You agree to provide accurate data and keep credentials secure.
          </Typography>
        </Box>

        {/* 1.5 Permitted Content & Conduct */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.5 Permitted Content & Conduct
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            You will not:
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Use the Service to send unwanted communications (spam) or violate WhatsApp/Instagram policies;
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Process sensitive personal data of End-Users without explicit consent;
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Reverse engineer or misuse the API integrations.
              </Typography>
            </li>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            Failure may result in account suspension or termination.
          </Typography>
        </Box>

        {/* 1.6 Subscriptions & Payment */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.6 Subscriptions & Payment
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            Subscription plans are billed monthly/annually. Payments due are non-refundable unless required by law.
            We may change pricing with 30-days' notice.
          </Typography>
        </Box>

        {/* 1.7 Data & Permissions */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.7 Data & Permissions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            You are responsible for obtaining all necessary consents from End-Users when capturing data via WhatsApp,
            Instagram or other integrations. You grant us a licence to use aggregate, anonymised data for product improvement.
          </Typography>
        </Box>

        {/* 1.8 Intellectual Property */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.8 Intellectual Property
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            All rights (software, trademarks, documentation) are owned by us. You own your data. You may export your
            data at termination by requesting within 30 days, after which we may delete it per retention policy.
          </Typography>
        </Box>

        {/* 1.9 Term, Termination & Suspension */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.9 Term, Termination & Suspension
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            These Terms commence when you accept them. Either party may terminate by providing notice. On termination,
            your access stops; we may delete your data after 90 days if you don't request export.
          </Typography>
        </Box>

        {/* 1.10 Limitation of Liability */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.10 Limitation of Liability
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            To the maximum extent permitted by law, our liability is capped to the amount paid by you in the last
            12 months; we are not liable for indirect or consequential losses.
          </Typography>
        </Box>

        {/* 1.11 Indemnity */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.11 Indemnity
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            You agree to indemnify us for claims arising from your misuse of the Service or breach of policies (including Meta's).
          </Typography>
        </Box>

        {/* 1.12 Amendments */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.12 Amendments
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            We may amend these Terms with 30-day notice. Continued use constitutes acceptance.
          </Typography>
        </Box>

        {/* 1.13 Governing Law & Dispute Resolution */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.13 Governing Law & Dispute Resolution
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            These Terms are governed by Indian law (e.g., laws of [State]). Disputes will be resolved in [City] courts.
          </Typography>
        </Box>

        {/* 1.14 Miscellaneous */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            1.14 Miscellaneous
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            If any part of these Terms is invalid, the rest remain in force.
          </Typography>
        </Box>

        {/* Contact Section */}
        <Box
          sx={{
            mt: 8,
            p: 4,
            bgcolor: '#f9f9f9',
            borderRadius: 2,
            border: '1px solid #e0e0e0'
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1.125rem', md: '1.25rem' }
            }}
          >
            Questions?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            If you have any questions about these Terms, please contact us at:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: '#222',
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            Email: <a href="mailto:legal@biznavigate.in" style={{ color: '#5469d4', textDecoration: 'none' }}>legal@biznavigate.in</a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TermsOfService;
