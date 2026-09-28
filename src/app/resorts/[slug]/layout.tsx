import { getResort } from '@/lib/publicApi';
import { ResortAppShell, type ShellProperty } from '@/components/resorts/shell/ResortAppShell';

export const revalidate = 300;

type Props = { children: React.ReactNode; params: Promise<{ slug: string }> };

// Same cached fetch every page under here already makes, so this adds no
// request — it only hands the app shell the few fields its chrome shows.
async function loadShellProperty(slug: string): Promise<ShellProperty> {
  try {
    const property = await getResort(slug);
    return {
      slug: property.slug,
      name: property.name,
      city: property.city,
      todayRate: property.todayRate,
      rooms: property.roomTypes.map((rt) => ({ id: rt.id, name: rt.name })),
    };
  } catch {
    // The page renders its own not-found state; the shell just stays neutral.
    return { slug, name: 'Resort', city: null, todayRate: 0, rooms: [] };
  }
}

export default async function ResortLayout({ children, params }: Props) {
  const { slug } = await params;
  const property = await loadShellProperty(slug);
  return <ResortAppShell property={property}>{children}</ResortAppShell>;
}
