"use client";

import NextLink from "next/link";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { sp, formatINR } from "@/components/smartpages/tokens";
import { useBookingFlowHref } from "@/lib/booking-flow-url";
import { useGuestChat } from "./GuestChatProvider";
import { TAB_BAR_HEIGHT } from "./mobile";

export type ShellTab = "stay" | "photos" | "chat";

type Props = {
  slug: string;
  active: ShellTab | null;
  todayRate: number;
};

function TabLink({
  href,
  label,
  active,
  icon,
  activeIcon,
  badge = 0,
}: {
  href: string;
  label: string;
  active: boolean;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  badge?: number;
}) {
  return (
    <Box
      component={NextLink}
      href={href}
      // Tabs swap in place — pushing one history entry per tab tap would turn
      // the phone's back button into a walk back through every tab visited.
      replace
      aria-current={active ? "page" : undefined}
      sx={{
        flex: 1,
        minWidth: 56,
        minHeight: 48,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.25,
        textDecoration: "none",
        color: active ? sp.blue : sp.muted,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <Badge badgeContent={badge} color="error" max={9} overlap="circular">
        {active ? activeIcon : icon}
      </Badge>
      <Typography component="span" sx={{ fontSize: "0.6875rem", fontWeight: active ? 700 : 500, lineHeight: 1.2 }}>
        {label}
      </Typography>
    </Box>
  );
}

/**
 * Phone-only bottom navigation: three places to be (Stay, Photos, Chat) and
 * one thing to do (Book). Book is a button, not a tab — checkout has a start
 * and an end, and it hides this bar while it runs.
 *
 * Every link carries the guest's session token, dates and party forward, so
 * moving between tabs never drops what they picked.
 */
export function MobileTabBar({ slug, active, todayRate }: Props) {
  const buildHref = useBookingFlowHref();
  const { unread } = useGuestChat();
  const base = `/resorts/${slug}`;

  return (
    <Box
      component="nav"
      aria-label="Resort"
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 30,
        display: { xs: "block", sm: "none" },
        borderTop: `1px solid ${sp.divider}`,
        bgcolor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(10px)",
        pb: "env(safe-area-inset-bottom)",
      }}
    >
      <Box sx={{ height: TAB_BAR_HEIGHT, display: "flex", alignItems: "center", px: 1, gap: 0.5 }}>
        <TabLink
          href={buildHref(base)}
          label="Stay"
          active={active === "stay"}
          icon={<HomeOutlinedIcon />}
          activeIcon={<HomeIcon />}
        />
        <TabLink
          href={buildHref(`${base}/photos`)}
          label="Photos"
          active={active === "photos"}
          icon={<PhotoLibraryOutlinedIcon />}
          activeIcon={<PhotoLibraryIcon />}
        />
        <TabLink
          href={buildHref(`${base}/chat`)}
          label="Chat"
          active={active === "chat"}
          icon={<ChatBubbleOutlineIcon />}
          activeIcon={<ChatBubbleIcon />}
          badge={active === "chat" ? 0 : unread}
        />
        <Box
          component={NextLink}
          href={buildHref(`${base}/book`)}
          sx={{
            flex: "0 0 auto",
            ml: 0.5,
            minWidth: 132,
            height: 48,
            px: 2,
            borderRadius: "14px",
            bgcolor: sp.blue,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            boxShadow: "0 6px 16px rgba(31,87,214,0.28)",
            WebkitTapHighlightColor: "transparent",
            "&:active": { transform: "scale(0.98)" },
          }}
        >
          <Typography component="span" sx={{ fontSize: "0.9375rem", fontWeight: 700, lineHeight: 1.2 }}>
            Book
          </Typography>
          {todayRate > 0 && (
            <Typography component="span" sx={{ fontSize: "0.6875rem", opacity: 0.9, lineHeight: 1.2 }}>
              from ₹{formatINR(todayRate)}/night
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
