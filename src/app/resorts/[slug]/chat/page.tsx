import type { Metadata } from 'next';
import { getResort, getResortSlugs } from '@/lib/publicApi';
import { ChatScreen } from '@/components/resorts/ChatScreen';
import { NotFoundState } from '@/components/smartpages/DetailSections';

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getResortSlugs()).map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  try {
    const property = await getResort(slug);
    return {
      title: `Ask ${property.name}`,
      // A chat box has nothing for search to index; the property page does.
      robots: { index: false, follow: true },
      alternates: { canonical: `/resorts/${property.slug}` },
    };
  } catch {
    return { title: 'Resort not found' };
  }
}

export default async function ChatPage({ params }: Params) {
  const { slug } = await params;
  try {
    const property = await getResort(slug);
    return (
      <ChatScreen
        phoneNumber={property.tenant?.gupshupSourceNumber ?? null}
        propertyName={property.name}
      />
    );
  } catch {
    return <NotFoundState message="Resort not found" />;
  }
}
