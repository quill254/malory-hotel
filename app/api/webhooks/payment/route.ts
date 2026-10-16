import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentWebhook, processMpesaCallback } from "@/lib/payments";
import { env } from "@/lib/env";

// Provider payment events (M-Pesa Daraja callback / card gateway webhook).
// MUST be idempotent: providers retry deliveries.
export async function POST(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get("x-signature") ?? "";

  if (env.card.gateway && verifyPaymentWebhook(raw, signature)) {
    // TODO: mark booking paid, confirm reservation in engine, send notifications
    return NextResponse.json({ received: true });
  }

  const payload = JSON.parse(raw);
  const result = await processMpesaCallback(payload);
  // TODO: on success -> confirmReservation(ref); on failure -> release hold
  return NextResponse.json({ received: true, ...result });
}
