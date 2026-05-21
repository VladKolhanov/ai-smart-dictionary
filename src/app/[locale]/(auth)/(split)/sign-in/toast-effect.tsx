"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

type Props = {
  isResetPasswordCompleted: boolean
}

export const ToastEffect = ({ isResetPasswordCompleted }: Props) => {
  const hasShown = useRef(false)
  const t = useTranslations("signInToast")

  useEffect(() => {
    if (isResetPasswordCompleted && !hasShown.current) {
      toast.success(t("resetPasswordSuccess"))
      hasShown.current = true
    }
  }, [t, isResetPasswordCompleted])

  return null
}
