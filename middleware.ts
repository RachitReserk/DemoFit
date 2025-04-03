import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Temporarily disable authentication check
  return NextResponse.next()
}

// Only run middleware on admin routes
export const config = {
  matcher: ["/admin/:path*"],
}

