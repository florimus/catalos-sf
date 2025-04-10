import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, LOCALES } from './utils/constants';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.some((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  const defaultLocale = DEFAULT_LOCALE;
  const redirectUrl = new URL(`/${defaultLocale}${pathname}${search}`, req.url);

  return NextResponse.redirect(redirectUrl);
}
