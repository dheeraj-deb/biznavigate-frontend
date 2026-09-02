// Client for the inline guest-chat assistant — see
// biznavigo-backend/docs/inline-guest-chat-plan.md. A deliberately narrow,
// separate agent from the WhatsApp one: it answers questions and logs
// requests, but cannot take a single booking action. Writes into the same
// conversation the WhatsApp thread uses, so nothing asked here is lost if
// the guest later continues on WhatsApp.

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3006/api";

export type WebAssistantReply = {
  reply: string;
  escalated: boolean;
};

export async function askWebAssistant(
  token: string,
  message: string,
): Promise<WebAssistantReply> {
  const res = await fetch(`${BASE}/public/booking-sessions/${token}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    throw new Error(`Assistant request failed (${res.status})`);
  }
  return (await res.json()) as WebAssistantReply;
}
