import type { Metadata } from 'next';
import { getResort, getResortSlugs } from '@/lib/publicApi';
import { PhotosView } from '@/components/resorts/PhotosView';
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
      title: `Photos — ${property.name}`,
      // Same photos the property page carries; that page is the one to rank.
      alternates: { canonical: `/resorts/${property.slug}` },
      openGraph: { images: property.photos.slice(0, 3) },
    };
  } catch {
    return { title: 'Resort not found' };
  }
}

export default async function PhotosPage({ params }: Params) {
  const { slug } = await params;
  try {
    const property = await getResort(slug);
    return <PhotosView property={property} />;
  } catch {
    return <NotFoundState message="Resort not found" />;
  }
}
