"use client"

import { useEffect } from "react"

import { AUTH_CHANNEL, type AuthChannelMessage } from "@/shared/constants"

type Props = {
  isResetPasswordCompleted: boolean
  email: string
}

export const BroadcastEffect = ({ isResetPasswordCompleted, email }: Props) => {
  useEffect(() => {
    if (!isResetPasswordCompleted && !email) return

    const channel = new BroadcastChannel(AUTH_CHANNEL)

    const message: AuthChannelMessage = {
      type: isResetPasswordCompleted
        ? "RESET_PASSWORD_COMPLETED"
        : "EXISTING_EMAIL_CONFIRMED",
    }

    channel.postMessage(message)

    return () => channel.close()
  }, [email, isResetPasswordCompleted])

  return null
}
