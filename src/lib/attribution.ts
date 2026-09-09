import { API_BASE } from "./publicApi";

const STORAGE_KEY = "biznavigate.attribution";
const REF_STORAGE_KEY = "biznavigate.ref";

// Matches biznavigo-backend ATTRIBUTION_WINDOW_DAYS. Kept here only to stop
// the client posting a code it already knows is dead — the server clamps and
// re-checks independently and is the actual authority.
const REF_WINDOW_DAYS = 30;

export type StoredRef = { code: string; firstSeenAt: string };

type StoredUtm = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  referrer?: string;
};

/**
 * Captures utm_* params from the current URL on first visit and remembers
 * them for the rest of the session, so a click on "Book on WhatsApp" three
 * pages later still carries the Google (or GBP post, or free booking link)
 * source that brought the guest here.
 */
export function captureUtmParams(): void {
  const params = new URLSearchParams(window.location.search);
  const utm: StoredUtm = {
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    utmContent: params.get("utm_content") ?? undefined,
    referrer: document.referrer || undefined,
  };
  // Only overwrite a stored value if this visit actually carries new utm
  // params — otherwise an internal navigation would wipe the original source.
  if (utm.utmSource || utm.utmMedium || utm.utmCampaign) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
    } catch {
      // sessionStorage unavailable (private mode etc.) — attribution is
      // best-effort, never block the page for it.
    }
  }
}

/**
 * Capture a creator/referral code from `?ref=` and remember it across the
 * visit, so a guest who lands on a creator's link, browses three rooms and
 * checks out an hour later still arrives at the form carrying it.
 *
 * localStorage, not sessionStorage: the attribution window is 30 days and a
 * guest who bookmarks the page, closes the tab and comes back tomorrow is the
 * ordinary case for a link posted to Instagram — sessionStorage would drop
 * her on the way, and it is the creator who would silently lose the credit.
 *
 * Last code wins, matching the server's own "last touch wins" tie-break: the
 * most recent link is the one that was in the guest's hand when she decided.
 * `firstSeenAt` is therefore first-seen for THAT code, re-stamped whenever the
 * code changes — not the first code ever seen on this device.
 */
export function captureReferralCode(): void {
  const code = new URLSearchParams(window.location.search).get("ref")?.trim();
  if (!code) return;
  // Bound it before it ever reaches storage or a request body: `ref` is
  // whatever was in the URL, and the server caps it at 64 chars anyway.
  const normalized = code.toUpperCase().slice(0, 64);
  try {
    // Re-landing on the SAME code keeps the original firstSeenAt — an internal
    // navigation that happens to preserve the query string must not roll the
    // clock forward on a touch the guest earned days ago.
    if (getStoredRef()?.code === normalized) return;
    const stored: StoredRef = {
      code: normalized,
      firstSeenAt: new Date().toISOString(),
    };
    localStorage.setItem(REF_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // localStorage unavailable (private mode, storage disabled). Attribution
    // is best-effort — never block the page for it.
  }
}

/**
 * The stored code, or null. Expired entries are dropped rather than returned:
 * posting a code the server would only reject wastes a lookup and puts a
 * misleading `?ref=` in the booking's evidence trail.
 */
export function getStoredRef(): StoredRef | null {
  try {
    const raw = localStorage.getItem(REF_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredRef>;
    if (!parsed?.code || !parsed.firstSeenAt) return null;
    const seen = Date.parse(parsed.firstSeenAt);
    if (!Number.isFinite(seen)) return null;
    if (Date.now() - seen > REF_WINDOW_DAYS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(REF_STORAGE_KEY);
      return null;
    }
    return { code: parsed.code, firstSeenAt: parsed.firstSeenAt };
  } catch {
    return null;
  }
}

function getStoredUtm(): StoredUtm {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredUtm) : {};
  } catch {
    return {};
  }
}

type TrackClickInput = {
  propertyId?: string;
  roomTypeId?: string;
  action: string;
};

/**
 * Fire-and-forget click log, called right before the guest is handed off to
 * WhatsApp. Uses sendBeacon so it survives the tab navigating away.
 */
export function trackListingClick({ propertyId, roomTypeId, action }: TrackClickInput): void {
  if (!propertyId) return;
  const utm = getStoredUtm();
  const payload = JSON.stringify({
    propertyId,
    roomTypeId,
    action,
    ...utm,
    path: window.location.pathname,
  });

  const url = `${API_BASE}/public/track`;
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
  } else {
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true }).catch(() => {});
  }
}
