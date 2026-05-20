"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

type Props = {
  isResetPasswordCompleted: boolean
}

export const ToastEffect = ({ isResetPasswordCompleted }: Props) => {
  const t = useTranslations("signInToast")

  useEffect(() => {
    if (isResetPasswordCompleted) {
      toast.success(t("resetPasswordSuccess"))
    }
  }, [t, isResetPasswordCompleted])

  return null
}
