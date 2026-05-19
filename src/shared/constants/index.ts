import type { ValueOf } from "@/shared/types/utils"

export const Routes = {
  Home: "/",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  Dashboard: "/dashboard",
  ConfirmEmail: "/confirm-email",
  EmailVerified: "/confirm-success",
  ForgotPassword: "/forgot-password",
  ResetPassword: "/reset-password",
  CheckEmail: "/check-email",
  Profile: "/profile",
  Dictionary: "/dictionary",
  Games: "/games",
} as const

export const PersistKeys = {
  FormSignUp: "form-sign-up",
  FormSignIn: "form-sign-in",
  FormAddWord: "form-add-word",
  FormForgotPassword: "form-forgot-password",
  FormResetPassword: "form-reset-password",
} as const

export type PersistKeys = ValueOf<typeof PersistKeys>

export const AUTH_CHANNEL = "auth"

export const AuthChannelMessages = {
  EmailConfirmed: "EMAIL_CONFIRMED",
  ExistingEmailConfirmed: "EXISTING_EMAIL_CONFIRMED",
  EmailResetPasswordConfirmed: "EMAIL_RESET_PASSWORD_CONFIRMED",
  SignedIn: "SIGNED_IN",
} as const

export type AuthChannelMessage = Record<
  "type",
  ValueOf<typeof AuthChannelMessages>
>
