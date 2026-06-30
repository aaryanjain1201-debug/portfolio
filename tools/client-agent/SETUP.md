# AI Client Agent — Setup Guide

## What It Does
Automatically finds leads, generates personalized cold emails, and sends them daily to foreign clients.

## Quick Start

### 1. Set Up Gmail SMTP (Recommended)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate a new app password for "Mail" → "Other (Custom name)"
5. Copy the 16-character password

### 2. Add Environment Variables

In your Vercel dashboard → Settings → Environment Variables, add:

```
EMAIL_PROVIDER=gmail
GMAIL_USER=aj929360@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
CRON_SECRET=your-random-secret-here
NEXT_PUBLIC_SITE_URL=https://portfolio-gamma-two-jl5ilsxfac.vercel.app
```

### 3. How It Works

| Feature | Description |
|---------|-------------|
| **Lead Scoring** | Only emails leads with score ≥ 6 |
| **Auto Template** | Matches industry to best cold email template |
| **Rate Limiting** | Max 10 emails/day, 2 sec delay between sends |
| **Daily Cron** | Runs automatically at 9 AM daily |
| **Status Tracking** | Updates lead status after each send |

### 4. Add Leads

1. Go to `/admin/agent`
2. Click "Add Lead"
3. Fill in company name, contact email, industry
4. Set score (6+ for auto-outreach)

### 5. Manual Outreach

1. Go to "Compose" tab
2. Select a lead
3. Select a template
4. Click "Generate Email"
5. Click "Open in Email Client"

### 6. Auto Outreach

1. Go to "Outreach" tab
2. Click "Run Outreach Now"
3. System selects best leads and sends personalized emails

## Alternative Email Providers

### SendGrid
```
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.xxxxx
```

### Resend
```
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxx
```

## Rate Limits

- **Daily:** 10 emails max
- **Weekly:** 50 emails max
- **Cooldown:** 7 days between emails to same lead
- **Delay:** 2 seconds between sends

## Industry Templates

| Industry | Template | Avg Budget |
|----------|----------|------------|
| Real Estate | 3D Walkthrough pitch | $1,000 - $5,000 |
| E-commerce | CGI Product Ad pitch | $500 - $3,000 |
| Advertising | White Label partnership | $1,000 - $8,000 |
| Tech/SaaS | Product Demo pitch | $1,000 - $5,000 |
