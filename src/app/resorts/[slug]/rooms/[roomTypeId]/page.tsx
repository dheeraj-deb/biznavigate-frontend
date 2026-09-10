import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getResort, getResortSlugs } from '@/lib/publicApi';
import { RoomDetailView } from '@/components/resorts/RoomDetailView';
import { NotFoundState } from '@/components/smartpages/DetailSections';

export const revalidate = 300;

// One entry per (property, room type). Both lookups are cached fetches, so
// this costs the same requests the pages themselves would have made.
export async function generateStaticParams() {
  const slugs = await getResortSlugs();
  const perProperty = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const { roomTypes } = await getResort(slug);
        return roomTypes.map((rt) => ({ slug, roomTypeId: rt.id }));
      } catch {
        return [];
      }
    }),
  );
  return perProperty.flat();
}

type Params = { params: Promise<{ slug: string; roomTypeId: string }> };

async function loadRoom(slug: string, roomTypeId: string) {
  const property = await getResort(slug);
  const roomType = property.roomTypes.find((rt) => rt.id === roomTypeId);
  if (!roomType) return null;
  return { property, roomType };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, roomTypeId } = await params;
  try {
    const found = await loadRoom(slug, roomTypeId);
    if (!found) return { title: 'Room not found' };
    return {
      title: `${found.roomType.name} — ${found.property.name}`,
      description: found.roomType.description || undefined,
      openGraph: found.roomType.photos.length
        ? { images: found.roomType.photos.slice(0, 3) }
        : undefined,
    };
  } catch {
    return { title: 'Resort not found' };
  }
}

export default async function RoomDetailPage({ params }: Params) {
  const { slug, roomTypeId } = await params;
  let found: Awaited<ReturnType<typeof loadRoom>>;
  try {
    found = await loadRoom(slug, roomTypeId);
  } catch {
    return <NotFoundState message="Resort not found" />;
  }
  if (!found) notFound();
  return <RoomDetailView property={found.property} roomType={found.roomType} />;
}
