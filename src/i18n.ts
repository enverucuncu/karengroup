export const locales = ['tr','en','ar','ru','fr'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'en'
