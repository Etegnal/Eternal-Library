import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Protect all /admin (except /admin/login) and /api/admin routes
  const isAdminPageRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
  const isAdminApiRoute = pathname.startsWith('/api/admin');

  if (isAdminPageRoute || isAdminApiRoute) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET || 'eternal-library-secret-key-123',
    });

    const isUserAdmin = token && token.role === 'ADMIN';

    if (!isUserAdmin) {
      if (isAdminApiRoute) {
        return NextResponse.json(
          { error: 'Yetkisiz Erişim! Yalnızca yöneticiler bu API noktasına erişebilir.' },
          { status: 401 }
        );
      } else {
        const loginUrl = new URL('/admin/login', req.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // 2. Global Security Response Headers
  const response = NextResponse.next();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
