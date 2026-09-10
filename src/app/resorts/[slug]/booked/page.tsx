import type { Metadata } from 'next';
import { getResort, getResortSlugs } from '@/lib/publicApi';
import { BookedView } from '@/components/resorts/BookedView';

// Where Cashfree returns a guest after payment. They arrive in WhatsApp's
// in-app browser, so this page's whole job is to say what happened and hand
// them a way back to the thread.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getResortSlugs()).map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export default async function BookedPage({ params }: Params) {
  const { slug } = await params;
  let name = 'the property';
  try {
    name = (await getResort(slug)).name;
  } catch {
    // A missing or renamed property must not turn a successful payment into an
    // error screen — the status lookup carries the real name anyway.
  }
  return <BookedView propertyName={name} />;
}
