"use client"

import { useEffect } from "react"
import Cookies from "js-cookie"

import { useRouter } from "@/infrastructure/i18n/navigation"
import {
  AUTH_CHANNEL,
  type AuthChannelMessage,
  PersistKeys,
  Routes,
} from "@/shared/constants"

export const BroadcastEffect = () => {
  const router = useRouter()

  useEffect(() => {
    const channel = new BroadcastChannel(AUTH_CHANNEL)

    channel.onmessage = (event: MessageEvent<AuthChannelMessage>) => {
      if (event.data.type === "RESET_PASSWORD_COMPLETED") {
        Cookies.remove(PersistKeys.FormForgotPassword)
        localStorage.removeItem(PersistKeys.FormForgotPassword)
        router.push(Routes.SignIn)
      }

      return () => {
        channel.close()
      }
    }
  }, [router])

  return null
}
