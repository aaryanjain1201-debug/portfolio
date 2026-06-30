declare module "nodemailer" {
  interface TransportOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user: string;
      pass: string;
    };
  }

  interface SendMailOptions {
    from?: string;
    to: string | string[];
    subject?: string;
    text?: string;
    html?: string;
    replyTo?: string;
    attachments?: any[];
  }

  interface Info {
    messageId: string;
    accepted: string[];
    rejected: string[];
  }

  interface Transporter {
    sendMail(options: SendMailOptions): Promise<Info>;
    verify(): Promise<boolean>;
  }

  function createTransport(options: TransportOptions): Transporter;
}
