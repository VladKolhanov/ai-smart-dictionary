"use client"

import { useEffect } from "react"

import { AUTH_CHANNEL, type AuthChannelMessage } from "@/shared/constants"

export const BroadcastEffect = () => {
  useEffect(() => {
    const channel = new BroadcastChannel(AUTH_CHANNEL)

    const message: AuthChannelMessage = {
      type: "EXISTING_EMAIL_CONFIRMED",
    }

    channel.postMessage(message)

    return () => channel.close()
  }, [])

  return null
}
