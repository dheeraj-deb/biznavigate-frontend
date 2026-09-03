import type { Metadata, Viewport } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#184ABB',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_PUBLIC_BASE_URL ?? 'https://www.biznavigo.com'),
  title: 'BizNavigo — Direct bookings on autopilot for resorts',
  description:
    'An AI agent that captures and converts guests across WhatsApp, your website, and Google — into one inbox, one calendar, one CRM. Built for resorts and stays in India.',
  manifest: '/manifest.json',
  icons: {
    apple: '/logo192.png',
  },
  openGraph: {
    siteName: 'BizNavigate',
    title: 'BizNavigate — Direct bookings on autopilot for resorts',
    description: 'Book resorts and stays directly on WhatsApp — no middlemen, best price guaranteed.',
    type: 'website',
    images: ['/logo192.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@400;450;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
