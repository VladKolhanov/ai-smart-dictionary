import { getTranslations } from "next-intl/server"

import * as actions from "../../actions"
import { CheckEmailLayout } from "../../layouts/check-email"

type Props = {
  email: string | null
  className?: string
}

export const CardConfirmEmail = async ({ className, email }: Props) => {
  const t = await getTranslations("cardConfirmEmail")

  return (
    <CheckEmailLayout
      action={actions.resendEmail}
      email={email}
      title={t("title")}
      subtitle={t("subtitle")}
      content={t("content")}
      className={className}
    />
  )
}
