import { NextRequest } from 'next/server';

export interface ExtractedAnalytics {
  ipAddress: string;
  city: string;
  country: string;
  deviceType: 'Mobile' | 'Tablet' | 'Desktop';
  browser: string;
  os: string;
  referrer: string;
  fingerprint?: string;
}

export function extractAnalyticsFromRequest(req: NextRequest, bodyFingerprint?: string): ExtractedAnalytics {
  const headers = req.headers;

  // 1. IP Address Extraction
  const forwardedFor = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');
  let ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || '127.0.0.1');
  if (ipAddress === '::1' || ipAddress === '127.0.0.1') {
    ipAddress = 'Yerel Sunucu';
  }

  // 2. Geolocation (Vercel IP Headers)
  const rawCity = headers.get('x-vercel-ip-city');
  const city = rawCity ? decodeURIComponent(rawCity) : 'Bilinmeyen Şehir';

  const rawCountry = headers.get('x-vercel-ip-country');
  const country = rawCountry || 'TR';

  // 3. User-Agent Parsing (Device, OS, Browser)
  const userAgent = headers.get('user-agent') || '';
  
  let deviceType: 'Mobile' | 'Tablet' | 'Desktop' = 'Desktop';
  if (/ipad|tablet|playbook|silk/i.test(userAgent)) {
    deviceType = 'Tablet';
  } else if (/mobile|iphone|android|touch|samsung|redmi|huawei|xiaomi/i.test(userAgent)) {
    deviceType = 'Mobile';
  }

  let os = 'Diğer OS';
  if (/iphone|ipad|ipod/i.test(userAgent)) {
    os = 'iOS';
  } else if (/android/i.test(userAgent)) {
    os = 'Android';
  } else if (/windows/i.test(userAgent)) {
    os = 'Windows';
  } else if (/mac os|macintosh/i.test(userAgent)) {
    os = 'macOS';
  } else if (/linux/i.test(userAgent)) {
    os = 'Linux';
  }

  let browser = 'Diğer Tarayıcı';
  if (/edg/i.test(userAgent)) {
    browser = 'Edge';
  } else if (/chrome|crios/i.test(userAgent) && !/opr|opera/i.test(userAgent)) {
    browser = 'Chrome';
  } else if (/safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent)) {
    browser = 'Safari';
  } else if (/firefox|fxios/i.test(userAgent)) {
    browser = 'Firefox';
  } else if (/opr|opera/i.test(userAgent)) {
    browser = 'Opera';
  }

  // 4. Referrer Source Parsing
  const rawReferrer = headers.get('referer') || headers.get('referrer') || '';
  let referrer = 'Doğrudan URL';

  if (rawReferrer) {
    try {
      const url = new URL(rawReferrer);
      const host = url.hostname.toLowerCase();
      if (host.includes('google')) referrer = 'Google';
      else if (host.includes('instagram')) referrer = 'Instagram';
      else if (host.includes('twitter') || host.includes('x.com')) referrer = 'X (Twitter)';
      else if (host.includes('facebook')) referrer = 'Facebook';
      else if (host.includes('youtube')) referrer = 'YouTube';
      else if (host.includes('1000kitap')) referrer = '1000Kitap';
      else if (host.includes('github')) referrer = 'GitHub';
      else referrer = host.replace('www.', '');
    } catch {
      referrer = 'Harici Bağlantı';
    }
  }

  return {
    ipAddress,
    city,
    country,
    deviceType,
    browser,
    os,
    referrer,
    fingerprint: bodyFingerprint || undefined,
  };
}
