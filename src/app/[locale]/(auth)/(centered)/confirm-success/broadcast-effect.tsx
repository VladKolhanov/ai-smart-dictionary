"use client"

import { useEffect } from "react"
import Cookies from "js-cookie"

import {
  AUTH_CHANNEL,
  type AuthChannelMessage,
  PersistKeys,
} from "@/shared/constants"

export const BroadcastEffect = () => {
  useEffect(() => {
    const channel = new BroadcastChannel(AUTH_CHANNEL)

    const message: AuthChannelMessage = {
      type: "EMAIL_CONFIRMED",
    }

    channel.postMessage(message)

    Cookies.remove(PersistKeys.FormSignUp)
    localStorage.removeItem(PersistKeys.FormSignUp)

    return () => channel.close()
  }, [])

  return null
}
