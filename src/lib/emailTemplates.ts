// Eternal Library Parchment Styled HTML Email Templates

export interface NewPostEmailParams {
  title: string;
  slug: string;
  excerpt: string;
  type: 'YAZI' | 'SIIR';
  author?: string | null;
  readingTime?: string | null;
}

export function generateNewPostEmailHtml(params: NewPostEmailParams, siteUrl: string): string {
  const isPoem = params.type === 'SIIR';
  const detailPath = isPoem ? `/siirler/${params.slug}` : `/yazilar/${params.slug}`;
  const fullUrl = `${siteUrl}${detailPath}`;

  const typeLabel = isPoem ? 'Yeni Şiir' : 'Yeni Yazı';
  const badgeBg = isPoem ? '#FEE2E2' : '#FEF3C7';
  const badgeColor = isPoem ? '#991B1B' : '#78350F';
  const badgeBorder = isPoem ? '#FCA5A5' : '#FDE68A';

  return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${typeLabel}: ${params.title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #F5EFEB; font-family: Georgia, 'Times New Roman', serif; color: #362215;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td align="center" style="padding: 40px 10px;">
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFDF9; border: 2px solid #E6D7BC; border-radius: 24px; box-shadow: 0 10px 30px rgba(120, 53, 15, 0.1); overflow: hidden;">
              
              <!-- Header Accent Bar -->
              <tr>
                <td style="height: 6px; background: linear-gradient(to right, #78350F, #9A3412, #D97706);"></td>
              </tr>

              <!-- Header Brand -->
              <tr>
                <td align="center" style="padding: 35px 30px 20px 30px;">
                  <h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; font-weight: bold; color: #362215; letter-spacing: 0.5px;">
                    📜 Eternal Library
                  </h1>
                  <p style="margin: 5px 0 0 0; font-size: 13px; font-style: italic; color: #5C4033;">
                    Zamansız Eserler Antolojisi
                  </p>
                </td>
              </tr>

              <!-- Badge Row -->
              <tr>
                <td align="center" style="padding: 0 30px;">
                  <span style="display: inline-block; padding: 6px 16px; background-color: ${badgeBg}; border: 1px solid ${badgeBorder}; border-radius: 20px; font-size: 12px; font-weight: bold; color: ${badgeColor}; text-transform: uppercase; letter-spacing: 1px;">
                    ${typeLabel} Yayınlandı
                  </span>
                </td>
              </tr>

              <!-- Main Content -->
              <tr>
                <td style="padding: 25px 35px 35px 35px; text-align: center;">
                  
                  <h2 style="margin: 0 0 15px 0; font-family: Georgia, serif; font-size: 24px; font-weight: bold; color: #362215; line-height: 1.3;">
                    ${params.title}
                  </h2>

                  ${
                    params.author
                      ? `<p style="margin: 0 0 20px 0; font-size: 14px; font-style: italic; color: #785438;">— ${params.author}</p>`
                      : ''
                  }

                  <!-- Excerpt Quote Box -->
                  <div style="margin: 20px 0; padding: 20px; background-color: #FEFBF3; border-left: 3px solid #9A3412; border-radius: 8px; text-align: left;">
                    <p style="margin: 0; font-size: 15px; font-style: italic; color: #5C4033; line-height: 1.6;">
                      “${params.excerpt}”
                    </p>
                  </div>

                  <!-- Reading Time info -->
                  ${
                    params.readingTime
                      ? `<p style="margin: 15px 0 25px 0; font-size: 12px; font-family: sans-serif; color: #785438;">⏱️ Okuma Süresi: ${params.readingTime}</p>`
                      : ''
                  }

                  <!-- Call to Action Button -->
                  <div style="margin-top: 30px;">
                    <a href="${fullUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #78350F, #9A3412); color: #FFFBEB; font-family: sans-serif; font-size: 14px; font-weight: bold; text-decoration: none; border-radius: 12px; border: 1px solid rgba(217, 119, 6, 0.4); box-shadow: 0 4px 12px rgba(120, 53, 15, 0.25);">
                      Eseri Sitede Oku &rarr;
                    </a>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px 30px; background-color: #FEF9EE; border-top: 1px solid #E6D7BC; text-align: center; font-size: 11px; color: #785438; font-family: sans-serif; line-height: 1.5;">
                  <p style="margin: 0;">Bu e-posta <strong>Eternal Library</strong> edebiyat seçkisine kayıtlı olduğunuz için gönderilmiştir.</p>
                  <p style="margin: 5px 0 0 0; font-style: italic;">Eternal Library &copy; 2026 — Zamansız Sayfalar</p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export interface CustomAdminEmailParams {
  subject: string;
  message: string;
  recipientName?: string | null;
}

export function generateCustomAdminEmailHtml(params: CustomAdminEmailParams, siteUrl: string): string {
  const formattedMessage = params.message.replace(/\n/g, '<br/>');

  return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${params.subject}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #F5EFEB; font-family: Georgia, 'Times New Roman', serif; color: #362215;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td align="center" style="padding: 40px 10px;">
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFDF9; border: 2px solid #E6D7BC; border-radius: 24px; box-shadow: 0 10px 30px rgba(120, 53, 15, 0.1); overflow: hidden;">
              
              <!-- Header Bar -->
              <tr>
                <td style="height: 6px; background: linear-gradient(to right, #78350F, #9A3412, #D97706);"></td>
              </tr>

              <!-- Header Brand -->
              <tr>
                <td align="center" style="padding: 35px 30px 15px 30px;">
                  <h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; font-weight: bold; color: #362215;">
                    📜 Eternal Library
                  </h1>
                </td>
              </tr>

              <!-- Main Content -->
              <tr>
                <td style="padding: 20px 35px 35px 35px;">
                  
                  <p style="margin: 0 0 20px 0; font-size: 15px; color: #362215;">
                    Merhaba <strong>${params.recipientName || 'Okurumuz'}</strong>,
                  </p>

                  <div style="margin: 20px 0; padding: 25px; background-color: #FEFBF3; border-left: 4px solid #78350F; border-radius: 12px; font-size: 15px; color: #362215; line-height: 1.7;">
                    ${formattedMessage}
                  </div>

                  <div style="margin-top: 30px; text-align: center;">
                    <a href="${siteUrl}" target="_blank" style="display: inline-block; padding: 12px 28px; background: #78350F; color: #FFFBEB; font-family: sans-serif; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 10px;">
                      Eternal Library'ye Git &rarr;
                    </a>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px 30px; background-color: #FEF9EE; border-top: 1px solid #E6D7BC; text-align: center; font-size: 11px; color: #785438; font-family: sans-serif;">
                  <p style="margin: 0;">Eternal Library Yönetim Ekibi tarafından gönderilmiştir.</p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
