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
   * The cheaper way, when the room type takes extra beds: fewer rooms with
   * beds in them (three adults in one room for two, friends sharing one
   * room). Only sent when enough rooms are free for it.
   */
  extraBedOption?: {
    rooms: number;
    extraBeds: number;
    occupancySurcharge: number;
    extraBedCharge: number;
    totalPriceForParty: number;
  };
};

/** One way the party can stay in this room type, priced before tax. */
export type Arrangement = { rooms: number; extraBeds: number; total: number };

/** Separate rooms: free, enough of them, and big enough together. */
function standardBookable(a: Pick<PartyRoomsRow, "available" | "fitsParty" | "enoughRoomsAvailable">): boolean {
  if (!a.available) return false;
  // An API that predates group sizing sends no enoughRoomsAvailable; one room
  // holding the party is then the only way to book.
  if (a.enoughRoomsAvailable !== undefined) return a.enoughRoomsAvailable;
  return a.fitsParty !== false;
}

/**
 * Every way the party can book this room type, cheapest first: separate
 * rooms, and fewer rooms with extra beds when the room takes them. Empty when
 * there is none.
 */
export function arrangementsFor(a: PartyRoomsRow): Arrangement[] {
  const out: Arrangement[] = [];
  if (standardBookable(a)) {
    out.push({
      rooms: roomsForParty(a),
      extraBeds: 0,
      total: typeof a.totalPriceForParty === "number" ? a.totalPriceForParty : a.totalPrice + (a.occupancySurcharge ?? 0),
    });
  }
  const bed = a.extraBedOption;
  if (a.available && bed && bed.extraBeds > 0) {
    out.push({ rooms: bed.rooms, extraBeds: bed.extraBeds, total: bed.totalPriceForParty });
  }
  return out.sort((x, y) => x.total - y.total);
}

/** Free on these dates AND bookable by the party — in separate rooms or with extra beds. */
export function isBookable(a: Pick<PartyRoomsRow, "available" | "fitsParty" | "enoughRoomsAvailable" | "extraBedOption">): boolean {
  return standardBookable(a) || (a.available && !!a.extraBedOption && a.extraBedOption.extraBeds > 0);
}

/** Rooms the party books of this type: 1 unless the server sized it into more. */
export function roomsForParty(a: Pick<PartyRoomsRow, "roomsNeeded">): number {
  const n = Math.floor(Number(a.roomsNeeded));
  return Number.isFinite(n) && n > 1 ? n : 1;
}

/**
 * The stay as the guest will pay it before tax: every room, extra guests and
 * extra beds — for the cheaper way they can book, which is what a card leads
 * with.
 */
export function stayTotal(a: Pick<PartyRoomsRow, "totalPrice" | "occupancySurcharge" | "totalPriceForParty"> & Partial<PartyRoomsRow>): number {
  const lead = typeof a.available === "boolean" && typeof a.availableRooms === "number" ? arrangementsFor(a as PartyRoomsRow)[0] : undefined;
  if (lead) return lead.total;
  if (typeof a.totalPriceForParty === "number") return a.totalPriceForParty;
  return a.totalPrice + (a.occupancySurcharge ?? 0);
}

/**
 * The room count checkout opens at.
 *
 * `requested` is the `rooms` the WhatsApp link carried. It wins when it is a
 * count the party can actually book — never fewer rooms than the group needs
 * (the booking would be refused for capacity) and never more than are free.
 */
export function checkoutRoomCount(a: Pick<PartyRoomsRow, "roomsNeeded" | "availableRooms">, requested?: number | null): number {
  const needed = roomsForParty(a);
  const want = Math.floor(Number(requested));
  if (!Number.isFinite(want) || want <= needed) return needed;
  return Math.min(want, Math.max(needed, Math.floor(a.availableRooms) || 0));
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

/**
 * The arrangement checkout opens on.
 *
 * `requested` is what the WhatsApp link carried (`rooms`, `beds`), or what
 * the guest last picked. Extra beds win when they were asked for and are on
 * offer; a room count alone means separate rooms (at checkoutRoomCount's
 * count). With nothing asked, the cheaper way.
 */
export function checkoutArrangement(a: PartyRoomsRow, requested?: { rooms?: number | null; beds?: number | null }): Arrangement | null {
  const options = arrangementsFor(a);
  if (options.length === 0) return null;
  const withBeds = options.find((o) => o.extraBeds > 0);
  const separate = options.find((o) => o.extraBeds === 0);
  if (requested?.beds && requested.beds > 0 && withBeds) return withBeds;
  if (requested?.rooms && separate) {
    return { ...separate, rooms: checkoutRoomCount(a, requested.rooms) };
  }
  if (requested?.beds === 0 && separate) return separate;
  return options[0];
}

/** "1 room + 2 extra beds", "3 rooms for your group" — null for one plain room. */
export function arrangementLabel(a: Pick<Arrangement, "rooms" | "extraBeds">): string | null {
  if (a.extraBeds > 0) {
    return `${a.rooms} room${a.rooms === 1 ? "" : "s"} + ${a.extraBeds} extra bed${a.extraBeds === 1 ? "" : "s"}`;
  }
  return groupRoomsLabel(a.rooms);
}

/** The other way to stay, for "or ₹12,400 for 2 separate rooms". */
export function alternativeLabel(a: Pick<Arrangement, "rooms" | "extraBeds">): string {
  if (a.extraBeds > 0) return arrangementLabel(a) ?? "";
  return `${a.rooms} separate room${a.rooms === 1 ? "" : "s"}`;
}

/** The `beds` URL param: "2" → 2; null for anything that is not a sane count. */
export function parseBeds(raw: string | null): number | null {
  if (raw === null || raw === "") return null;
  const n = Number(raw);
  return Number.isInteger(n) && n >= 0 && n <= 20 ? n : null;
}

/** The extra-guest charge inside an arrangement's price — for "incl. ₹… for extra guests". */
export function surchargeFor(a: PartyRoomsRow, arr: Arrangement | undefined): number | undefined {
  return arr && arr.extraBeds > 0 ? (a.extraBedOption?.occupancySurcharge ?? 0) : a.occupancySurcharge;
}
