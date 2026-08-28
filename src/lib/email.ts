import nodemailer from 'nodemailer';

// Configuration for Single Test User Safeguard
export const TEST_TARGET_EMAIL = process.env.TEST_EMAIL_RECIPIENT || 'erenaoyunda@gmail.com';
export const IS_TEST_MODE = process.env.EMAIL_TEST_MODE !== 'false'; // Default TRUE for test safety

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendMail({ to, subject, html, text }: SendMailOptions) {
  // 1. Determine target recipients based on Test Mode
  let finalRecipients: string[] = [];

  if (IS_TEST_MODE) {
    console.log(`[EMAIL SYSTEM - TEST MODE ACTIVE] Original recipient(s):`, to);
    console.log(`[EMAIL SYSTEM - TEST MODE ACTIVE] Redirected strictly to: ${TEST_TARGET_EMAIL}`);
    finalRecipients = [TEST_TARGET_EMAIL];
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
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

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
