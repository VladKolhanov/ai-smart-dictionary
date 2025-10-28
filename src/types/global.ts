import type { useTranslations } from 'next-intl'

import type commonMessages from '@/lib/i18n/messages/en/components.json'
import type validationMessages from '@/lib/i18n/messages/en/validation.json'
import type { routing } from '@/lib/i18n/routing'

export type TranslationKeys<
  TKey extends keyof typeof commonMessages | keyof typeof validationMessages,
> = ReturnType<typeof useTranslations<TKey>>

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof commonMessages & typeof validationMessages
  }
}

export type LayoutProps<
  TParams extends Record<string, string | string[]> | undefined = undefined,
> = TParams extends undefined
  ? { children: React.ReactNode }
  : { children: React.ReactNode; params: Promise<TParams> }

export type PageProps<
  TParams extends Record<string, string | string[]> | undefined = undefined,
  TSearchParams extends
    | Record<string, string | string[] | undefined>
    | undefined = undefined,
> = TParams extends undefined
  ? TSearchParams extends undefined
    ? never
    : { searchParams: Promise<TSearchParams> }
  : TSearchParams extends undefined
    ? { params: Promise<TParams> }
    : { params: Promise<TParams>; searchParams: Promise<TSearchParams> }
