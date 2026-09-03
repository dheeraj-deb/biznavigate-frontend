import PublicLayout from '@/layouts/PublicLayout';
import { guestFontClass } from '@/lib/guest-fonts';

export default function ResortsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={guestFontClass}>
      <PublicLayout>{children}</PublicLayout>
    </div>
  );
}
