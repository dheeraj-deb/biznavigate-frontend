import { API_BASE } from "./publicApi";

const STORAGE_KEY = "biznavigate.attribution";

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
