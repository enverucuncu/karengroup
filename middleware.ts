import { NextResponse } from 'next/server'
const SUPPORTED = ['tr','en','ar','ru','fr'] as const
export function middleware(req: Request) {
  const url = new URL(req.url)
  const path = url.pathname.split('/').filter(Boolean)
  const hasLang = path[0] && SUPPORTED.includes(path[0] as any)
  if (!hasLang) {
    const al = (req.headers.get('accept-language')||'').toLowerCase()
    const match = SUPPORTED.find(l => al.startsWith(l))
    url.pathname = `/${match || 'en'}${url.pathname}`
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}
export const config = { matcher: ['/((?!_next|favicon.ico|assets|api).*)'] }
