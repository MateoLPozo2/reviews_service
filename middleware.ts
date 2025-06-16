import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Proxy API requests to Express server during development
  if (request.nextUrl.pathname.startsWith('/api/') && process.env.NODE_ENV === 'development') {
    const url = request.nextUrl.clone()
    url.protocol = 'http:'
    url.hostname = 'localhost'
    url.port = '5000'
    
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}