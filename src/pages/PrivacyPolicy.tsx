import { Box, Container, Typography } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', color: '#222', py: 8 }}>
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
          Privacy Policy
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 6,
            color: '#666',
            fontSize: '0.875rem'
          }}
        >
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>

        {/* 1. Introduction */}
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
            1. Introduction
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
            Biznavigate, a company registered in India, operates the platform at biznvaigate.in (the "Service").
            This Privacy Policy explains how we collect, use, disclose, and safeguard personal data from individuals
            interacting via our platform, including business customers ("Merchants") and end-users of those merchants
            (via WhatsApp, Instagram, websites or mini-stores).
          </Typography>
        </Box>

        {/* 2. Applicability */}
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
            2. Applicability
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
            This Policy applies when you:
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Register as a merchant; or
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Interact with a merchant operating on our platform (via WhatsApp, Instagram, web chat, store links).
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
            It governs how we collect and process personal data in connection with the Service, and how data is
            shared with or processed through third-party tools (e.g., WhatsApp Business API, Instagram Graph API
            via Meta) and other vendors.
          </Typography>
        </Box>

        {/* 3. Categories of Data Collected */}
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
            3. Categories of Data Collected
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 1,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1rem', md: '1.125rem' }
            }}
          >
            Merchant Data
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Business name, address, email, contact number, GST/registration details
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Staff names, roles, contact numbers
              </Typography>
            </li>
          </Box>

          <Typography
            variant="h6"
            sx={{
              mb: 1,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1rem', md: '1.125rem' }
            }}
          >
            Customer/Lead Data
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Name, WhatsApp number, message/chat content, uploaded media (photos/videos)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Order/booking details (product/services, date/time, payment reference)
              </Typography>
            </li>
          </Box>

          <Typography
            variant="h6"
            sx={{
              mb: 1,
              fontWeight: 600,
              color: '#222',
              fontSize: { xs: '1rem', md: '1.125rem' }
            }}
          >
            Usage & System Data
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                IP-address, device/browser metadata, cookies, chat logs, campaign analytics
              </Typography>
            </li>
          </Box>
        </Box>

        {/* 4. How We Collect Data */}
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
            4. How We Collect Data
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Directly from merchant input (registration, uploads)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Via integrations: Instagram comments/DMs, WhatsApp messages, website chat widget
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                From payment & logistics partners (for order fulfilment)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Via tracking and analytics tools on websites or mini-store links
              </Typography>
            </li>
          </Box>
        </Box>

        {/* 5. Purposes of Processing */}
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
            5. Purposes of Processing
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                To provide the Service: store generation, chat/lead capture, booking/payment handling
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                To enable conversational commerce: AI chatbots, lead management, escalation workflows
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                To send notifications, confirmations, reminders via WhatsApp/SMS/email
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                To run campaigns and marketing (with consent) on behalf of merchants
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                To improve our platform and AI models (in aggregated/anonymised form)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                For legal, payment, fraud control and business management purposes
              </Typography>
            </li>
          </Box>
        </Box>

        {/* 6. Legal Basis & Indian Compliance */}
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
            6. Legal Basis & Indian Compliance
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
            We process data on bases including:
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Consent (when you register, connect WhatsApp/Instagram or message via WhatsApp)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Contractual necessity (to fulfil a booking/order you asked for)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Legitimate interest (improving service, analytics)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Legal obligation (accounting, audits, regulatory compliance)
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
            Compliance with India's Digital Personal Data Protection Act (DPDP Act, 2023), IT Act and
            associated rules is maintained.
          </Typography>
        </Box>

        {/* 7. Use of Meta Platforms & Tools */}
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
            7. Use of Meta Platforms & Tools
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                We integrate Meta's tools (WhatsApp Business, Instagram Graph API)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                We use user-initiated chat or valid opt-in before capturing phone numbers or sending messages
                beyond the 24-hour window.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                We disclose the categories of personal data shared with Meta and how it may be used for
                analytics/ads.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                We use approved message templates for proactive messages, and do not share "sensitive personal
                data" prohibited by Meta.
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
            You will see this in our privacy disclosures and tracking consent mechanisms (cookies/analytics).
          </Typography>
        </Box>

        {/* 8. Data Retention */}
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
            8. Data Retention
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Lead, chat and customer interaction data: retained for up to 12 months (unless otherwise required)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Transaction/order data: kept up to 7 years (for accounting/legal)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                AI logs/anonymised data: retained in aggregated form for improvement purposes
              </Typography>
            </li>
          </Box>
        </Box>

        {/* 9. Sharing & Disclosure */}
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
            9. Sharing & Disclosure
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
            We may share your data with:
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Service providers (hosting, payment gateways, BSPs for WhatsApp)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Logistics/courier partners (for delivery)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Meta Platforms (as part of its business tools)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Legal/regulatory bodies when required
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
            All shares are via contracts and in compliance with our data protection standards.
          </Typography>
        </Box>

        {/* 10. User Rights */}
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
            10. User Rights
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
            You have the right to:
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Access your personal data
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Correct inaccuracies
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Delete your data (subject to obligations)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Withdraw consent
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Object to processing in certain contexts
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
            For enquiries: <a href="mailto:privacy@biznavigate.in" style={{ color: '#5469d4', textDecoration: 'none' }}>privacy@biznavigate.in</a>
          </Typography>
        </Box>

        {/* 11. Cookies & Tracking */}
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
            11. Cookies & Tracking
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            We use cookies and similar technologies for authentication, analytics, ad-personalisation and
            operation. If you are in a jurisdiction requiring consent (like the EU), we display a cookie consent
            banner. Meta's cookies/pixel integrations are also disclosed.
          </Typography>
        </Box>

        {/* 12. Security */}
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
            12. Security
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            We implement reasonable technical and organisational measures (encryption, access controls, audit logs).
            However, no system is completely secure—please contact us if you identify risks.
          </Typography>
        </Box>

        {/* 13. Data Transfers */}
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
            13. Data Transfers
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            We may transfer data to service providers outside India (or host backups abroad). When we do,
            appropriate safeguards (such as SCCs) are used.
          </Typography>
        </Box>

        {/* 14. Minors */}
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
            14. Minors
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            Our Service is not directed at children under 16. If we discover we've collected personal data from
            a minor without valid consent, we will delete it.
          </Typography>
        </Box>

        {/* 15. Changes to Policy */}
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
            15. Changes to Policy
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            We may update this policy periodically. Changes will be posted on biznvaigate.in/privacy and effective
            from the "Last updated" date.
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
            If you have any questions or concerns about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
