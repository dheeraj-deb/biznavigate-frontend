import { Box, Container, Typography, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PrivacyPolicy = () => {
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
          Privacy Policy for BizNavigate
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 1,
            color: '#666',
            fontSize: '0.875rem'
          }}
        >
          <strong>Last Updated:</strong> December 10, 2025
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 6,
            color: '#666',
            fontSize: '0.875rem'
          }}
        >
          <strong>Effective Date:</strong> December 10, 2025
        </Typography>

        {/* 1. Introduction */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            1. Introduction
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            Welcome to BizNavigate ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our business automation and customer engagement platform.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            BizNavigate is operated in India and complies with the Digital Personal Data Protection Act, 2023 (DPDPA) and other applicable Indian laws.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            By using BizNavigate, you provide your consent to the collection and use of information in accordance with this policy.
          </Typography>
        </Box>

        {/* 2. About Us */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            2. About Us
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 0, mb: 2, listStyle: 'none' }}>
            <li><Typography variant="body1" sx={{ mb: 1 }}><strong>Company Name:</strong> BIZNAVIGATE TECHNOLOGIES PRIVATE LIMITED</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 1 }}><strong>Registered Address:</strong> C/O ERAMU P V, PALLIKKAL, VALIYAPUTHOOR HOUSE, TIRURANGADI, PUTHUR-PALLIKKAL, MALAPPURAM - 673636, KERALA, INDIA</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 1 }}><strong>Email:</strong> <Link href="mailto:privacy@biznavigate.in" color="primary">privacy@biznavigate.in</Link></Typography></li>
            <li><Typography variant="body1" sx={{ mb: 1 }}><strong>Support Email:</strong> <Link href="mailto:support@biznavigate.in" color="primary">support@biznavigate.in</Link></Typography></li>
            <li><Typography variant="body1" sx={{ mb: 1 }}><strong>Phone:</strong> +91-8075624909</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 1 }}><strong>Website:</strong> <Link href="https://www.biznavigate.in" color="primary">www.biznavigate.in</Link></Typography></li>
          </Box>
        </Box>

        {/* 3. Information We Collect */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            3. Information We Collect
          </Typography>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>3.1 Personal Data You Provide</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Account Information:</strong> Full name, email address, phone number (Indian mobile number), business name, and password</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Business Information:</strong> Business name, GSTIN (if applicable), business address, industry type, and operational data</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Payment Information:</strong> Billing address, GST details, and payment information (processed securely through Indian payment gateways like Razorpay, PayU, or similar)</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Communication Data:</strong> Messages, comments, inquiries, and interactions through our platform</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>KYC Information:</strong> Business registration documents, if required for verification</Typography></li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>3.2 Information Collected Automatically</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Usage Data:</strong> Features used, pages visited, time spent on platform, clicks, and user behavior</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers, and mobile network information</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Location Data:</strong> Geographic location based on IP address</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Cookies and Tracking:</strong> We use cookies and similar technologies (see Section 9)</Typography></li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>3.3 Information from Third-Party Services</Typography>
          <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>When you connect third-party services to BizNavigate, we collect:</Typography>

          <Typography variant="subtitle1" sx={{ mb: 1, mt: 2, fontWeight: 600, color: '#444' }}>Instagram Business Account Data:</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Business profile information (username, profile picture, bio, website)</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Messages and comments on your posts</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Media content (posts, stories, reels, IGTV)</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Follower counts and engagement metrics</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Direct messages and inbox conversations</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Insights and analytics data</Typography></li>
          </Box>

          <Typography variant="subtitle1" sx={{ mb: 1, mt: 2, fontWeight: 600, color: '#444' }}>WhatsApp Business Data:</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Business phone number and profile information</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Message templates and broadcast campaigns</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Customer conversations and chat history</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Message delivery status and read receipts</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Customer contact information</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Analytics and engagement metrics</Typography></li>
          </Box>

          <Typography variant="subtitle1" sx={{ mb: 1, mt: 2, fontWeight: 600, color: '#444' }}>Facebook Page Data:</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Page information and access tokens</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Post engagement and analytics</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Comments, messages, and interactions</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Page insights and metrics</Typography></li>
          </Box>
        </Box>

        {/* 4. How We Use Your Information */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            4. How We Use Your Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            We use your personal data for the following purposes:
          </Typography>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>4.1 Service Delivery (Performance of Contract)</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Providing and maintaining the BizNavigate platform</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Processing your account registration and managing your subscription</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Facilitating communication between you and your customers</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Managing Instagram, WhatsApp, and Facebook integrations</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Processing payments and generating invoices</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Providing customer support and responding to your queries</Typography></li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>4.2 Automation and Analytics (Legitimate Interest)</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Automating responses to customer inquiries</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Analyzing customer engagement and behavior patterns</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Generating business reports and insights</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Managing marketing campaigns and notifications</Typography></li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>4.3 Platform Improvement (Legitimate Interest)</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Improving our services and developing new features</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Personalizing your user experience</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Troubleshooting and fixing technical issues</Typography></li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>4.4 Communication (Consent)</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Sending service updates, announcements, and feature releases</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Sending promotional offers and marketing communications (with your explicit consent)</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Conducting surveys and feedback requests</Typography></li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>4.5 Legal Compliance and Security</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Complying with Indian laws and regulations</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Responding to legal processes and government requests</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Protecting against fraud, security threats, and unauthorized access</Typography></li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>4.6 GST and Tax Compliance</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Processing GST invoices and tax documentation</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Maintaining financial records as required under Indian tax laws</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Reporting to tax authorities as mandated</Typography></li>
          </Box>
        </Box>

        {/* 5. Legal Basis for Processing */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            5. Legal Basis for Processing (DPDPA Compliance)
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            Under the Digital Personal Data Protection Act, 2023, we process your data based on:
          </Typography>
          <Box component="ol" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li><Typography variant="body1" sx={{ mb: 1 }}><strong>Your Consent:</strong> When you create an account and agree to this Privacy Policy</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 1 }}><strong>Performance of Contract:</strong> To provide services you have subscribed to</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 1 }}><strong>Legal Obligation:</strong> To comply with Indian laws, tax regulations, and court orders</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 1 }}><strong>Legitimate Interest:</strong> To improve our services, prevent fraud, and ensure security</Typography></li>
          </Box>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            You may withdraw your consent at any time by contacting us or deleting your account.
          </Typography>
        </Box>

        {/* 6. Data Sharing and Disclosure */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            6. Data Sharing and Disclosure
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            We respect your privacy and do not sell, rent, or trade your personal information. We may share your data with:
          </Typography>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>6.1 Service Providers (Data Processors)</Typography>
          <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>We share data with trusted service providers who assist in operating our platform:</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Cloud Hosting:</strong> Amazon Web Services (AWS) India, Google Cloud India</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Payment Processors:</strong> Razorpay, PayU, Cashfree (RBI-approved payment gateways)</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>SMS Services:</strong> SMS gateway providers for OTP and notifications</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Analytics:</strong> Google Analytics, Mixpanel</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Communication Services:</strong> Twilio, Gupshup for WhatsApp Business API</Typography></li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>6.2 Third-Party Platforms</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Meta Platforms:</strong> Instagram and Facebook for social media integration</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>WhatsApp Business API:</strong> For WhatsApp messaging functionality</Typography></li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>6.3 Legal and Regulatory Authorities</Typography>
          <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>We may disclose your information when required by Indian law:</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Law enforcement agencies, courts, and government authorities</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Income Tax Department, GST authorities</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Reserve Bank of India (RBI) or other regulatory bodies</Typography></li>
          </Box>
        </Box>

        {/* 7. Data Storage and Security */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            7. Data Storage and Security
          </Typography>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>7.1 Data Storage Location</Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#666', lineHeight: 1.8 }}>
            Your data is primarily stored on servers located in India to comply with data localization requirements. Some data may be stored on servers outside India with adequate security measures and compliance with Indian laws.
          </Typography>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>7.2 Security Measures</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Encryption:</strong> All data is encrypted in transit using SSL/TLS (256-bit) and at rest using AES-256 encryption</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Access Controls:</strong> Role-based access control (RBAC) with multi-factor authentication (MFA)</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Network Security:</strong> Firewall protection, intrusion detection, and DDoS protection</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Monitoring:</strong> 24/7 security monitoring and logging of all access</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><strong>Regular Audits:</strong> Periodic security assessments, vulnerability scanning, and penetration testing</Typography></li>
          </Box>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>7.3 Data Retention</Typography>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Data Type</strong></TableCell>
                  <TableCell><strong>Retention Period</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Account information</TableCell>
                  <TableCell>While account is active + 3 years after closure</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Transaction records</TableCell>
                  <TableCell>7 years (as per Indian tax laws)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Chat and message data</TableCell>
                  <TableCell>While account is active + 1 year</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Usage logs and analytics</TableCell>
                  <TableCell>2 years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Customer support tickets</TableCell>
                  <TableCell>3 years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Marketing communications</TableCell>
                  <TableCell>Until you unsubscribe + 6 months</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: '#444' }}>When you delete your account:</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Personal data is deleted or anonymized within 30 days</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Financial records are retained for 7 years as required by Indian law</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Backup copies are permanently deleted within 90 days</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>You can request data deletion by emailing <Link href="mailto:privacy@biznavigate.in" color="primary">privacy@biznavigate.in</Link></Typography></li>
          </Box>
        </Box>

        {/* 8. Your Rights Under DPDPA 2023 */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            8. Your Rights Under DPDPA 2023
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            As a Data Principal under the Digital Personal Data Protection Act, 2023, you have the following rights:
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>8.1 Right to Access</Typography>
            <Box component="ul" sx={{ color: '#666', pl: 4 }}>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Request information about what personal data we hold about you</Typography></li>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Access your data through your account dashboard</Typography></li>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>8.2 Right to Correction</Typography>
            <Box component="ul" sx={{ color: '#666', pl: 4 }}>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Update or correct inaccurate or incomplete personal data</Typography></li>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Edit your profile and business information anytime</Typography></li>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>8.3 Right to Erasure (Right to be Forgotten)</Typography>
            <Box component="ul" sx={{ color: '#666', pl: 4 }}>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Request deletion of your personal data</Typography></li>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Delete your account and associated data</Typography></li>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Exceptions: Data required for legal compliance (e.g., tax records) will be retained</Typography></li>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>8.4 Right to Data Portability</Typography>
            <Box component="ul" sx={{ color: '#666', pl: 4 }}>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Request a copy of your data in a structured, machine-readable format (JSON, CSV)</Typography></li>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Transfer your data to another service provider</Typography></li>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>8.5 Right to Withdraw Consent</Typography>
            <Box component="ul" sx={{ color: '#666', pl: 4 }}>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Withdraw consent for marketing communications anytime</Typography></li>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Opt-out of non-essential data processing</Typography></li>
            </Box>
          </Box>

          <Box sx={{ mb: 3, bgcolor: '#f5f5f5', p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: '#222' }}>To exercise your rights:</Typography>
            <Box component="ul" sx={{ color: '#666', pl: 4, mb: 0 }}>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Email: <Link href="mailto:privacy@biznavigate.in" color="primary">privacy@biznavigate.in</Link></Typography></li>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Through your account settings</Typography></li>
              <li><Typography variant="body1" sx={{ mb: 0.5 }}>Contact our Grievance Officer (details below)</Typography></li>
            </Box>
            <Typography variant="body2" sx={{ mt: 2, color: '#666', fontStyle: 'italic' }}>
              We will respond to your requests within 15 days as mandated by DPDPA.
            </Typography>
          </Box>
        </Box>

        {/* 9. Cookies and Tracking */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            9. Cookies and Tracking Technologies
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>9.1 Types of Cookies</Typography>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Cookie Type</strong></TableCell>
                  <TableCell><strong>Purpose</strong></TableCell>
                  <TableCell><strong>Duration</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Essential Cookies</TableCell>
                  <TableCell>Required for login, security, and core functionality</TableCell>
                  <TableCell>Session</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Performance Cookies</TableCell>
                  <TableCell>Analytics and understanding usage patterns</TableCell>
                  <TableCell>1 year</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Functional Cookies</TableCell>
                  <TableCell>Remember your preferences and settings</TableCell>
                  <TableCell>1 year</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Marketing Cookies</TableCell>
                  <TableCell>Personalized ads and promotional content (with consent)</TableCell>
                  <TableCell>6 months</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>9.2 Managing Cookies</Typography>
          <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>You can control cookies through:</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Browser settings (Chrome, Firefox, Safari, Edge)</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Disabling cookies in your account preferences</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Using browser extensions like Privacy Badger</Typography></li>
          </Box>
          <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
            Note: Disabling essential cookies may affect platform functionality.
          </Typography>
        </Box>

        {/* 10. Third-Party Services */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            10. Third-Party Services and Links
          </Typography>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>10.1 Meta Platforms (Instagram & Facebook)</Typography>
          <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>Our integration with Meta platforms is governed by:</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><Link href="https://www.facebook.com/privacy/policy/" color="primary" target="_blank">Meta's Privacy Policy</Link></Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><Link href="https://help.instagram.com/581066165581870" color="primary" target="_blank">Instagram's Terms of Service</Link></Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><Link href="https://developers.facebook.com/terms/" color="primary" target="_blank">Facebook Platform Terms</Link></Typography></li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>10.2 WhatsApp Business API</Typography>
          <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>Our WhatsApp integration complies with:</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><Link href="https://www.whatsapp.com/legal/business-terms" color="primary" target="_blank">WhatsApp Business API Terms</Link></Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}><Link href="https://www.whatsapp.com/legal/privacy-policy" color="primary" target="_blank">WhatsApp Privacy Policy</Link></Typography></li>
          </Box>
          <Typography variant="body1" sx={{ mb: 3, color: '#666', lineHeight: 1.8 }}>
            We do not have access to personal WhatsApp messages that are end-to-end encrypted.
          </Typography>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>10.3 Payment Gateways</Typography>
          <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>We use RBI-approved payment processors:</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Razorpay: <Link href="https://razorpay.com/privacy/" color="primary" target="_blank">Privacy Policy</Link></Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>PayU: <Link href="https://payu.in/privacy-policy" color="primary" target="_blank">Privacy Policy</Link></Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Cashfree: <Link href="https://www.cashfree.com/privacy-policy/" color="primary" target="_blank">Privacy Policy</Link></Typography></li>
          </Box>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            We do not store your complete credit/debit card details or CVV numbers.
          </Typography>
        </Box>

        {/* 11. Children's Privacy */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            11. Children's Privacy
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            BizNavigate is a business platform not intended for individuals under 18 years of age. We do not knowingly collect personal data from children. If we discover that we have inadvertently collected data from a child, we will delete it immediately.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            Parents/guardians can contact us at <Link href="mailto:privacy@biznavigate.in" color="primary">privacy@biznavigate.in</Link> if they believe their child's data has been collected.
          </Typography>
        </Box>

        {/* 12. Compliance with Indian Laws */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            12. Compliance with Indian Laws
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            We comply with the following Indian regulations:
          </Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Digital Personal Data Protection Act, 2023 (DPDPA)</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Information Technology Act, 2000</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Information Technology Rules, 2011</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Goods and Services Tax (GST) Act</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Income Tax Act</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Consumer Protection Act, 2019</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>TRAI DND Regulations</Typography></li>
          </Box>
        </Box>

        {/* 13. Grievance Redressal */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            13. Grievance Redressal Mechanism
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            As mandated by DPDPA 2023 and IT Act 2000, we have appointed a Grievance Officer:
          </Typography>

          <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#222' }}>Grievance Officer</Typography>
            <Box component="ul" sx={{ color: '#666', pl: 0, mb: 0, listStyle: 'none' }}>
              <li><Typography variant="body1" sx={{ mb: 1 }}><strong>Designation:</strong> Data Protection & Grievance Officer</Typography></li>
              <li><Typography variant="body1" sx={{ mb: 1 }}><strong>Email:</strong> <Link href="mailto:grievance@biznavigate.in" color="primary">grievance@biznavigate.in</Link></Typography></li>
              <li><Typography variant="body1" sx={{ mb: 1 }}><strong>Phone:</strong> +91-8075624909</Typography></li>
            </Box>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>Response Timeline:</Typography>
          <Box component="ul" sx={{ color: '#666', pl: 4, mb: 3 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Acknowledgment: Within 24 hours of receiving complaint</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Resolution: Within 15 days of acknowledgment</Typography></li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222', fontSize: '1.1rem' }}>How to File a Complaint:</Typography>
          <Box component="ol" sx={{ color: '#666', pl: 4, mb: 2 }}>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Email <Link href="mailto:grievance@biznavigate.in" color="primary">grievance@biznavigate.in</Link> with details</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Include your account email and description of issue</Typography></li>
            <li><Typography variant="body1" sx={{ mb: 0.5 }}>Provide relevant screenshots or documentation</Typography></li>
          </Box>
        </Box>

        {/* 14. Contact Information */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#222', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            14. Contact Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.8 }}>
            For any questions, concerns, or requests regarding this Privacy Policy:
          </Typography>

          <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222' }}>Privacy Inquiries:</Typography>
            <Typography variant="body1" sx={{ mb: 2, color: '#666' }}>
              Email: <Link href="mailto:privacy@biznavigate.in" color="primary">privacy@biznavigate.in</Link>
            </Typography>

            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222' }}>Customer Support:</Typography>
            <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>
              Email: <Link href="mailto:support@biznavigate.in" color="primary">support@biznavigate.in</Link>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: '#666' }}>
              Phone: +91-8075624909
            </Typography>

            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222' }}>Registered Office:</Typography>
            <Typography variant="body1" sx={{ mb: 0, color: '#666' }}>
              BIZNAVIGATE TECHNOLOGIES PRIVATE LIMITED<br />
              C/O ERAMU P V, PALLIKKAL<br />
              VALIYAPUTHOOR HOUSE<br />
              TIRURANGADI, PUTHUR-PALLIKKAL<br />
              MALAPPURAM - 673636<br />
              KERALA, INDIA
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: '#666' }}>
              <strong>Business Hours:</strong> Monday to Saturday, 10:00 AM - 7:00 PM IST
            </Typography>
          </Box>
        </Box>

        {/* Summary */}
        <Box sx={{ mb: 5, bgcolor: '#f0f7ff', p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#222' }}>
            Summary for Quick Reference
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Aspect</strong></TableCell>
                  <TableCell><strong>Details</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>What we collect</TableCell>
                  <TableCell>Account info, business data, Instagram/WhatsApp data, payment info, usage data</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Why we collect</TableCell>
                  <TableCell>To provide services, improve platform, ensure security, comply with law</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>How we protect</TableCell>
                  <TableCell>Encryption (SSL/TLS, AES-256), access controls, regular audits, secure servers</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Data storage</TableCell>
                  <TableCell>Primarily in India; some data on international cloud servers (AWS/GCP)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Your rights</TableCell>
                  <TableCell>Access, correct, delete, port, withdraw consent, file grievances</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Retention</TableCell>
                  <TableCell>Active period + 1-7 years depending on data type and legal requirements</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Marketing</TableCell>
                  <TableCell>Only with consent; respects TRAI DND; easy unsubscribe</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payment security</TableCell>
                  <TableCell>RBI-approved gateways; we don't store card details</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Contact</TableCell>
                  <TableCell>privacy@biznavigate.in, grievance@biznavigate.in</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 3, p: 2, bgcolor: '#fff', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#222' }}>
              Your Data, Your Rights
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: '#666' }}>
              You have full control over your data. Access, correct, or delete it anytime.
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              <strong>Questions?</strong> Contact <Link href="mailto:privacy@biznavigate.in" color="primary">privacy@biznavigate.in</Link> or <Link href="mailto:grievance@biznavigate.in" color="primary">grievance@biznavigate.in</Link>
            </Typography>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ borderTop: '1px solid #ddd', pt: 4, mt: 4 }}>
          <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
            <strong>Governing Law:</strong> This Privacy Policy is governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Malappuram, Kerala, India.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
            <strong>Language:</strong> In case of any conflict between the English version and any translated version of this Privacy Policy, the English version shall prevail.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#666', fontStyle: 'italic' }}>
            This privacy policy is designed to comply with the Digital Personal Data Protection Act, 2023 (DPDPA), Information Technology Act, 2000, and other Indian regulations.
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            <strong>Last Reviewed:</strong> December 10, 2025<br />
            <strong>Version:</strong> 1.0
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
