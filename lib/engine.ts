// Server-side booking engine client (Cloudbeds / Pesapal — swap implementations
// via BOOKING_ENGINE env). This replaces the client-side demo in lib/booking.ts
// for production. All functions run server-side only.
import { env, assertConfigured } from "./env";

export type EngineQuote = {
  roomTypeId: string;
  name: string;
  available: number;
  nightlyRate: number; // KES
  currency: string;
};

export async function getAvailability(ci: string, co: string, guests: number): Promise<EngineQuote[]> {
  assertConfigured(env.engineApiKey, "BOOKING_ENGINE_API_KEY");
  // TODO(engine-integration): real API call. Shape per provider docs:
  //   Cloudbeds: GET /rooms/{id}/availability?... or embedded engine API
  //   Pesapal ReservePort: availability endpoint + property inventory
  throw new Error("engine.getAvailability not implemented — configure " + env.engine);
}

export async function createReservation(input: {
  roomTypeId: string; ci: string; co: string; guests: number;
  guest: { name: string; email: string; phone: string };
  ratePlan: string;
}): Promise<{ ref: string; status: "confirmed" | "pending_payment" }> {
  assertConfigured(env.engineApiKey, "BOOKING_ENGINE_API_KEY");
  // CRITICAL (research report §8): the engine must hold inventory atomically.
  // If a payment step follows, create a PENDING reservation with a time-boxed
  // hold, then confirm via the payment webhook.
  throw new Error("engine.createReservation not implemented");
}

export async function cancelReservation(ref: string): Promise<{ status: string }> {
  assertConfigured(env.engineApiKey, "BOOKING_ENGINE_API_KEY");
  // Must release inventory AND trigger refund per the configured policy.
  throw new Error("engine.cancelReservation not implemented");
}

export async function handleEngineWebhook(payload: unknown, signature: string) {
  assertConfigured(env.engineWebhookSecret, "BOOKING_ENGINE_WEBHOOK_SECRET");
  // Verify signature, then reconcile reservation status changes.
  throw new Error("engine.handleEngineWebhook not implemented");
}
