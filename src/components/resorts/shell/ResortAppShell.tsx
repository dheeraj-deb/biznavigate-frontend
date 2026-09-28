"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSelectedLayoutSegments } from "next/navigation";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import IosShareIcon from "@mui/icons-material/IosShare";
import { sp } from "@/components/smartpages/tokens";
import { PublicFooter, PublicHeader } from "@/layouts/PublicChrome";
import { useBookingFlowHref, useSearchParamsSnapshot } from "@/lib/booking-flow-url";
import { GuestChatProvider } from "./GuestChatProvider";
import { MobileTabBar, type ShellTab } from "./MobileTabBar";
import { MobileTopBar } from "./MobileTopBar";
import { shareResort } from "./share";
import {
  HERO_REVEAL_OFFSET,
  TAB_BAR_HEIGHT,
  canGoBackInApp,
  consumeArrival,
  isMobileViewport,
  noteNavigation,
  notePopState,
  useKeyboardOpen,
} from "./mobile";

/** What the chrome needs about the property — kept small, since the layout
 *  serialises it into every page of the visit. */
export type ShellProperty = {
  slug: string;
  name: string;
  city: string | null;
  todayRate: number;
  rooms: { id: string; name: string }[];
};

type Screen = "stay" | "photos" | "chat" | "book" | "booked" | "room" | "other";

function screenFor(segments: string[]): Screen {
  const [first] = segments;
  if (!first) return "stay";
  if (first === "photos" || first === "chat" || first === "book" || first === "booked") return first;
  if (first === "rooms") return "room";
  return "other";
}

/**
 * The property's pages as one app on phones: a top bar that names the screen
 * and a bottom bar of Stay · Photos · Chat · [Book]. Desktop keeps the plain
 * header and footer. Lives in the [slug] layout, which Next keeps mounted
 * across these pages — so the bar never reloads and the chat thread (held in
 * GuestChatProvider) survives every tab switch.
 *
 * Checkout (/book) and the post-payment page (/booked) are tasks, not places:
 * they get no tab bar, and /book draws its own header with a back arrow.
 */
export function ResortAppShell({ property, children }: { property: ShellProperty; children: React.ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const screen = screenFor(segments);
  const router = useRouter();
  const buildHref = useBookingFlowHref();
  const keyboardOpen = useKeyboardOpen();
  const pathname = usePathname();
  const search = useSearchParamsSnapshot().toString();
  const base = `/resorts/${property.slug}`;

  useEffect(() => {
    noteNavigation();
  }, [pathname, search]);

  useEffect(() => {
    window.addEventListener("popstate", notePopState);
    return () => window.removeEventListener("popstate", notePopState);
  }, []);

  const tab: ShellTab | null = screen === "stay" || screen === "photos" || screen === "chat" ? screen : null;
  const showTabBar = tab !== null && !keyboardOpen;

  // The WhatsApp agent sends #gallery and #rooms links to browse. On a phone
  // those are now their own screens — Photos, and the Book flow's room list.
  useEffect(() => {
    // Runs after the landing page's own mount effects, so whichever screen
    // the guest arrived on has had its one chance to act on the arrival.
    consumeArrival();
    if (screen !== "stay" || !isMobileViewport()) return;
    // The live query string, not buildHref: this runs on mount, when the
    // hook's snapshot is still the server's empty one and would drop `s`.
    const { hash, search } = window.location;
    if (hash === "#gallery") router.replace(`${base}/photos${search}`);
    else if (hash === "#rooms") router.replace(`${base}/book${search}`);
    // Mount only: a hash the guest scrolls to later is not a redirect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function backFromRoom() {
    // Back to wherever they opened the room from (Stay or the Book flow's
    // list) — unless they landed here straight from a link.
    if (canGoBackInApp()) router.back();
    else router.push(buildHref(base));
  }

  let topBar: React.ReactNode = null;
  if (screen === "stay") {
    topBar = (
      <MobileTopBar
        title={property.name}
        subtitle={property.city ?? undefined}
        revealAfter={HERO_REVEAL_OFFSET}
        actions={
          <IconButton aria-label="Share" onClick={() => void shareResort(property.slug, property.name)} sx={{ width: 48, height: 48, color: sp.ink }}>
            <IosShareIcon sx={{ fontSize: 22 }} />
          </IconButton>
        }
      />
    );
  } else if (screen === "photos") {
    topBar = <MobileTopBar title="Photos" subtitle={property.name} />;
  } else if (screen === "chat") {
    topBar = <MobileTopBar title={property.name} subtitle="Ask about rooms, food, directions" />;
  } else if (screen === "room") {
    const room = property.rooms.find((r) => r.id === segments[1]);
    topBar = <MobileTopBar title={room?.name ?? "Room"} subtitle={property.name} onBack={backFromRoom} />;
  }

  return (
    <GuestChatProvider slug={property.slug}>
      <Box
        sx={{
          display: "flex",
          minHeight: "100dvh",
          flexDirection: "column",
          bgcolor: "#fff",
          // Clears the fixed tab bar — on the whole column, so Stay's footer
          // is not left underneath it.
          pb: tab ? { xs: `calc(${TAB_BAR_HEIGHT}px + env(safe-area-inset-bottom))`, sm: 0 } : 0,
        }}
      >
        <PublicHeader hideOnMobile />
        {topBar}
        <Box component="main" sx={{ flex: 1 }}>
          {children}
        </Box>
        {/* On phones only Stay ends in the footer — every other screen is an
            app screen, and a legal footer under a chat or a photo grid reads
            as a web page again. */}
        <PublicFooter hideOnMobile={screen !== "stay"} />
        {showTabBar && <MobileTabBar slug={property.slug} active={tab} todayRate={property.todayRate} />}
      </Box>
    </GuestChatProvider>
  );
}
