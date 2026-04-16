'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Locale } from '@/lib/i18n'

export async function setLocaleAction(locale: Locale, pathname: string) {
  cookies().set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  redirect(pathname)
}
