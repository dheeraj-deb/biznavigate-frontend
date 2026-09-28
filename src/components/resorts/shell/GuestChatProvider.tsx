"use client";

import { createContext, useCallback, useContext, useRef, useState, useSyncExternalStore } from "react";
import { useBookingFlowParams, useUpdateBookingFlowParams } from "@/lib/booking-flow-url";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import { startWebVisitorSession } from "@/lib/booking-link-api";
import { askWebAssistant, type WebAssistantContext } from "@/lib/web-assistant-api";

export type ChatTurn = { role: "guest" | "assistant"; text: string };

type GuestChat = {
  turns: ChatTurn[];
  sending: boolean;
  error: string | null;
  /** Assistant replies that landed while no chat surface was on screen. */
  unread: number;
  send: (message: string, context: WebAssistantContext) => Promise<void>;
  /** A chat surface (the Chat tab, the desktop panel) is showing — or not. */
  setVisible: (visible: boolean) => void;
};

const GuestChatContext = createContext<GuestChat | null>(null);

function storageKey(slug: string) {
  return `bn:guest-chat:${slug}`;
}

function loadTurns(slug: string): ChatTurn[] {
  try {
    const raw = sessionStorage.getItem(storageKey(slug));
    const parsed = raw ? (JSON.parse(raw) as unknown) : null;
    return Array.isArray(parsed) ? (parsed as ChatTurn[]) : [];
  } catch {
    return [];
  }
}

// The transcript as an external store over sessionStorage: read lazily on the
// client, empty on the server (so the prerendered HTML and the hydration
// render agree), and the same array back until it changes.
const NO_TURNS: ChatTurn[] = [];
const transcripts = new Map<string, ChatTurn[]>();
const transcriptListeners = new Set<() => void>();

function readTranscript(slug: string): ChatTurn[] {
  let turns = transcripts.get(slug);
  if (!turns) {
    turns = loadTurns(slug);
    transcripts.set(slug, turns);
  }
  return turns;
}

function appendTurn(slug: string, turn: ChatTurn): void {
  const turns = [...readTranscript(slug), turn];
  transcripts.set(slug, turns);
  try {
    sessionStorage.setItem(storageKey(slug), JSON.stringify(turns));
  } catch {
    // Private mode or storage full — the thread still lives in memory.
  }
  transcriptListeners.forEach((notify) => notify());
}

function subscribeTranscript(notify: () => void): () => void {
  transcriptListeners.add(notify);
  return () => transcriptListeners.delete(notify);
}

/**
 * One conversation per property visit, owned by the [slug] layout so it
 * survives moving between Stay, Photos, Chat and Book. Each page used to
 * mount its own chat panel with its own state, so a guest who asked a
 * question on the resort page and then opened a room lost the thread.
 *
 * The transcript is kept in sessionStorage so a reload keeps it too. The
 * server already has every message (it writes into the same conversation as
 * the WhatsApp thread); this is only so the guest can see them.
 */
export function GuestChatProvider({ slug, children }: { slug: string; children: React.ReactNode }) {
  const params = useBookingFlowParams();
  const updateParams = useUpdateBookingFlowParams();
  // Minted here when the guest writes first with no WhatsApp `s` in the URL;
  // the URL's own token wins whenever there is one.
  const [mintedToken, setMintedToken] = useState<string | null>(null);
  const sessionToken = params.s ?? mintedToken;
  const turns = useSyncExternalStore(
    subscribeTranscript,
    () => readTranscript(slug),
    () => NO_TURNS,
  );
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);
  const visibleRef = useRef(false);

  const setVisible = useCallback((visible: boolean) => {
    visibleRef.current = visible;
    if (visible) setUnread(0);
  }, []);

  const send = useCallback(
    async (message: string, context: WebAssistantContext) => {
      const text = message.trim();
      if (!text || sending) return;
      setError(null);
      appendTurn(slug, { role: "guest", text });
      setSending(true);
      bookingLinkEvents.track("web_chat_message_sent", { fromStep: context.step });
      try {
        let token = sessionToken;
        if (!token) {
          // No WhatsApp-minted `s` yet: the first message lazily mints a real
          // visitor session rather than falling back to WhatsApp only.
          token = await startWebVisitorSession(slug);
          setMintedToken(token);
          updateParams({ s: token });
        }
        const result = await askWebAssistant(token, text, context);
        appendTurn(slug, { role: "assistant", text: result.reply });
        if (!visibleRef.current) setUnread((n) => n + 1);
      } catch {
        setError("Couldn't send that — please try again, or continue on WhatsApp.");
      } finally {
        setSending(false);
      }
    },
    [sending, sessionToken, slug, updateParams],
  );

  return (
    <GuestChatContext.Provider value={{ turns, sending, error, unread, send, setVisible }}>
      {children}
    </GuestChatContext.Provider>
  );
}

export function useGuestChat(): GuestChat {
  const chat = useContext(GuestChatContext);
  if (!chat) throw new Error("useGuestChat must be used inside GuestChatProvider");
  return chat;
}
