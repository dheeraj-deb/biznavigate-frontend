import type { Metadata } from 'next';
import { getResorts } from '@/lib/publicApi';
import { ResortListView } from '@/components/resorts/ResortListView';
import { NotFoundState } from '@/components/smartpages/DetailSections';

export const metadata: Metadata = {
  title: 'Resorts & Stays — Book Direct on WhatsApp | BizNavigate',
  description:
    'Browse resorts, villas and homestays. Book directly with the property on WhatsApp — no middlemen, best price guaranteed.',
  alternates: { canonical: '/resorts' },
};

export const revalidate = 300;

export default async function ResortsPage() {
  try {
    const resorts = await getResorts();
    return <ResortListView resorts={resorts} />;
  } catch {
    return <NotFoundState message="Couldn't load resorts" />;
  }
}
