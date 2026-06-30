import { NextResponse } from "next/server";
import { runOutreach, getOutreachStats, previewOutreach } from "@/lib/outreach";
import { verifyConnection } from "@/lib/email";
import type { Lead } from "@/tools/client-agent/leads-data";

// In-memory leads store (sync with /api/leads)
let leads: Lead[] = [];

// GET - outreach stats, preview, or cron trigger
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") || "stats";

  // Vercel Cron trigger (daily at 9 AM)
  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    // Auto-run outreach daily
    try {
      const leadsRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/leads?type=leads`);
      if (leadsRes.ok) {
        leads = await leadsRes.json();
      }
    } catch (e) {}

    if (leads.length > 0) {
      const result = await runOutreach(leads);
      return NextResponse.json({ cron: true, ...result });
    }
    return NextResponse.json({ cron: true, message: "No leads to process" });
  }

  if (action === "stats") {
    const stats = getOutreachStats();
    const smtp = await verifyConnection();
    return NextResponse.json({ ...stats, smtp });
  }

  if (action === "preview") {
    const preview = previewOutreach(leads);
    return NextResponse.json(preview);
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

// POST - run outreach or test email
export async function POST(request: Request) {
  const body = await request.json();
  const { action } = body;

  if (action === "run") {
    // Fetch current leads
    try {
      const leadsRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/leads?type=leads`);
      if (leadsRes.ok) {
        leads = await leadsRes.json();
      }
    } catch (e) {}

    if (leads.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No leads found. Add leads first.",
      });
    }

    const result = await runOutreach(leads);
    return NextResponse.json({ success: true, ...result });
  }

  if (action === "test-email") {
    const { to, subject, body: emailBody } = body;
    try {
      const { sendEmail } = await import("@/lib/email");
      const result = await sendEmail({
        to: to || "test@example.com",
        subject: subject || "Test Email from Arihant Jain",
        html: emailBody || "<h1>Test</h1><p>This is a test email from your AI Client Agent. SMTP is working!</p>",
      });
      return NextResponse.json(result);
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
