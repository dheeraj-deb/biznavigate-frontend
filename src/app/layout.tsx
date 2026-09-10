import type { Metadata, Viewport } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry';
import { marketingFontClass } from '@/lib/marketing-fonts';
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
    <html lang="en" className={marketingFontClass}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
