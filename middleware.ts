import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    // Check for admin session in cookies or headers
    const adminLoggedIn = request.cookies.get('adminLoggedIn')?.value;
    const adminLoginTime = request.cookies.get('adminLoginTime')?.value;

    if (!adminLoggedIn || !adminLoginTime) {
      // No admin session, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Check if session is still valid (24 hours)
    const loginTime = parseInt(adminLoginTime);
    const currentTime = Date.now();
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

    if (currentTime - loginTime >= sessionDuration) {
      // Session expired, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};