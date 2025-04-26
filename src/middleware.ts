import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { auth } from '@/lib/firebase'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value

  //TODO: Uncomment this when the auth is implemented
  // // If there's no session and trying to access protected routes
  // if (!session && (request.nextUrl.pathname.startsWith('/argue'))) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // // If there's a session and trying to access auth pages
  // if (session && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))) {
  //   return NextResponse.redirect(new URL('/argue', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/argue/:path*', '/login', '/register']
} 