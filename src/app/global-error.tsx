'use client'

import { type ReactNode, useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { NextIntlClientProvider } from 'next-intl'

import { EmptyError } from '@/ui/components/molecules/empty-error'
import { TopBarWithActions } from '@/ui/components/molecules/top-bar-actions'

import { useGlobalErrorIntl } from './use-global-error-Intl'

const GlobalErrorLayout = ({
  children,
  locale,
  messages,
}: {
  children: ReactNode
  locale: ReturnType<typeof useGlobalErrorIntl>['locale']
  messages: ReturnType<typeof useGlobalErrorIntl>['messages']
}) => {
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <main className="grid h-dvh place-items-center">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: Props) {
  const { isLoading, locale, messages } = useGlobalErrorIntl()

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  if (!messages && isLoading) {
    // TODO: Add skeleton
    return (
      <GlobalErrorLayout locale={locale} messages={messages}>
        <p>Loading...</p>
      </GlobalErrorLayout>
    )
  }

  if (!messages && !isLoading) {
    return (
      <GlobalErrorLayout locale={locale} messages={messages}>
        <p>Failed to load messages</p>
      </GlobalErrorLayout>
    )
  }

  return (
    <GlobalErrorLayout locale={locale} messages={messages}>
      <TopBarWithActions />
      <EmptyError resetAction={reset} />
    </GlobalErrorLayout>
  )
}
