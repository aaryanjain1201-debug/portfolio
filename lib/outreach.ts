import { sendEmail } from "@/lib/email";
import { defaultTemplates, type Lead, type EmailTemplate } from "@/tools/client-agent/leads-data";

// Outreach configuration
const CONFIG = {
  maxEmailsPerDay: 10,
  maxEmailsPerWeek: 50,
  minLeadScore: 6, // Only email leads with score >= 6
  followUpAfterDays: 3,
  cooldownDays: 7,
};

interface OutreachLog {
  id: string;
  leadId: string;
  email: string;
  subject: string;
  templateId: string;
  status: "sent" | "failed" | "skipped";
  sentAt: string;
  error?: string;
}

// In-memory log (use database in production)
let outreachLog: OutreachLog[] = [];

// Select best leads for outreach
function selectLeads(leads: Lead[]): Lead[] {
  const now = new Date();

  return leads
    .filter((lead) => {
      // Skip if already converted or rejected
      if (lead.status === "converted" || lead.status === "rejected") return false;

      // Skip if lead score too low
      if (lead.score < CONFIG.minLeadScore) return false;

      // Skip if no email
      if (!lead.email) return false;

      // Skip if contacted recently (cooldown)
      if (lead.lastContacted) {
        const lastContacted = new Date(lead.lastContacted);
        const daysSince = Math.floor((now.getTime() - lastContacted.getTime()) / (1000 * 60 * 60 * 24));
        if (daysSince < CONFIG.cooldownDays) return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by score (highest first), then by status (new > contacted > replied)
      const statusPriority: Record<string, number> = { new: 0, contacted: 1, replied: 2 };
      const aPriority = statusPriority[a.status] ?? 3;
      const bPriority = statusPriority[b.status] ?? 3;

      if (aPriority !== bPriority) return aPriority - bPriority;
      return b.score - a.score;
    })
    .slice(0, CONFIG.maxEmailsPerDay);
}

// Select best template for lead
function selectTemplate(lead: Lead, templates: EmailTemplate[]): EmailTemplate {
  // Match template to industry
  const industryTemplates: Record<string, string> = {
    "Real Estate": "cold-real-estate",
    "E-commerce": "cold-ecommerce",
    Advertising: "cold-agency",
  };

  const templateId = industryTemplates[lead.industry] || "cold-ecommerce";
  return templates.find((t) => t.id === templateId) || templates[0];
}

// Personalize template
function personalizeTemplate(template: EmailTemplate, lead: Lead): { subject: string; body: string } {
  const subject = template.subject
    .replace(/\[Company\]/g, lead.company)
    .replace(/\[Name\]/g, lead.contactName);

  const body = template.body
    .replace(/\[Company\]/g, lead.company)
    .replace(/\[Name\]/g, lead.contactName)
    .replace(/\[industry\]/g, lead.industry.toLowerCase())
    .replace(/\[similar project type\]/g, `${lead.industry.toLowerCase()} projects`);

  return { subject, body };
}

// Main outreach function
export async function runOutreach(leads: Lead[]): Promise<{
  sent: number;
  failed: number;
  skipped: number;
  logs: OutreachLog[];
}> {
  const selectedLeads = selectLeads(leads);
  const logs: OutreachLog[] = [];
  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const lead of selectedLeads) {
    // Check daily limit
    const todayLogs = logs.filter((l) => {
      const logDate = new Date(l.sentAt).toDateString();
      return logDate === new Date().toDateString() && l.status === "sent";
    });

    if (todayLogs.length >= CONFIG.maxEmailsPerDay) {
      skipped++;
      logs.push({
        id: Date.now().toString(),
        leadId: lead.id,
        email: lead.email,
        subject: "",
        templateId: "",
        status: "skipped",
        sentAt: new Date().toISOString(),
        error: "Daily limit reached",
      });
      continue;
    }

    try {
      const template = selectTemplate(lead, defaultTemplates);
      const { subject, body } = personalizeTemplate(template, lead);

      const result = await sendEmail({
        to: lead.email,
        subject,
        html: body.replace(/\n/g, "<br>"),
      });

      if (result.success) {
        sent++;
        logs.push({
          id: Date.now().toString(),
          leadId: lead.id,
          email: lead.email,
          subject,
          templateId: template.id,
          status: "sent",
          sentAt: new Date().toISOString(),
        });
      } else {
        failed++;
        logs.push({
          id: Date.now().toString(),
          leadId: lead.id,
          email: lead.email,
          subject,
          templateId: template.id,
          status: "failed",
          sentAt: new Date().toISOString(),
          error: (result as any).message || "Unknown error",
        });
      }

      // Rate limit: wait 2 seconds between emails
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error: any) {
      failed++;
      logs.push({
        id: Date.now().toString(),
        leadId: lead.id,
        email: lead.email,
        subject: "",
        templateId: "",
        status: "failed",
        sentAt: new Date().toISOString(),
        error: error.message,
      });
    }
  }

  // Store logs
  outreachLog = [...logs, ...outreachLog].slice(0, 1000);

  return { sent, failed, skipped, logs };
}

// Get outreach stats
export function getOutreachStats() {
  const today = new Date().toDateString();
  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);

  const todayLogs = outreachLog.filter(
    (l) => new Date(l.sentAt).toDateString() === today && l.status === "sent"
  );

  const weekLogs = outreachLog.filter(
    (l) => new Date(l.sentAt) >= thisWeek && l.status === "sent"
  );

  return {
    todaySent: todayLogs.length,
    weekSent: weekLogs.length,
    totalSent: outreachLog.filter((l) => l.status === "sent").length,
    totalFailed: outreachLog.filter((l) => l.status === "failed").length,
    recentLogs: outreachLog.slice(0, 20),
  };
}

// Preview outreach (dry run)
export function previewOutreach(leads: Lead[]): {
  leads: { company: string; email: string; template: string; subject: string }[];
  total: number;
} {
  const selectedLeads = selectLeads(leads);

  return {
    leads: selectedLeads.map((lead) => {
      const template = selectTemplate(lead, defaultTemplates);
      const { subject } = personalizeTemplate(template, lead);
      return {
        company: lead.company,
        email: lead.email,
        template: template.name,
        subject,
      };
    }),
    total: selectedLeads.length,
  };
}
