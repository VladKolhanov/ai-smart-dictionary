import { type ReactNode } from 'react'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'

import { routing } from '@/i18n/routing'
import { ENV } from '@/lib/env'
import { ThemeProvider } from '@/providers/theme-provider'
import { geistMono, geistSans } from '@/ui/fonts'

import '@/ui/styles/globals.css'

export const metadata: Metadata = {
  title: {
    template: `%s | ${ENV.NEXT_PUBLIC_APP_NAME}`,
    default: ENV.NEXT_PUBLIC_APP_NAME,
  },
  description: ENV.NEXT_PUBLIC_APP_DESCRIPTION,
  applicationName: ENV.NEXT_PUBLIC_APP_NAME,
  icons: '/favicon/favicon.ico',
}

type Props = Readonly<{
  children: ReactNode
  params: Promise<{ locale: string }>
}>

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
