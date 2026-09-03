"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { sp } from "@/components/smartpages/tokens";
import { useBookingFlowParams, useUpdateBookingFlowParams } from "@/lib/booking-flow-url";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import { startWebVisitorSession } from "@/lib/booking-link-api";
import { askWebAssistant, type WebAssistantContext } from "@/lib/web-assistant-api";

type ChatTurn = { role: "guest" | "assistant"; text: string };

type Props = {
  slug: string;
  phoneNumber: string | null;
  propertyName: string;
  context: WebAssistantContext;
};

function buildWaUrl(phoneNumber: string | null, propertyName: string): string | null {
  if (!phoneNumber) return null;
  const number = `91${phoneNumber.replace(/\D/g, "").slice(-10)}`;
  const text = `Hi, I have a question about ${propertyName}.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/**
 * Present on all three built Phase C screens (docs/guest-experience-handoff.md).
 * Always opens the real chat panel, whether the guest arrived via a
 * WhatsApp-minted `?s=` link or organically (Phase C open question #3, now
 * closed): with no session yet, the first message lazily mints one
 * (startWebVisitorSession — a real Contact + Conversation) rather than
 * falling back to a WhatsApp-only button. "Continue on WhatsApp instead"
 * stays available inside the panel as an escape hatch, never as the only
 * option.
 */
export function AskAssistantDrawer({ slug, phoneNumber, propertyName, context }: Props) {
  const params = useBookingFlowParams();
  const updateParams = useUpdateBookingFlowParams();
  const [sessionToken, setSessionToken] = useState<string | null>(params.s);
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const openedTrackedRef = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const waUrl = buildWaUrl(phoneNumber, propertyName);

  useEffect(() => {
    if (params.s) setSessionToken(params.s);
  }, [params.s]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, sending]);

  async function ensureSession(): Promise<string | null> {
    if (sessionToken) return sessionToken;
    try {
      const token = await startWebVisitorSession(slug);
      setSessionToken(token);
      updateParams({ s: token });
      return token;
    } catch {
      return null;
    }
  }

  function openPanel() {
    setOpen(true);
    if (!openedTrackedRef.current) {
      openedTrackedRef.current = true;
      bookingLinkEvents.track("web_chat_opened", { fromStep: context.step });
    }
  }

  function closePanel() {
    setOpen(false);
    bookingLinkEvents.track("web_chat_closed", { fromStep: context.step });
    bookingLinkEvents.flush();
  }

  async function send() {
    const message = input.trim();
    if (!message || sending) return;
    setInput("");
    setError(null);
    setTurns((prev) => [...prev, { role: "guest", text: message }]);
    setSending(true);
    bookingLinkEvents.track("web_chat_message_sent", { fromStep: context.step });
    try {
      const token = await ensureSession();
      if (!token) throw new Error("no session");
      const result = await askWebAssistant(token, message, context);
      setTurns((prev) => [...prev, { role: "assistant", text: result.reply }]);
    } catch {
      setError("Couldn't send that — please try again, or continue on WhatsApp below.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {!open && (
        <Fab
          onClick={openPanel}
          variant="extended"
          aria-label="Ask a question"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 30,
            bgcolor: sp.ink,
            color: "#fff",
            "&:hover": { bgcolor: sp.ink },
          }}
        >
          <ChatBubbleOutlineIcon sx={{ mr: 1, fontSize: 18 }} />
          Ask a question
        </Fab>
      )}

      {open && (
        <Box
          sx={{
            position: "fixed",
            zIndex: 40,
            inset: { xs: "auto 0 0 0", sm: "auto 20px 20px auto" },
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", sm: 380 },
              height: { xs: "70vh", sm: 512 },
              bgcolor: "#fff",
              border: `1px solid ${sp.border}`,
              borderRadius: { xs: "16px 16px 0 0", sm: sp.radius },
              boxShadow: sp.cardShadowHover,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${sp.border}`,
                px: 2,
                py: 1.5,
              }}
            >
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: sp.ink }}>
                Quick question?
              </Typography>
              <IconButton size="small" onClick={closePanel} aria-label="Close">
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>

            <Box ref={listRef} sx={{ flex: 1, overflowY: "auto", px: 2, py: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
              {turns.length === 0 && (
                <Typography sx={{ fontSize: "0.875rem", color: sp.muted }}>
                  Ask us anything about {propertyName} — the room, dates, or a special request. We&apos;ll come right back.
                </Typography>
              )}
              {turns.map((t, i) => (
                <Box
                  key={i}
                  sx={{
                    maxWidth: "85%",
                    alignSelf: t.role === "guest" ? "flex-end" : "flex-start",
                    bgcolor: t.role === "guest" ? sp.ink : sp.chipBg,
                    color: t.role === "guest" ? "#fff" : sp.ink,
                    borderRadius: t.role === "guest" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    px: 1.5,
                    py: 1,
                    fontSize: "0.875rem",
                  }}
                >
                  {t.text}
                </Box>
              ))}
              {sending && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: sp.muted, fontSize: "0.75rem" }}>
                  <CircularProgress size={12} /> Thinking…
                </Box>
              )}
              {error && <Typography sx={{ fontSize: "0.8125rem", color: "#dc2626" }}>{error}</Typography>}
            </Box>

            <Box sx={{ borderTop: `1px solid ${sp.border}`, p: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your question…"
                  value={input}
                  disabled={sending}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void send();
                  }}
                />
                <IconButton
                  onClick={() => void send()}
                  disabled={sending || !input.trim()}
                  sx={{ bgcolor: sp.blue, color: "#fff", "&:hover": { bgcolor: sp.blue }, "&.Mui-disabled": { bgcolor: sp.chipBg } }}
                >
                  <SendIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
              {waUrl && (
                <Typography
                  component="a"
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => bookingLinkEvents.track("asked_on_whatsapp", { fromStep: context.step })}
                  sx={{ mt: 1, display: "block", textAlign: "center", fontSize: "0.75rem", color: sp.muted, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                  Prefer WhatsApp? Continue there instead
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
