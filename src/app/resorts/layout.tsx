import { GuestThemeRoot } from '@/layouts/PublicChrome';
import { guestFontClass } from '@/lib/guest-fonts';

export default function ResortsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={guestFontClass}>
      <GuestThemeRoot>{children}</GuestThemeRoot>
    </div>
  );
}
