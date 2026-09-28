"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { sp } from "@/components/smartpages/tokens";
import { readCurrentBookingFlowParams, useBookingFlowParams } from "@/lib/booking-flow-url";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import type { WebAssistantContext } from "@/lib/web-assistant-api";
import { buildWaUrl } from "./AskAssistantDrawer";
import { useGuestChat } from "./shell/GuestChatProvider";
import { TAB_BAR_HEIGHT, TOP_BAR_HEIGHT, useKeyboardOpen } from "./shell/mobile";

const SUGGESTIONS = [
  "Is breakfast included?",
  "What are the check-in and check-out times?",
  "Is there parking?",
  "How do I get there?",
];

/**
 * Where the visible part of the page is. iOS never shrinks the layout for the
 * keyboard — it slides the visual viewport instead — so a chat pinned to the
 * layout bottom would type into a box hidden behind the keyboard.
 */
function useVisualViewport(): { height: number; offsetTop: number } | null {
  const [vp, setVp] = useState<{ height: number; offsetTop: number } | null>(null);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setVp({ height: vv.height, offsetTop: vv.offsetTop });
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);
  return vp;
}

/**
 * The Chat tab. Same assistant and same thread as the desktop panel
 * (GuestChatProvider), full screen on a phone between the top bar and the
 * tab bar — and over the whole visible area while the keyboard is up.
 */
export function ChatScreen({ phoneNumber, propertyName }: { phoneNumber: string | null; propertyName: string }) {
  const { turns, sending, error, send, setVisible } = useGuestChat();
  const params = useBookingFlowParams();
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const keyboardOpen = useKeyboardOpen();
  const vp = useVisualViewport();
  const waUrl = buildWaUrl(phoneNumber, propertyName);

  const context: WebAssistantContext = {
    step: "experience",
    checkIn: params.checkin ?? undefined,
    checkOut: params.checkout ?? undefined,
    adults: params.adults ?? undefined,
    children: params.children ?? undefined,
    roomTypeId: params.room ?? undefined,
  };

  useEffect(() => {
    bookingLinkEvents.setToken(readCurrentBookingFlowParams().s);
    bookingLinkEvents.track("web_chat_opened", { fromStep: "chat_tab" });
    setVisible(true);
    return () => {
      setVisible(false);
      bookingLinkEvents.track("web_chat_closed", { fromStep: "chat_tab" });
      bookingLinkEvents.flush();
    };
  }, [setVisible]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, sending, keyboardOpen]);

  function submit(text = input) {
    const message = text.trim();
    if (!message || sending) return;
    setInput("");
    void send(message, context);
  }

  // Phone geometry: below the top bar and above the tab bar normally; the
  // whole visible viewport while typing (the shell hides the tab bar then).
  const top = keyboardOpen && vp ? `${vp.offsetTop}px` : `${TOP_BAR_HEIGHT}px`;
  const height =
    keyboardOpen && vp
      ? `${vp.height}px`
      : `calc(100dvh - ${TOP_BAR_HEIGHT}px - ${TAB_BAR_HEIGHT}px - env(safe-area-inset-bottom))`;

  return (
    <Box
      sx={{
        position: { xs: "fixed", sm: "static" },
        left: 0,
        right: 0,
        top: { xs: top },
        height: { xs: height, sm: 640 },
        zIndex: { xs: keyboardOpen ? 45 : 20 },
        maxWidth: { sm: 720 },
        mx: { sm: "auto" },
        my: { sm: 4 },
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
        border: { sm: `1px solid ${sp.border}` },
        borderRadius: { sm: sp.radius },
        overflow: "hidden",
      }}
    >
      <Box
        ref={listRef}
        sx={{ flex: 1, overflowY: "auto", px: 2, py: 2, display: "flex", flexDirection: "column", gap: 1.25, bgcolor: sp.bgSoft }}
      >
        <Box
          sx={{
            alignSelf: "flex-start",
            maxWidth: "85%",
            bgcolor: "#fff",
            border: `1px solid ${sp.border}`,
            borderRadius: "16px 16px 16px 4px",
            px: 1.5,
            py: 1,
            fontSize: "0.9375rem",
            color: sp.ink,
          }}
        >
          Hi! Ask me anything about {propertyName} — rooms, food, activities, or how to get here.
        </Box>

        {turns.length === 0 && (
          <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {SUGGESTIONS.map((s) => (
              <Box
                key={s}
                component="button"
                type="button"
                onClick={() => submit(s)}
                disabled={sending}
                sx={{
                  border: `1px solid ${sp.borderSoft}`,
                  bgcolor: "#fff",
                  color: sp.blue,
                  borderRadius: "999px",
                  px: 1.5,
                  py: 0.875,
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                {s}
              </Box>
            ))}
          </Box>
        )}

        {turns.map((t, i) => (
          <Box
            key={i}
            sx={{
              maxWidth: "85%",
              alignSelf: t.role === "guest" ? "flex-end" : "flex-start",
              bgcolor: t.role === "guest" ? sp.blue : "#fff",
              color: t.role === "guest" ? "#fff" : sp.ink,
              border: t.role === "guest" ? "none" : `1px solid ${sp.border}`,
              borderRadius: t.role === "guest" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              px: 1.5,
              py: 1,
              fontSize: "0.9375rem",
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
            }}
          >
            {t.text}
          </Box>
        ))}

        {sending && (
          <Typography sx={{ fontSize: "0.8125rem", color: sp.muted }}>Typing…</Typography>
        )}
        {error && <Typography sx={{ fontSize: "0.8125rem", color: "#dc2626" }}>{error}</Typography>}
      </Box>

      <Box sx={{ borderTop: `1px solid ${sp.border}`, px: 1.5, pt: 1, pb: 1, bgcolor: "#fff" }}>
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            size="small"
            placeholder="Type your question…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            // 16px: iOS zooms the whole page into any input smaller than that.
            sx={{ "& .MuiInputBase-root": { borderRadius: "20px", fontSize: "1rem" } }}
          />
          <IconButton
            aria-label="Send"
            onClick={() => submit()}
            disabled={sending || !input.trim()}
            sx={{
              width: 44,
              height: 44,
              flexShrink: 0,
              bgcolor: sp.blue,
              color: "#fff",
              "&:hover": { bgcolor: sp.blue },
              "&.Mui-disabled": { bgcolor: sp.chipBg, color: sp.faint },
            }}
          >
            <SendIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
        {waUrl && !keyboardOpen && (
          <Box
            component="a"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => bookingLinkEvents.track("asked_on_whatsapp", { fromStep: "chat_tab" })}
            sx={{
              mt: 0.75,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              fontSize: "0.75rem",
              color: sp.muted,
              textDecoration: "none",
            }}
          >
            <WhatsAppIcon sx={{ fontSize: 14, color: sp.whatsappText }} />
            Prefer WhatsApp? Continue there
          </Box>
        )}
      </Box>
    </Box>
  );
}
