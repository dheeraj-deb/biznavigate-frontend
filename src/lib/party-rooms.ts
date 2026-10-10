/**
 * A party bigger than one room, on the booking page.
 *
 * The WhatsApp agent sizes a group into several rooms of one type ("Garden
 * Deluxe Room ₹18,600 for 1 night — 3 rooms for your party") and sends a link
 * here. This page used to know only "one room fits, or it is too small", so
 * that link opened on every card reading "Too small" and no way to book. The
 * server now sizes the party with the same helper the agent quotes from and
 * returns `roomsNeeded`; these functions are the page's only reading of it.
 *
 * No imports on purpose: it is plain arithmetic over the availability row, and
 * `node --test` runs it straight from source (tests/party-rooms.test.mjs).
 */

/** The fields of an availability row this module reads. */
export type PartyRoomsRow = {
  available: boolean;
  availableRooms: number;
  totalPrice: number;
  occupancySurcharge?: number;
  /** False when ONE room of this type cannot hold the party. */
  fitsParty?: boolean;
  /** Rooms of this type the party needs — 1 when one room holds it. */
  roomsNeeded?: number;
  /** Free, enough of them left, and splittable — the party can book this. */
  enoughRoomsAvailable?: boolean;
  /** roomsNeeded rooms plus the extra heads they don't cover, before tax. */
  totalPriceForParty?: number;
  /**
   * When the party needs several rooms of this type but ONE room with extra
   * beds holds it: how many beds, and that stay before tax. The WhatsApp
   * agent offers the same option (audit F11: a family of four was only ever
   * quoted two rooms).
   */
  oneRoomWithExtraBeds?: { extraBeds: number; totalPriceForParty: number };
};

type BookableFields = Pick<PartyRoomsRow, "available" | "fitsParty" | "enoughRoomsAvailable">;

/** Bookable in roomsNeeded rooms of this type, without extra beds. */
export function bookableInRooms(a: BookableFields): boolean {
  if (!a.available) return false;
  // An API that predates group sizing sends no enoughRoomsAvailable; one room
  // holding the party is then the only way to book.
  if (a.enoughRoomsAvailable !== undefined) return a.enoughRoomsAvailable;
  return a.fitsParty !== false;
}

/** Free on these dates AND bookable by the party — in one room, several, or
 *  one with extra beds. */
export function isBookable(a: BookableFields & Pick<PartyRoomsRow, "oneRoomWithExtraBeds">): boolean {
  return bookableInRooms(a) || (a.available && a.oneRoomWithExtraBeds != null);
}

/**
 * The extra beds this stay is booked with: 0 for the several-room stay.
 *
 * One room with beds when that is the only way the party fits, or when the
 * link asked for it (`beds`, from the WhatsApp card that offered it) and not
 * for several rooms. Otherwise the several-room stay, as before beds existed —
 * with the bed option offered beside it.
 */
export function extraBedsFor(
  a: Pick<PartyRoomsRow, "available" | "fitsParty" | "enoughRoomsAvailable" | "oneRoomWithExtraBeds">,
  requested: { beds?: number | null; rooms?: number | null } = {},
): number {
  const alt = a.oneRoomWithExtraBeds;
  if (!alt) return 0;
  if (!bookableInRooms(a)) return alt.extraBeds;
  if (requested.rooms != null && requested.rooms > 1) return 0;
  return requested.beds != null && requested.beds > 0 ? alt.extraBeds : 0;
}

/** Rooms the party books of this type: 1 with extra beds, else 1 unless the
 *  server sized it into more. */
export function roomsForParty(a: Pick<PartyRoomsRow, "roomsNeeded">, extraBeds = 0): number {
  if (extraBeds > 0) return 1;
  const n = Math.floor(Number(a.roomsNeeded));
  return Number.isFinite(n) && n > 1 ? n : 1;
}

/** The stay as the guest will pay it before tax: every room, plus extra guests
 *  — or the one room with its extra beds. */
export function stayTotal(
  a: Pick<PartyRoomsRow, "totalPrice" | "occupancySurcharge" | "totalPriceForParty" | "oneRoomWithExtraBeds">,
  extraBeds = 0,
): number {
  if (extraBeds > 0 && a.oneRoomWithExtraBeds) return a.oneRoomWithExtraBeds.totalPriceForParty;
  if (typeof a.totalPriceForParty === "number") return a.totalPriceForParty;
  return a.totalPrice + (a.occupancySurcharge ?? 0);
}

/**
 * The room count checkout opens at.
 *
 * `requested` is the `rooms` the WhatsApp link carried. It wins when it is a
 * count the party can actually book — never fewer rooms than the group needs
 * (the booking would be refused for capacity) and never more than are free.
 * One room with extra beds is one room.
 */
export function checkoutRoomCount(
  a: Pick<PartyRoomsRow, "roomsNeeded" | "availableRooms">,
  requested?: number | null,
  extraBeds = 0,
): number {
  if (extraBeds > 0) return 1;
  const needed = roomsForParty(a);
  const want = Math.floor(Number(requested));
  if (!Number.isFinite(want) || want <= needed) return needed;
  return Math.min(want, Math.max(needed, Math.floor(a.availableRooms) || 0));
}

/** "1 room + 1 extra bed". */
export function extraBedsLabel(extraBeds: number): string {
  return `1 room + ${extraBeds} extra bed${extraBeds === 1 ? "" : "s"}`;
}

/** The `beds` URL param: "1" → 1; null for anything that is not a sane count. */
export function parseBeds(raw: string | null): number | null {
  if (!raw) return null;
  const n = Number(raw);
  return Number.isInteger(n) && n >= 1 && n <= 10 ? n : null;
}

/** "3 rooms for your group" — null for one room, where saying so is noise. */
export function groupRoomsLabel(rooms: number): string | null {
  return rooms > 1 ? `${rooms} rooms for your group` : null;
}

/** Free, but fewer rooms left than the group needs — not the same as too small. */
export function tooFewRoomsLeft(a: PartyRoomsRow): boolean {
  return a.available && !isBookable(a) && roomsForParty(a) > 1 && a.availableRooms < roomsForParty(a);
}

/** The `rooms` URL param: "3" → 3; null for anything that is not a sane room count. */
export function parseRooms(raw: string | null): number | null {
  if (!raw) return null;
  const n = Number(raw);
  return Number.isInteger(n) && n >= 1 && n <= 50 ? n : null;
}
