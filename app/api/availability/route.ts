import { NextRequest, NextResponse } from "next/server";
import { getAvailability } from "@/lib/engine";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ci = searchParams.get("ci");
  const co = searchParams.get("co");
  const guests = Number(searchParams.get("guests") ?? 2);
  if (!ci || !co || co <= ci) {
    return NextResponse.json({ error: "Invalid date range" }, { status: 400 });
  }
  try {
    const quotes = await getAvailability(ci, co, guests);
    return NextResponse.json({ quotes });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
