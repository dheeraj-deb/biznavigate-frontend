import type { Metadata } from 'next';
import { getResort } from '@/lib/publicApi';
import { BookingFlowView } from '@/components/resorts/BookingFlowView';
import { NotFoundState } from '@/components/smartpages/DetailSections';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  try {
    const property = await getResort(slug);
    return { title: `Book ${property.name} — BizNavigate` };
  } catch {
    return { title: 'Resort not found' };
  }
}

export default async function BookPage({ params }: Params) {
  const { slug } = await params;
  try {
    const property = await getResort(slug);
    return <BookingFlowView property={property} />;
  } catch {
    return <NotFoundState message="Resort not found" />;
  }
}
