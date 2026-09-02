import type { Metadata } from 'next';
import TermsOfService from '@/views/TermsOfService';

export const metadata: Metadata = {
  title: 'Terms of Service — BizNavigo',
};

export default function TermsPage() {
  return <TermsOfService />;
}
