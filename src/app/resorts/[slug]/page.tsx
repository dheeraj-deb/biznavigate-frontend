import type { Metadata } from 'next';
import { getResort, getResortSlugs } from '@/lib/publicApi';
import { ResortDetailView } from '@/components/resorts/ResortDetailView';
import { NotFoundState } from '@/components/smartpages/DetailSections';
import { canonicalResortUrl } from '@/lib/custom-host';

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getResortSlugs()).map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  try {
    const property = await getResort(slug);
    const metaLocation = [property.city, property.region].filter(Boolean).join(', ');
    // The owner's own title and description (Brand screen) when set.
    const title = property.brand?.seoTitle ?? `${property.name} — Book Direct | ${metaLocation}`;
    const description =
      property.brand?.seoDescription ??
      property.description ??
      `Book ${property.propertyType ?? 'resort'} in ${metaLocation} directly via WhatsApp. Best price guaranteed.`;
    return {
      title,
      description,
      alternates: { canonical: canonicalResortUrl(property) },
      openGraph: {
        title,
        description,
        images: property.photos.slice(0, 3),
      },
    };
  } catch {
    return { title: 'Resort not found' };
  }
}

export default async function ResortDetailPage({ params }: Params) {
  const { slug } = await params;
  try {
    const property = await getResort(slug);
    return <ResortDetailView property={property} />;
  } catch {
    return <NotFoundState message="Resort not found" />;
  }
}
