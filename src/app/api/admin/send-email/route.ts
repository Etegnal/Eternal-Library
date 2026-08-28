import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sendMail, IS_TEST_MODE, TEST_TARGET_EMAIL } from '@/lib/email';
import { generateCustomAdminEmailHtml } from '@/lib/emailTemplates';
import { getSiteUrl } from '@/lib/siteUrl';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const body = await req.json();
    const { recipientEmail, subject, message, recipientName } = body;

    if (!subject || !message) {
      return NextResponse.json({ error: 'Konu ve mesaj içeriği zorunludur.' }, { status: 400 });
    }

    let targetRecipients: string[] = [];
    const siteUrl = getSiteUrl();

    if (!recipientEmail || recipientEmail === 'all') {
      const allUsers = await prisma.user.findMany({
        select: { email: true },
      });
      targetRecipients = allUsers.map((u) => u.email).filter(Boolean);
    } else {
      targetRecipients = [recipientEmail.trim()];
    }

    if (targetRecipients.length === 0) {
      targetRecipients = [TEST_TARGET_EMAIL];
    }

    const htmlContent = generateCustomAdminEmailHtml(
      {
        subject,
        message,
        recipientName: recipientName || 'Okurumuz',
      },
      siteUrl
    );

    const result = await sendMail({
      to: targetRecipients,
      subject,
      html: htmlContent,
      text: message,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in send-email API:', error);
    return NextResponse.json({ error: error.message || 'E-posta gönderimi başarısız' }, { status: 500 });
  }
}
