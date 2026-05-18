import { type SocialProvider } from "better-auth"
import type { Messages } from "next-intl"

import { GoogleIcon } from "@/shared/icons"
import type { ValueOf } from "@/shared/types/utils"

export type SocialProviders = Extract<SocialProvider, "google">

export const REPEAT_RESEND_TIME = 45

export const SocialProvidersOptions = {
  google: {
    icon: GoogleIcon,
    translationKey: "google",
  },
} satisfies Record<
  SocialProviders,
  {
    icon: unknown
    translationKey: keyof Messages["providers"]
  }
>

export const AUTH_CHANNEL = "auth"

export const AuthChannelMessages = {
  EmailConfirmed: "EMAIL_CONFIRMED",
  EmailResetPasswordConfirmed: "EMAIL_RESET_PASSWORD_CONFIRMED",
  SignedIn: "SIGNED_IN",
} as const

export type AuthChannelMessage = Record<
  "type",
  ValueOf<typeof AuthChannelMessages>
>
