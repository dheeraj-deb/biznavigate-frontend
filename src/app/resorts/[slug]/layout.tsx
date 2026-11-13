import type { Metadata, Viewport } from 'next';
import { getResort } from '@/lib/publicApi';
import { brandAccent, brandRootCss, type PublicBrand } from '@/lib/brand';
import { ResortAppShell, type ShellProperty } from '@/components/resorts/shell/ResortAppShell';

export const revalidate = 300;

type Props = { children: React.ReactNode; params: Promise<{ slug: string }> };
type Params = { params: Promise<{ slug: string }> };

// Same cached fetch every page under here already makes, so these add no
// request — they only hand the chrome the few fields it shows.
async function loadBrand(slug: string): Promise<PublicBrand> {
  try {
    return (await getResort(slug)).brand ?? {};
  } catch {
    return {};
  }
}

async function loadShellProperty(slug: string): Promise<ShellProperty> {
  try {
    const property = await getResort(slug);
    return {
      slug: property.slug,
      name: property.name,
      city: property.city,
      todayRate: property.todayRate,
      rooms: property.roomTypes.map((rt) => ({ id: rt.id, name: rt.name })),
      logoUrl: property.brand?.logoUrl ?? null,
    };
  } catch {
    // The page renders its own not-found state; the shell just stays neutral.
    return { slug, name: 'Resort', city: null, todayRate: 0, rooms: [], logoUrl: null };
  }
}

/** The resort's own browser-tab icon on every page of the visit. Pages set
 *  their own title and description; layout and page metadata merge. */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const brand = await loadBrand(slug);
  return brand.faviconUrl ? { icons: { icon: brand.faviconUrl, apple: brand.faviconUrl } } : {};
}

/** The phone's browser bar in the resort's colour. */
export async function generateViewport({ params }: Params): Promise<Viewport> {
  const { slug } = await params;
  const accent = brandAccent((await loadBrand(slug)).color);
  return accent ? { themeColor: accent.accent } : {};
}

export default async function ResortLayout({ children, params }: Props) {
  const { slug } = await params;
  const [property, brand] = await Promise.all([loadShellProperty(slug), loadBrand(slug)]);
  // Built only from a parsed hex colour (lib/brand.ts), never owner text.
  const brandCss = brandRootCss(brand.color);
  return (
    <>
      {brandCss && <style dangerouslySetInnerHTML={{ __html: brandCss }} />}
      <ResortAppShell property={property}>{children}</ResortAppShell>
    </>
  );
}
