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
      if (event.data.type === "EMAIL_CONFIRMED") {
        router.push(Routes.Dashboard)
        router.refresh()
      } else if (event.data.type === "EXISTING_EMAIL_CONFIRMED") {
        Cookies.remove(PersistKeys.FormSignUp)
        localStorage.removeItem(PersistKeys.FormSignUp)
        router.push(Routes.SignIn)
        router.refresh()
      }
    }

    return () => {
      channel.close()
    }
  }, [router])

  return null
}
