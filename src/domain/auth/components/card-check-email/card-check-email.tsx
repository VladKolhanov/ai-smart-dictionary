import { getTranslations } from "next-intl/server"

import * as actions from "../../actions"
import { CheckEmailLayout } from "../../layouts/check-email"

type Props = {
  email: string | null
  className?: string
}

export const CardCheckEmail = async ({ className, email }: Props) => {
  const t = await getTranslations("cardCheckEmail")

  return (
    <CheckEmailLayout
      action={actions.resendForgotPassword}
      email={email}
      title={t("title")}
      subtitle={t("subtitle")}
      content={t("content")}
      className={className}
    />
  )
}
