import { NextResponse } from "next/server";
import { availableJobTypes, bestTimes } from "@/config/site";

/**
 * Receives quote requests from <QuoteForm>.
 *
 * Delivery: set QUOTE_WEBHOOK_URL (Zapier, Make, Formspree, an email relay…)
 * and each request is POSTed there as JSON. Without it, requests are logged in
 * development and REFUSED in production, so the form tells visitors to call
 * instead of silently dropping their request.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const str = (k: string, max = 300) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, max) : "");

  // Honeypot filled in: pretend success, send nothing.
  if (str("website")) return NextResponse.json({ ok: true });

  const lead = {
    name: str("name", 120),
    phone: str("phone", 40),
    address: str("address", 200),
    jobType: str("jobType", 20),
    bestTime: str("bestTime", 20),
    page: str("page", 100),
    receivedAt: new Date().toISOString(),
  };

  const digits = lead.phone.replace(/\D/g, "");
  const validJob = availableJobTypes().some((j) => j.value === lead.jobType);
  const validTime = !lead.bestTime || (bestTimes as readonly string[]).includes(lead.bestTime);
  if (!lead.name || digits.length < 10 || digits.length > 11 || !lead.address || !validJob || !validTime) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 422 });
  }

  const webhook = process.env.QUOTE_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[quote] QUOTE_WEBHOOK_URL not set; request not delivered:", lead);
      return NextResponse.json({ ok: true, delivered: false });
    }
    console.error("[quote] QUOTE_WEBHOOK_URL is not set in production. Request dropped:", lead);
    return NextResponse.json({ error: "Quote delivery not configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[quote] delivery failed:", err, lead);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
