"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Mail,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  Search,
  Filter,
  Send,
  BarChart3,
  Users,
  MessageSquare,
  TrendingUp,
  Globe,
  Building2,
  ChevronDown,
  X,
} from "lucide-react";

interface Lead {
  id: string;
  company: string;
  contactName: string;
  email: string;
  website: string;
  industry: string;
  source: string;
  status: "new" | "contacted" | "replied" | "converted" | "rejected";
  notes: string;
  lastContacted: string | null;
  createdAt: string;
  score: number;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
}

interface LeadSource {
  industry: string;
  searchTerms: string[];
  why: string;
  avgBudget: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400",
  contacted: "bg-yellow-500/20 text-yellow-400",
  replied: "bg-green-500/20 text-green-400",
  converted: "bg-purple-500/20 text-purple-400",
  rejected: "bg-red-500/20 text-red-400",
};

export default function AgentDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [sources, setSources] = useState<LeadSource[]>([]);
  const [activeTab, setActiveTab] = useState<"leads" | "templates" | "sources" | "compose">("leads");
  const [showAddLead, setShowAddLead] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Form states
  const [form, setForm] = useState({
    company: "",
    contactName: "",
    email: "",
    website: "",
    industry: "E-commerce",
    notes: "",
    score: 5,
  });

  useEffect(() => {
    fetchLeads();
    fetchTemplates();
    fetchSources();
  }, []);

  const fetchLeads = async () => {
    const res = await fetch("/api/leads?type=leads");
    const data = await res.json();
    setLeads(data);
  };

  const fetchTemplates = async () => {
    const res = await fetch("/api/leads?type=templates");
    const data = await res.json();
    setTemplates(data);
  };

  const fetchSources = async () => {
    const res = await fetch("/api/leads?type=sources");
    const data = await res.json();
    setSources(data);
  };

  const addLead = async () => {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add-lead", ...form }),
    });
    setShowAddLead(false);
    setForm({ company: "", contactName: "", email: "", website: "", industry: "E-commerce", notes: "", score: 5 });
    fetchLeads();
  };

  const generateEmail = async () => {
    if (!selectedLead || !selectedTemplate) return;
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "generate-email",
        leadId: selectedLead.id,
        templateId: selectedTemplate,
      }),
    });
    const data = await res.json();
    setGeneratedEmail(data);
  };

  const updateLeadStatus = async (leadId: string, status: string) => {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update-lead", leadId, updates: { status, lastContacted: new Date().toISOString() } }),
    });
    fetchLeads();
  };

  const deleteLead = async (leadId: string) => {
    if (!confirm("Delete this lead?")) return;
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete-lead", leadId }),
    });
    fetchLeads();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredLeads = leads
    .filter((l) => filterStatus === "all" || l.status === filterStatus)
    .filter(
      (l) =>
        l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.industry.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    replied: leads.filter((l) => l.status === "replied").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold">AI Client Agent</h1>
          <p className="mt-2 text-white/50">Find leads, generate cold emails, track outreach</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {[
            { label: "Total Leads", value: stats.total, icon: Users, color: "text-gold" },
            { label: "New", value: stats.new, icon: Plus, color: "text-blue-400" },
            { label: "Contacted", value: stats.contacted, icon: Send, color: "text-yellow-400" },
            { label: "Replied", value: stats.replied, icon: MessageSquare, color: "text-green-400" },
            { label: "Converted", value: stats.converted, icon: TrendingUp, color: "text-purple-400" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/5 bg-[#111827] p-4">
              <div className="flex items-center gap-2">
                <stat.icon size={16} className={stat.color} />
                <span className="text-xs text-white/40">{stat.label}</span>
              </div>
              <div className={`mt-2 text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-white/5 pb-4">
          {(["leads", "templates", "sources", "compose"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab ? "bg-gold text-black" : "text-white/50 hover:bg-white/5"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* LEADS TAB */}
        {activeTab === "leads" && (
          <div>
            {/* Search + Filter */}
            <div className="mb-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 flex-1 min-w-[200px]">
                <Search size={14} className="text-white/30" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search leads..."
                  className="bg-transparent text-sm text-white outline-none flex-1"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="replied">Replied</option>
                <option value="converted">Converted</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={() => setShowAddLead(true)}
                className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-bold text-black"
              >
                <Plus size={14} /> Add Lead
              </button>
            </div>

            {/* Leads List */}
            <div className="space-y-3">
              {filteredLeads.length === 0 && (
                <div className="rounded-xl border border-white/5 bg-[#111827] p-8 text-center">
                  <Users size={40} className="mx-auto mb-3 text-white/20" />
                  <p className="text-white/40">No leads yet. Add your first lead or check the Sources tab for ideas.</p>
                </div>
              )}
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#111827] p-4 transition hover:border-white/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold font-bold text-sm">
                    {lead.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-bold text-sm">{lead.company}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-white/40">
                      {lead.contactName} • {lead.industry} • Score: {lead.score}/10
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowCompose(true);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-gold/20 hover:text-gold"
                      title="Generate Email"
                    >
                      <Mail size={13} />
                    </button>
                    {lead.website && (
                      <a
                        href={lead.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white outline-none"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="replied">Replied</option>
                      <option value="converted">Converted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-red-500/20 hover:text-red-400"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEMPLATES TAB */}
        {activeTab === "templates" && (
          <div className="space-y-4">
            {templates.map((tpl) => (
              <div key={tpl.id} className="rounded-xl border border-white/5 bg-[#111827] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">{tpl.name}</h3>
                    <p className="mt-1 text-xs text-white/40">Subject: {tpl.subject}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase">
                    {tpl.category}
                  </span>
                </div>
                <pre className="mt-4 max-h-32 overflow-hidden whitespace-pre-wrap rounded-lg bg-white/5 p-3 text-xs text-white/60">
                  {tpl.body.slice(0, 300)}...
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* SOURCES TAB */}
        {activeTab === "sources" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sources.map((src) => (
              <div key={src.industry} className="rounded-xl border border-white/5 bg-[#111827] p-6">
                <div className="flex items-center gap-2">
                  <Building2 size={18} className="text-gold" />
                  <h3 className="font-bold">{src.industry}</h3>
                </div>
                <p className="mt-2 text-sm text-white/50">{src.why}</p>
                <div className="mt-3">
                  <span className="text-xs text-white/30">Search terms:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {src.searchTerms.map((term) => (
                      <span key={term} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 rounded-lg bg-gold/5 p-2">
                  <span className="text-xs font-bold text-gold">Avg Budget: {src.avgBudget}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COMPOSE TAB */}
        {activeTab === "compose" && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Lead Selection */}
            <div className="rounded-xl border border-white/5 bg-[#111827] p-6">
              <h3 className="font-bold">Select Lead</h3>
              <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                {leads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                      selectedLead?.id === lead.id
                        ? "border-gold bg-gold/5"
                        : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="text-sm font-bold">{lead.company}</div>
                    <div className="text-xs text-white/40">{lead.contactName} • {lead.email}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Template Selection + Generate */}
            <div className="rounded-xl border border-white/5 bg-[#111827] p-6">
              <h3 className="font-bold">Select Template</h3>
              <div className="mt-4 space-y-2">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                      selectedTemplate === tpl.id
                        ? "border-gold bg-gold/5"
                        : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="text-sm font-bold">{tpl.name}</div>
                    <div className="text-xs text-white/40">{tpl.category}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={generateEmail}
                disabled={!selectedLead || !selectedTemplate}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3 text-sm font-bold text-black disabled:opacity-40"
              >
                <Mail size={14} /> Generate Email
              </button>

              {/* Generated Email Preview */}
              {generatedEmail && (
                <div className="mt-6 rounded-lg border border-gold/20 bg-gold/5 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold">Generated Email</h4>
                    <button
                      onClick={() => copyToClipboard(`Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`)}
                      className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1 text-xs text-white/70 hover:bg-white/20"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-white/40">To: {selectedLead?.email}</div>
                  <div className="mt-1 text-sm font-bold">Subject: {generatedEmail.subject}</div>
                  <pre className="mt-3 max-h-60 overflow-y-auto whitespace-pre-wrap rounded bg-white/5 p-3 text-xs text-white/60">
                    {generatedEmail.body}
                  </pre>
                  <a
                    href={`mailto:${selectedLead?.email}?subject=${encodeURIComponent(generatedEmail.subject)}&body=${encodeURIComponent(generatedEmail.body)}`}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-2.5 text-sm font-bold text-black"
                  >
                    <Send size={14} /> Open in Email Client
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add Lead Modal */}
        {showAddLead && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Add New Lead</h2>
                <button onClick={() => setShowAddLead(false)} className="text-white/50 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-white/60">Company Name *</label>
                  <input
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Red Bull India"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm text-white/60">Contact Name</label>
                    <input
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      placeholder="e.g. John Smith"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-white/60">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm text-white/60">Website</label>
                    <input
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      placeholder="https://company.com"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-white/60">Industry</label>
                    <select
                      value={form.industry}
                      onChange={(e) => setForm({ ...form, industry: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                    >
                      <option value="Real Estate">Real Estate</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Advertising">Advertising</option>
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Tech/SaaS">Tech/SaaS</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-white/60">Score (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={form.score}
                    onChange={(e) => setForm({ ...form, score: parseInt(e.target.value) })}
                    className="w-full accent-gold"
                  />
                  <div className="text-center text-sm font-bold text-gold">{form.score}/10</div>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-white/60">Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={2}
                    placeholder="Any notes about this lead..."
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                  />
                </div>
                <button
                  onClick={addLead}
                  disabled={!form.company || !form.email}
                  className="w-full rounded-lg bg-gold py-3 text-sm font-bold text-black disabled:opacity-40"
                >
                  Add Lead
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
