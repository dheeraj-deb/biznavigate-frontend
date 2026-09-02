import type { Metadata } from 'next';
import PrivacyPolicy from '@/views/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy — BizNavigo',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
