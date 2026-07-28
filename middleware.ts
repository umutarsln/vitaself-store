import { NextResponse, type NextRequest } from 'next/server'
import { DEFAULT_LANG, LANG_COOKIE, isLang } from '@/lib/i18n/config'

/** /tr|/en|/de|/ru prefix rewrite + varsayılan dil çerezi. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const prefixMatch = pathname.match(/^\/(tr|en|de|ru)(\/.*)?$/)

  let response: NextResponse

  if (prefixMatch) {
    const lang = prefixMatch[1]
    const rest = prefixMatch[2] && prefixMatch[2].length > 0 ? prefixMatch[2] : '/'
    const url = request.nextUrl.clone()
    url.pathname = rest
    response = NextResponse.rewrite(url)
    response.cookies.set(LANG_COOKIE, lang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
    return response
  }

  response = NextResponse.next()

  const existing = request.cookies.get(LANG_COOKIE)?.value
  if (!isLang(existing)) {
    response.cookies.set(LANG_COOKIE, DEFAULT_LANG, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
