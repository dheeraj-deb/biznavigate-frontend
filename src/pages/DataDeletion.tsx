import { Box, Container, Typography } from '@mui/material';

const DataDeletion = () => {
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
          Data Deletion & User Rights
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

        {/* Purpose */}
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
            Purpose
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            To comply with legal obligations and Meta Platform Terms regarding user data deletion, and to respect 
            user requests to erase data.
          </Typography>
        </Box>

        {/* Retention Periods */}
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
            Retention Periods
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                <strong>Lead/chat data:</strong> retained for up to 12 months post-interaction, then archived.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                <strong>Transaction/order data:</strong> retained for up to 7 years (for accounting).
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                <strong>Anonymised AI logs:</strong> retained for product improvement; personal identifiers removed 
                after 90 days.
              </Typography>
            </li>
          </Box>
        </Box>

        {/* Deletion on Request */}
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
            Deletion on Request
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
            If an End-User or Merchant requests deletion:
          </Typography>
          <Box component="ol" sx={{ color: '#666', pl: 4 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Verify requester identity.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Mark related personal data for deletion ("Deletion Pending").
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                We erase or anonymise data within 30 days of request (unless legal retention applies).
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Confirm deletion completion to requester via email/WhatsApp.
              </Typography>
            </li>
          </Box>
        </Box>

        {/* Data Subject Rights */}
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
            Data Subject Rights
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            Users may request: access, correction, deletion, restriction. Requests processed free of charge within 
            30 days.
          </Typography>
        </Box>

        {/* Integration & Meta Compliance */}
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
            Integration & Meta Compliance
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
            For WhatsApp/Instagram data captured either by our platform or merchant:
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Ensure deep link or redirection to capture number happens only after user consent.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                For active chats, if user opts out or requests deletion, we remove personal identifiers and 
                optionally retain anonymised logs.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                For data imported from Meta (comments, DMs), we cease processing and delete when required by Meta or user.
              </Typography>
            </li>
          </Box>
        </Box>

        {/* Export & Migration */}
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
            Export & Migration
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            Merchants may export their data (leads, orders, chats) in machine-readable format before deletion. 
            Export available for 90 days post termination.
          </Typography>
        </Box>

        {/* Meta Developer Compliance Addendum */}
        <Box
          sx={{
            my: 6,
            p: 4,
            bgcolor: '#f0f7ff',
            borderLeft: '4px solid #5469d4',
            borderRadius: 1
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: '#222',
              fontSize: { xs: '1.125rem', md: '1.25rem' }
            }}
          >
            Meta Developer Compliance Addendum
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            This Addendum supplements the main Terms regarding your use of Meta Platforms (Instagram Graph API, 
            WhatsApp Business API) via our Service.
          </Typography>
        </Box>

        {/* 3.1 Permitted Data Use */}
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
            3.1 Permitted Data Use
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
            You and we agree to use only data permitted by Meta's Platform Terms, including but not limited to:
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                User phone numbers, message content only when user initiates chat or opts in.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                No sharing or transferring of phone numbers from Meta to other platforms without explicit consent.
              </Typography>
            </li>
          </Box>
        </Box>

        {/* 3.2 Webhook & Retention Compliance */}
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
            3.2 Webhook & Retention Compliance
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                For Instagram comments/DMs: process data only as allowed, respond publicly or direct to DM as needed.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                For WhatsApp: only send messages within the 24-hour window or use Meta-approved templates.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Store webhook event data no longer than required for business use; anonymise or delete after retention period.
              </Typography>
            </li>
          </Box>
        </Box>

        {/* 3.3 Opt-in & User Redirects */}
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
            3.3 Opt-in & User Redirects
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                When a user transitions from Instagram or website to WhatsApp, clearly disclose the redirect and 
                the fact that the phone number will be captured.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Obtain explicit consent for proactive messages beyond the session window.
              </Typography>
            </li>
          </Box>
        </Box>

        {/* 3.4 Deletion & Scope of Rights */}
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
            3.4 Deletion & Scope of Rights
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                If a user requests deletion, data captured via Meta pipelines must be deleted or anonymised and 
                the event logged.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Maintain audit logs proving compliance.
              </Typography>
            </li>
          </Box>
        </Box>

        {/* 3.5 Review & Audit */}
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
            3.5 Review & Audit
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                We or Meta may audit use of WhatsApp/Instagram data at any time.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                You must maintain records of your opt-in procedures, message templates used, and user deletion 
                requests for at least 12 months.
              </Typography>
            </li>
          </Box>
        </Box>

        {/* 3.6 Consequences of Non-Compliance */}
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
            3.6 Consequences of Non-Compliance
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            Should any violation of Meta terms be found (e.g., unauthorized messaging or data harvesting), we may 
            suspend access to the Meta features for your account; you indemnify us for any losses or fines.
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
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            For questions on these policies or how we handle data via Meta integrations, contact:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: '#222',
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            Email: <a href="mailto:privacy@biznavigate.in" style={{ color: '#5469d4', textDecoration: 'none' }}>privacy@biznavigate.in</a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DataDeletion;
