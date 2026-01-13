import type { useTranslations } from 'next-intl'

import { type ErrorCodes } from '@/core/errors/definitions'
import type componentsMessages from '@/lib/i18n/messages/en/components.json'
import type validationMessages from '@/lib/i18n/messages/en/validation.json'

export type TranslationKeys<
  TKey extends
    | keyof typeof componentsMessages
    | keyof typeof validationMessages,
> = ReturnType<typeof useTranslations<TKey>>

export type ZodFlattenError = {
  formErrors: string[]
  fieldErrors: Record<string, string[]>
}

export type ActionError = {
  code: ErrorCodes
  message: string
  details?: Record<string, string | string[]>
}

export type ActionResponse<TData> =
  | {
      status: 'init' | 'success'
      data: TData | null
      error: null
    }
  | {
      status: 'error'
      data: null
      error: ActionError
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
