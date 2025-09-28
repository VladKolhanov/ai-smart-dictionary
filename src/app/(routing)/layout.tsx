import type { Metadata } from 'next'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
