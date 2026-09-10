import type { Metadata } from 'next';
import { getIntentBySlug, getIntentSlugs } from '@/lib/publicApi';
import { IntentPageView } from '@/components/resorts/IntentPageView';
import { NotFoundState } from '@/components/smartpages/DetailSections';

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getIntentSlugs()).map((intentSlug) => ({ intentSlug }));
}

type Params = { params: Promise<{ intentSlug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { intentSlug } = await params;
  try {
    const intent = await getIntentBySlug(intentSlug);
    return {
      title: intent.title,
      description: intent.metaDescription,
      alternates: { canonical: `/resorts/intent/${intentSlug}` },
      openGraph: {
        title: intent.title,
        description: intent.metaDescription,
        images: intent.property.photos.slice(0, 3),
      },
    };
  } catch {
    return { title: 'Page not found' };
  }
}

export default async function IntentPage({ params }: Params) {
  const { intentSlug } = await params;
  try {
    const intent = await getIntentBySlug(intentSlug);
    return <IntentPageView intent={intent} />;
  } catch {
    return <NotFoundState message="Page not found" />;
  }
}
