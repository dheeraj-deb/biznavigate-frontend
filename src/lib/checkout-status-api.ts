// The outcome of a Cashfree checkout, read back by the page a guest lands on
// after paying. The webhook remains the source of truth — this only reflects
// what it has already written, which is why the page polls rather than
// deciding anything itself.

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3006/api";

export type CheckoutStatus = {
  status: "PENDING" | "PAID" | "CANCELLED" | "EXPIRED";
  kind: string;
  amount: number;
  currency: string;
  paidAt: string | null;
  booking?: {
    code: string;
    checkIn: string;
    checkOut: string;
    propertyName: string | null;
    propertySlug: string | null;
    whatsappNumber: string | null;
  };
};

export async function getCheckoutStatus(id: string): Promise<CheckoutStatus | null> {
  try {
    const res = await fetch(`${BASE}/public/checkout/${id}/status`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as CheckoutStatus;
  } catch {
    return null;
  }
}
