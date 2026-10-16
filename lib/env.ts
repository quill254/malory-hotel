// Typed access to server-only env. Anything here must NEVER be prefixed
// with NEXT_PUBLIC_ and must never be imported into client components.

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://malory.vercel.app",
  engine: process.env.BOOKING_ENGINE ?? "",
  engineApiKey: process.env.BOOKING_ENGINE_API_KEY ?? "",
  enginePropertyId: process.env.BOOKING_ENGINE_PROPERTY_ID ?? "",
  engineWebhookSecret: process.env.BOOKING_ENGINE_WEBHOOK_SECRET ?? "",
  mpesa: {
    env: process.env.MPESA_ENV ?? "sandbox",
    consumerKey: process.env.MPESA_CONSUMER_KEY ?? "",
    consumerSecret: process.env.MPESA_CONSUMER_SECRET ?? "",
    shortcode: process.env.MPESA_SHORTCODE ?? "",
    passkey: process.env.MPESA_PASSKEY ?? "",
    callbackUrl: process.env.MPESA_CALLBACK_URL ?? "",
  },
  card: {
    gateway: process.env.CARD_GATEWAY ?? "",
    publicKey: process.env.CARD_GATEWAY_PUBLIC_KEY ?? "",
    secretKey: process.env.CARD_GATEWAY_SECRET_KEY ?? "",
    webhookSecret: process.env.CARD_GATEWAY_WEBHOOK_SECRET ?? "",
  },
  emailApiKey: process.env.EMAIL_API_KEY ?? "",
  emailFrom: process.env.EMAIL_FROM ?? "",
  smsApiKey: process.env.SMS_API_KEY ?? "",
  smsSenderId: process.env.SMS_SENDER_ID ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
} as const;

export const isPlaceholder = (v: string) => v.includes("***") || v === "";

/** Call at the start of every server route that talks to an external system. */
export function assertConfigured(v: string, name: string) {
  if (isPlaceholder(v)) throw new Error(`${name} is not configured — replace the *** placeholder in .env.local`);
}
