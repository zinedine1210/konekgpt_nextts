import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // cek lolos jika login dan logout
  if (pathname.startsWith('/auth')) {
    const token = cookies().has('auth_token')
    if(token){
      const url = request.nextUrl.clone()
      url.pathname = '/usr'
      url.searchParams.set('redirected', 'true')
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/usr')) {
    // Authentication check
    const token = cookies().has('auth_token');
    if (!token) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      url.searchParams.set('redirected', 'true')
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/usr/:path*', '/api/data/:path*', '/auth/:path*'],
};
