import { NextResponse } from "next/server";
import { leadSources, defaultTemplates, type Lead, type EmailTemplate } from "@/tools/client-agent/leads-data";

// In-memory store (use database in production)
let leads: Lead[] = [];
let templates: EmailTemplate[] = [...defaultTemplates];

// GET - fetch all leads or templates
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "leads";

  if (type === "sources") {
    return NextResponse.json(leadSources);
  }

  if (type === "templates") {
    return NextResponse.json(templates);
  }

  return NextResponse.json(leads);
}

// POST - add lead, generate email, or update status
export async function POST(request: Request) {
  const body = await request.json();
  const { action } = body;

  if (action === "add-lead") {
    const newLead: Lead = {
      id: Date.now().toString(),
      company: body.company,
      contactName: body.contactName,
      email: body.email,
      website: body.website || "",
      industry: body.industry,
      source: body.source || "manual",
      status: "new",
      notes: body.notes || "",
      lastContacted: null,
      createdAt: new Date().toISOString(),
      score: body.score || 5,
    };
    leads.unshift(newLead);
    return NextResponse.json(newLead);
  }

  if (action === "generate-email") {
    const { leadId, templateId } = body;
    const lead = leads.find((l) => l.id === leadId);
    const template = templates.find((t) => t.id === templateId);

    if (!lead || !template) {
      return NextResponse.json({ error: "Lead or template not found" }, { status: 404 });
    }

    // Personalize template
    let subject = template.subject
      .replace(/\[Company\]/g, lead.company)
      .replace(/\[Name\]/g, lead.contactName);

    let bodyText = template.body
      .replace(/\[Company\]/g, lead.company)
      .replace(/\[Name\]/g, lead.contactName)
      .replace(/\[industry\]/g, lead.industry.toLowerCase());

    return NextResponse.json({
      to: lead.email,
      subject,
      body: bodyText,
      leadId: lead.id,
      templateId: template.id,
    });
  }

  if (action === "update-lead") {
    const { leadId, updates } = body;
    leads = leads.map((l) =>
      l.id === leadId ? { ...l, ...updates } : l
    );
    return NextResponse.json({ success: true });
  }

  if (action === "delete-lead") {
    leads = leads.filter((l) => l.id !== body.leadId);
    return NextResponse.json({ success: true });
  }

  if (action === "add-template") {
    const newTemplate: EmailTemplate = {
      id: Date.now().toString(),
      name: body.name,
      subject: body.subject,
      body: body.body,
      category: body.category || "cold",
    };
    templates.push(newTemplate);
    return NextResponse.json(newTemplate);
  }

  if (action === "bulk-import") {
    const { leads: newLeads } = body;
    const imported = newLeads.map((l: Partial<Lead>) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      company: l.company || "Unknown",
      contactName: l.contactName || "",
      email: l.email || "",
      website: l.website || "",
      industry: l.industry || "General",
      source: l.source || "import",
      status: "new" as const,
      notes: l.notes || "",
      lastContacted: null,
      createdAt: new Date().toISOString(),
      score: l.score || 5,
    }));
    leads = [...imported, ...leads];
    return NextResponse.json({ imported: imported.length, total: leads.length });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
