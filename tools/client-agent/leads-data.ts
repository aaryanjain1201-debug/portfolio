export interface Lead {
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
  score: number; // 1-10, how likely they need animation
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: "cold" | "followup" | "proposal" | "thankyou";
}

// Pre-built lead sources - industries that need animation/3D
export const leadSources = [
  {
    industry: "Real Estate",
    searchTerms: ["real estate developer", "architectural firm", "property developer"],
    why: "They need 3D walkthroughs and architectural visualization",
    avgBudget: "$1,000 - $5,000",
  },
  {
    industry: "E-commerce",
    searchTerms: ["D2C brand", "product brand", "e-commerce startup"],
    why: "They need product animations and CGI ads",
    avgBudget: "$500 - $3,000",
  },
  {
    industry: "Gaming",
    searchTerms: ["game studio", "indie game developer", "mobile game company"],
    why: "They need 3D assets, trailers, and cinematics",
    avgBudget: "$2,000 - $10,000",
  },
  {
    industry: "Advertising",
    searchTerms: ["advertising agency", "digital marketing agency", "creative agency"],
    why: "They outsource animation and motion graphics",
    avgBudget: "$1,000 - $8,000",
  },
  {
    industry: "Education",
    searchTerms: ["edtech startup", "online course platform", "educational content"],
    why: "They need explainer animations and e-learning content",
    avgBudget: "$500 - $2,000",
  },
  {
    industry: "Healthcare",
    searchTerms: ["medical device company", "pharmaceutical", "health startup"],
    why: "They need medical animations and product visualization",
    avgBudget: "$2,000 - $15,000",
  },
  {
    industry: "Automotive",
    searchTerms: ["automotive brand", "car dealer", "EV startup"],
    why: "They need CGI car ads and product visualization",
    avgBudget: "$3,000 - $20,000",
  },
  {
    industry: "Tech/SaaS",
    searchTerms: ["SaaS startup", "tech company", "software company"],
    why: "They need product demos, explainer videos, and UI animations",
    avgBudget: "$1,000 - $5,000",
  },
];

// Pre-built email templates
export const defaultTemplates: EmailTemplate[] = [
  {
    id: "cold-real-estate",
    name: "Real Estate Cold Email",
    subject: "3D Walkthrough for [Company] — Quick Question",
    body: `Hi [Name],

I came across [Company]'s latest project and was genuinely impressed by the vision.

I specialize in creating photorealistic 3D architectural walkthroughs that help developers pre-sell properties before construction is complete. My recent work includes walkthroughs for [similar project type].

Here's what I can deliver:
→ Photorealistic 3D interior/exterior walkthroughs
→ Virtual tour-ready content
→ 4K output for presentations and social media

Would you be open to a quick 10-minute call to discuss how 3D visualization could accelerate your sales pipeline?

Best,
Arihant Jain
AI Content Creator & 3D Artist
arihantjain.dev`,
    category: "cold",
  },
  {
    id: "cold-ecommerce",
    name: "E-commerce Cold Email",
    subject: "CGI Product Ads for [Company] — 3x More Engagement",
    body: `Hi [Name],

I noticed [Company] on [platform] — great products! But I think your product visuals could be doing a lot more heavy lifting.

I create CGI product animations and ads that generate 3x more engagement than static images. Brands like Red Bull and Apple use similar techniques.

What I offer:
→ Photorealistic CGI product renders
→ 360° product animations
→ Social media ad-ready content (15s, 30s, 60s)

I'd love to show you a quick mockup of how your product could look in a CGI ad. Interested?

Best,
Arihant Jain
AI Content Creator & 3D Artist
arihantjain.dev`,
    category: "cold",
  },
  {
    id: "cold-agency",
    name: "Agency Cold Email",
    subject: "Animation Partner for [Agency] — White Label Available",
    body: `Hi [Name],

I noticed [Agency] does amazing work for your clients. I'm reaching out because I specialize in 3D animation and motion graphics — and I partner with agencies as a white-label creative resource.

Why agencies work with me:
→ Fast turnaround (5-7 day delivery)
→ No overhead — pay per project
→ Full NDA compliance
→ Consistent quality across projects

My recent work includes product animations, explainer videos, and CGI ads for brands across e-commerce, real estate, and tech.

Would it make sense to have me as a backup resource for your animation projects?

Best,
Arihant Jain
AI Content Creator & 3D Artist
arihantjain.dev`,
    category: "cold",
  },
  {
    id: "followup-1",
    name: "Follow-up #1",
    subject: "Re: Quick Follow-up — [Company]",
    body: `Hi [Name],

Just wanted to follow up on my previous email. I know things get busy!

I recently finished a project similar to what I described — a [brief description] for [client type]. Happy to share the reel if you're interested.

No pressure at all. If the timing isn't right, I completely understand.

Best,
Arihant`,
    category: "followup",
  },
  {
    id: "proposal",
    name: "Proposal Template",
    subject: "Proposal: [Project Type] for [Company]",
    body: `Hi [Name],

Thanks for the opportunity! Here's what I have in mind for [Company]:

PROJECT SCOPE:
→ [Deliverable 1]
→ [Deliverable 2]
→ [Deliverable 3]

TIMELINE: [X] business days
REVISIONS: [X] rounds included
INVESTMENT: $[Amount]

WHAT'S INCLUDED:
→ Storyboard (if applicable)
→ High-resolution output (4K)
→ Source files (optional add-on)
→ Commercial usage rights

I can start within [X] days of confirmation.

Let me know if you'd like to adjust anything!

Best,
Arihant Jain`,
    category: "proposal",
  },
  {
    id: "thankyou",
    name: "Thank You / Referral Ask",
    subject: "Thank You + Quick Favor",
    body: `Hi [Name],

Thank you for working with me on [project]! It was a pleasure bringing your vision to life.

If you were happy with the work, I'd really appreciate:
1. A quick testimonial (1-2 sentences) I can use on my site
2. A referral if you know anyone who might need similar work

Either way, I'm grateful for the opportunity and hope to work together again!

Best,
Arihant Jain`,
    category: "thankyou",
  },
];
