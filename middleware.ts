import { NextResponse, type NextRequest } from 'next/server'

const LANG_COOKIE = 'vitaself-lang'

/** /tr|/en prefix’ini rewrite eder ve dil çerezini yazar. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const match = pathname.match(/^\/(tr|en)(\/.*)?$/)

  if (!match) {
    return NextResponse.next()
  }

  const lang = match[1] as 'en' | 'tr'
  const rest = match[2] && match[2].length > 0 ? match[2] : '/'
  const url = request.nextUrl.clone()
  url.pathname = rest

  const response = NextResponse.rewrite(url)
  response.cookies.set(LANG_COOKIE, lang, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  return response
}

export const config = {
  matcher: ['/tr', '/tr/:path*', '/en', '/en/:path*'],
}
