import PublicLayout from '@/layouts/PublicLayout';

// The listing and occasion pages keep the plain header/footer chrome; the
// property pages under [slug] bring their own app shell instead.
export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
