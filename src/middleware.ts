import { globalRateLimiter } from '@/lib/rate-limiter';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.user.admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  if (req.nextUrl.pathname.startsWith('/api')) {
    return globalRateLimiter(req);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
