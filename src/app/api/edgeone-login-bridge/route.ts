import { NextRequest, NextResponse } from 'next/server';

function sanitizeRedirect(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/';
  return value;
}

export async function GET(request: NextRequest) {
  const redirectTarget = sanitizeRedirect(
    request.nextUrl.searchParams.get('redirect')
  );
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('redirect', redirectTarget);

  const response = NextResponse.redirect(loginUrl);
  response.cookies.set('edgeone_login_bypass', '1', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/login',
    maxAge: 300,
  });
  return response;
}
