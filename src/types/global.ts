import type commonMessages from '@/lib/i18n/messages/en/components.json'
import type validationMessages from '@/lib/i18n/messages/en/validation.json'
import type { routing } from '@/lib/i18n/routing'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof commonMessages & typeof validationMessages
  }
}
