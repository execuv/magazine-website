import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/firebase/firebase'

export async function middleware(request: NextRequest) {
  const session = await auth.currentUser

  // Array of protected routes
  const protectedRoutes = ['/dashboard2', '/profile']

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Redirect to dashboard if logged in user tries to access auth pages
  const authRoutes = ['/auth/login', '/auth/signup']
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard2', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
