import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'EUR', locale = 'ca'): string {
  const localeMap: Record<string, string> = {
    ca: 'ca-ES',
    es: 'es-ES',
    en: 'en-GB',
    fr: 'fr-FR',
    de: 'de-DE',
  }
  return new Intl.NumberFormat(localeMap[locale] ?? 'es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: Date | string, locale = 'ca'): string {
  const localeMap: Record<string, string> = {
    ca: 'ca-ES',
    es: 'es-ES',
    en: 'en-GB',
    fr: 'fr-FR',
    de: 'de-DE',
  }
  return new Intl.DateTimeFormat(localeMap[locale] ?? 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}
