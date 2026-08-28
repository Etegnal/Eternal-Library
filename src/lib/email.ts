import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dns from 'dns';

// Force Node.js to prefer IPv4 over IPv6 for SMTP DNS lookups on Windows
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
  }
} catch (e) {
  // ignore
}

function loadEnvFile() {
  if (!process.env.SMTP_USER) {
    try {
      const envPath = path.join(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach((line) => {
          const match = line.match(/^\s*([\w.-]+)\s*=\s*["']?([^"'\r\n]+)["']?/);
          if (match && !process.env[match[1]]) {
            process.env[match[1]] = match[2];
          }
        });
      }
    } catch (e) {
      // ignore
    }
  }
}
loadEnvFile();

// Configuration for Test Users Safeguard
export const DEFAULT_TEST_EMAILS = ['erenaoyunda@gmail.com', 'rahmik93@gmail.com'];
export const TEST_TARGET_EMAIL = process.env.TEST_EMAIL_RECIPIENT || 'erenaoyunda@gmail.com, rahmik93@gmail.com';
export const IS_TEST_MODE = process.env.EMAIL_TEST_MODE !== 'false'; // Default TRUE for test safety

export function getTestRecipients(): string[] {
  const envTarget = process.env.TEST_EMAIL_RECIPIENT;
  if (envTarget) {
    const list = envTarget.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
    return Array.from(new Set([...list, ...DEFAULT_TEST_EMAILS]));
  }
  return DEFAULT_TEST_EMAILS;
}

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendMail({ to, subject, html, text }: SendMailOptions) {
  const currentTestMode = process.env.EMAIL_TEST_MODE !== 'false';
  const allowedTestUsers = getTestRecipients();

  // 1. Determine target recipients based on Test Mode
  let finalRecipients: string[] = [];

  if (currentTestMode) {
    const requested = Array.isArray(to) ? to : [to];
    // Filter requested recipients to allowed test users if specific recipient requested
    const matchedTestUsers = requested.filter((e) => allowedTestUsers.includes(e.trim().toLowerCase()));

    if (matchedTestUsers.length > 0) {
      finalRecipients = matchedTestUsers;
    } else {
      finalRecipients = allowedTestUsers;
    }

    console.log(`[EMAIL SYSTEM - TEST MODE ACTIVE] Requested recipient(s):`, to);
    console.log(`[EMAIL SYSTEM - TEST MODE ACTIVE] Filtered to test recipients: ${finalRecipients.join(', ')}`);
  } else {
    finalRecipients = Array.isArray(to) ? to : [to];
  }

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER || '';
  const smtpPass = process.env.SMTP_PASS || '';
  const emailFrom = process.env.EMAIL_FROM || `"Eternal Library" <${smtpUser || 'noreply@eternallibrary.com'}>`;

  // 2. Check if SMTP credentials exist
  if (!smtpUser || !smtpPass) {
    console.warn(`
      [EMAIL SYSTEM WARNING]
      SMTP credentials (SMTP_USER / SMTP_PASS) not configured in .env.
      -----------------------------------------------------------------
      To send live emails to ${finalRecipients.join(', ')}, add the following to .env:
      SMTP_HOST=smtp.gmail.com
      SMTP_PORT=587
      SMTP_USER=your-email@gmail.com
      SMTP_PASS=your-app-password
      -----------------------------------------------------------------
      [LOGGED EMAIL PREVIEW]:
      To: ${finalRecipients.join(', ')}
      Subject: ${subject}
    `);

    return {
      success: true,
      deliveredTo: finalRecipients,
      isTestMode: IS_TEST_MODE,
      simulated: true,
      message: 'SMTP bilgileri henüz .env dosyasına eklenmediği için e-posta sunucu konsoluna simüle edildi.',
    };
  }

  // 3. Create Nodemailer Transport
  const isGmail = smtpHost.includes('gmail') || smtpUser.includes('gmail');
  const transporter = nodemailer.createTransport(
    isGmail
      ? {
          host: '142.250.102.108', // Direct Gmail IPv4 to bypass Windows local DNS timeout
          port: 465,
          secure: true,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            servername: 'smtp.gmail.com',
            rejectUnauthorized: false,
          },
        }
      : {
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        }
  );

  try {
    const info = await transporter.sendMail({
      from: emailFrom,
      to: finalRecipients.join(', '),
      subject: IS_TEST_MODE ? `[TEST - ${TEST_TARGET_EMAIL}] ${subject}` : subject,
      html,
      text: text || subject,
    });

    console.log(`[EMAIL SYSTEM SUCCESS] Message sent to ${finalRecipients.join(', ')}: MessageID ${info.messageId}`);

    return {
      success: true,
      deliveredTo: finalRecipients,
      isTestMode: IS_TEST_MODE,
      messageId: info.messageId,
      message: 'E-posta başarıyla iletildi.',
    };
  } catch (error: any) {
    console.error('[EMAIL SYSTEM ERROR] Failed to send email via Nodemailer:', error);
    return {
      success: false,
      error: error.message || 'E-posta gönderimi sırasında sunucu hatası oluştu.',
      deliveredTo: finalRecipients,
      isTestMode: IS_TEST_MODE,
    };
  }
}
