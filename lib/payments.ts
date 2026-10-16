// Payment layer: M-Pesa STK push + card gateway. Server-side only.
// Production rule (research report §7.3, §10.1): a booking is confirmed only
// when the provider's signed webhook says so — never on redirect alone.
import { env, assertConfigured } from "./env";

export async function initiateMpesaStk(input: {
  phone: string; amount: number; bookingRef: string;
}): Promise<{ checkoutRequestId: string }> {
  assertConfigured(env.mpesa.consumerKey, "MPESA_CONSUMER_KEY");
  assertConfigured(env.mpesa.shortcode, "MPESA_SHORTCODE");
  // TODO(payments): OAuth token -> /mpesa/stkpush/v1/processrequest (Daraja)
  throw new Error("payments.initiateMpesaStk not implemented");
}

export async function initiateCardCheckout(input: {
  amount: number; bookingRef: string; email: string;
}): Promise<{ redirectUrl: string }> {
  assertConfigured(env.card.secretKey, "CARD_GATEWAY_SECRET_KEY");
  // TODO(payments): create hosted checkout session with the chosen gateway
  throw new Error("payments.initiateCardCheckout not implemented");
}

export function verifyPaymentWebhook(rawBody: string, signature: string): boolean {
  assertConfigured(env.card.webhookSecret, "CARD_GATEWAY_WEBHOOK_SECRET");
  // TODO(payments): HMAC verification of the raw request body
  return false;
}

export async function processMpesaCallback(payload: unknown): Promise<{
  bookingRef: string; success: boolean; transactionId: string;
}> {
  // TODO(payments): parse Daraja callback, map ResultCode 0 = success
  throw new Error("payments.processMpesaCallback not implemented");
}
