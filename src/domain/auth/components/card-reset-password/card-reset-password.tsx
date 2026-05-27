import type { ComponentProps } from "react"
import { getTranslations } from "next-intl/server"

import { LockIcon } from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

import { FormResetPassword } from "../form-reset-password"

type Props = {
  className?: string
  token?: ComponentProps<typeof FormResetPassword>["token"]
}

export const CardResetPassword = async ({ token, className }: Props) => {
  const t = await getTranslations("cardResetPassword")

  return (
    <section
      className={cn(
        "mx-auto w-full max-w-md animate-fade-up space-y-6 px-4 md:px-0",
        className
      )}
    >
      <div className="mb-2 flex justify-center">
        <div className="rounded-full bg-primary/30 p-3">
          <LockIcon className="size-8 text-primary" />
        </div>
      </div>

      <hgroup className="space-y-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
        <p className="px-4 text-sm leading-relaxed text-muted-foreground">
          {t("subtitile")}
        </p>
      </hgroup>

      <FormResetPassword token={token} />
    </section>
  )
}
