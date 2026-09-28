import type { BedType, MealPlan, PublicRoomType } from "./publicApi";

const BED_LABEL: Record<BedType, [string, string]> = {
  SINGLE: ["single bed", "single beds"],
  DOUBLE: ["double bed", "double beds"],
  QUEEN: ["queen bed", "queen beds"],
  KING: ["king bed", "king beds"],
  TWIN: ["twin bed", "twin beds"],
  BUNK: ["bunk bed", "bunk beds"],
  SOFA_BED: ["sofa bed", "sofa beds"],
  FLOOR_MATTRESS: ["floor mattress", "floor mattresses"],
};

/** [{KING,1},{SOFA_BED,1}] → "1 king bed · 1 sofa bed"; null when the owner never said. */
export function bedsLabel(beds: PublicRoomType["beds"]): string | null {
  const parts = (beds ?? [])
    .filter((b) => b.count > 0 && BED_LABEL[b.type])
    .map((b) => `${b.count} ${BED_LABEL[b.type][b.count === 1 ? 0 : 1]}`);
  return parts.length ? parts.join(" · ") : null;
}

/** What the nightly price includes, said the way a guest reads it. EP says nothing — "room only" is the default assumption. */
export function mealPlanLabel(plan: MealPlan | undefined): string | null {
  if (plan === "CP") return "Breakfast included";
  if (plan === "MAP") return "Breakfast + one meal included";
  if (plan === "AP") return "All meals included";
  return null;
}

/** "1 private bathroom", "2 bathrooms", "Shared bathroom"; null when unknown. */
export function bathroomLabel(room: Pick<PublicRoomType, "bathrooms" | "bathroomShared">): string | null {
  if (room.bathroomShared) return "Shared bathroom";
  if (room.bathrooms == null) return null;
  if (room.bathrooms === 0) return "No private bathroom";
  return room.bathrooms === 1 ? "1 private bathroom" : `${room.bathrooms} private bathrooms`;
}

export function sizeLabel(sqft: number | null | undefined): string | null {
  return sqft ? `${sqft.toLocaleString("en-IN")} sq ft` : null;
}
