import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

function getTransporter() {
  const provider = process.env.EMAIL_PROVIDER || "gmail";

  if (provider === "sendgrid") {
    return nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY || "",
      },
    });
  }

  if (provider === "resend") {
    return nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 587,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY || "",
      },
    });
  }

  // Default: Gmail SMTP
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER || "",
      pass: process.env.GMAIL_APP_PASSWORD || "",
    },
  });
}

export async function sendEmail({ to, subject, html, replyTo }: EmailOptions) {
  const transporter = getTransporter();

  const info = await transporter.sendMail({
    from: `"Arihant Jain" <${process.env.GMAIL_USER || "aj929360@gmail.com"}>`,
    to,
    subject,
    html,
    replyTo: replyTo || process.env.GMAIL_USER || "aj929360@gmail.com",
  });

  return {
    success: true,
    messageId: info.messageId,
    to,
    subject,
  };
}

// Verify SMTP connection
export async function verifyConnection() {
  try {
    const transporter = getTransporter();
    await transporter.verify();
    return { success: true, message: "SMTP connection verified" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
