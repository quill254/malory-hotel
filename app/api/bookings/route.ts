import { NextRequest, NextResponse } from "next/server";
import { createReservation } from "@/lib/engine";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Server-side validation only — never trust the client for prices/dates.
  const { roomTypeId, ci, co, guests, guest, ratePlan } = body ?? {};
  if (!roomTypeId || !ci || !co || !guest?.name || !guest?.email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (co <= ci) return NextResponse.json({ error: "Invalid stay dates" }, { status: 400 });
  try {
    const reservation = await createReservation({ roomTypeId, ci, co, guests, guest, ratePlan });
    return NextResponse.json(reservation, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
