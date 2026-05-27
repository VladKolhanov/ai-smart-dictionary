import { headers } from "next/headers"

import { Routes } from "@/shared/constants"
import { redirectWithSafeLocale } from "@/shared/utils/redirect-with-safe-locale"

import { auth } from "./auth"

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return session
}

export const redirectIfSessionExist = async (to: string = Routes.Dashboard) => {
  const session = await getSession()

  if (session?.session) {
    await redirectWithSafeLocale(to)
  }
}

export const getSessionOrRedirect = async (to: string = Routes.SignIn) => {
  const session = await getSession()

  if (!session?.session) {
    return await redirectWithSafeLocale(to)
  }

  return session
}
