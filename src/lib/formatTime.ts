/** "14:00" → "2:00 PM". Anything unparseable is shown as the owner typed it. */
export function formatTime(value: string | null | undefined): string | null {
  if (!value) return null;
  const m = /^(\d{1,2}):(\d{2})/.exec(value);
  if (!m) return value;
  const h = Number(m[1]);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${m[2]} ${suffix}`;
}
