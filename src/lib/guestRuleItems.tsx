import React from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import BadgeOutlined from "@mui/icons-material/BadgeOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import PublicOutlined from "@mui/icons-material/PublicOutlined";
import LocalBarOutlined from "@mui/icons-material/LocalBarOutlined";
import NoDrinksOutlined from "@mui/icons-material/NoDrinksOutlined";
import RestaurantOutlined from "@mui/icons-material/RestaurantOutlined";
import NoFoodOutlined from "@mui/icons-material/NoFoodOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import CelebrationOutlined from "@mui/icons-material/CelebrationOutlined";
import DoNotDisturbAltOutlined from "@mui/icons-material/DoNotDisturbAltOutlined";
import SmokingRoomsOutlined from "@mui/icons-material/SmokingRoomsOutlined";
import SmokeFreeOutlined from "@mui/icons-material/SmokeFreeOutlined";
import NightsStayOutlined from "@mui/icons-material/NightsStayOutlined";
import type { GuestRules } from "./publicApi";

export type GuestRuleItem = {
  key: string;
  Icon: React.ComponentType<SvgIconProps>;
  label: string;
  detail?: string;
  /** A "no" — styled a shade quieter so a list of rules doesn't read as a list of refusals. */
  restrictive?: boolean;
};

const ID_LABEL: Record<NonNullable<GuestRules["idProofs"]>[number], string> = {
  aadhaar: "Aadhaar",
  passport: "passport",
  driving_licence: "driving licence",
  voter_id: "voter ID",
};

function spokenTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}

function joinOr(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} or ${items[items.length - 1]}`;
}

/**
 * Property.guestRules as short guest-facing lines, in the order a guest
 * checks them (who can stay → what to bring → what's allowed). Mirrors the
 * backend's describeGuestRules (src/properties/guest-rules.ts), which words
 * the same choices for the agent; early/late check-in are left out here
 * because the check-in/out tiles show them. `smokingAllowed` answers only
 * when the three-way `smoking` rule is unset.
 */
export function guestRuleItems(rules: GuestRules | undefined, smokingAllowed?: boolean): GuestRuleItem[] {
  const r = rules ?? {};
  const out: GuestRuleItem[] = [];

  if (r.unmarriedCouples === "yes") out.push({ key: "couples", Icon: FavoriteBorderOutlined, label: "Unmarried couples welcome" });
  if (r.unmarriedCouples === "no")
    out.push({ key: "couples", Icon: FavoriteBorderOutlined, label: "Unmarried couples not accommodated", restrictive: true });

  if (r.minCheckInAge) out.push({ key: "age", Icon: PersonOutlined, label: `Primary guest must be ${r.minCheckInAge}+` });

  if (r.idProofs?.length)
    out.push({
      key: "id",
      Icon: BadgeOutlined,
      label: "Photo ID at check-in",
      detail: joinOr(r.idProofs.map((p) => ID_LABEL[p])).replace(/^./, (c) => c.toUpperCase()),
    });

  if (r.localId === "yes") out.push({ key: "local", Icon: PlaceOutlined, label: "Local IDs accepted" });
  if (r.localId === "no")
    out.push({
      key: "local",
      Icon: PlaceOutlined,
      label: "Local IDs not accepted",
      detail: "Guests whose ID address is in this city can't check in",
      restrictive: true,
    });

  if (r.foreignNationals === "yes")
    out.push({ key: "foreign", Icon: PublicOutlined, label: "Foreign nationals welcome", detail: "Passport and valid visa required" });
  if (r.foreignNationals === "no")
    out.push({ key: "foreign", Icon: PublicOutlined, label: "Foreign nationals can't be accommodated", restrictive: true });

  if (r.alcohol === "yes") out.push({ key: "alcohol", Icon: LocalBarOutlined, label: "Alcohol allowed", detail: "You're welcome to bring your own" });
  if (r.alcohol === "bar_only")
    out.push({ key: "alcohol", Icon: LocalBarOutlined, label: "Alcohol at the bar only", detail: "Outside alcohol isn't allowed" });
  if (r.alcohol === "no") out.push({ key: "alcohol", Icon: NoDrinksOutlined, label: "No alcohol", restrictive: true });

  if (r.outsideFood === "yes") out.push({ key: "food", Icon: RestaurantOutlined, label: "Outside food allowed" });
  if (r.outsideFood === "no") out.push({ key: "food", Icon: NoFoodOutlined, label: "No outside food", restrictive: true });

  if (r.visitors === "yes") out.push({ key: "visitors", Icon: GroupsOutlined, label: "Visitors welcome" });
  if (r.visitors === "day_only")
    out.push({ key: "visitors", Icon: GroupsOutlined, label: "Day visitors only", detail: "Visitors can't stay overnight" });
  if (r.visitors === "no") out.push({ key: "visitors", Icon: GroupsOutlined, label: "No visitors", restrictive: true });

  if (r.parties === "yes")
    out.push({ key: "parties", Icon: CelebrationOutlined, label: "Parties & celebrations allowed", detail: "Arrange with the property in advance" });
  if (r.parties === "no") out.push({ key: "parties", Icon: DoNotDisturbAltOutlined, label: "No parties or events", restrictive: true });

  const smoking = r.smoking ?? (smokingAllowed === true ? "yes" : smokingAllowed === false ? "no" : undefined);
  if (smoking === "yes") out.push({ key: "smoking", Icon: SmokingRoomsOutlined, label: "Smoking allowed" });
  if (smoking === "designated")
    out.push({ key: "smoking", Icon: SmokingRoomsOutlined, label: "Smoking in designated areas only", detail: "Not inside rooms" });
  if (smoking === "no") out.push({ key: "smoking", Icon: SmokeFreeOutlined, label: "No smoking", restrictive: true });

  if (r.quietHoursFrom) out.push({ key: "quiet", Icon: NightsStayOutlined, label: `Quiet hours from ${spokenTime(r.quietHoursFrom)}` });

  return out;
}

/** The line under a check-in / check-out time, from guestRules.earlyCheckIn / lateCheckOut. */
export function flexibilityNote(
  value: GuestRules["earlyCheckIn"] | GuestRules["lateCheckOut"],
  which: "Early check-in" | "Late check-out",
): string | null {
  if (value === "free_if_available") return `${which} free if available`;
  if (value === "charged") return `${which} for a fee, if available`;
  if (value === "no") return `No ${which.toLowerCase()}`;
  return null;
}
