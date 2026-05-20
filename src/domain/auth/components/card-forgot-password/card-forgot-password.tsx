import { getTranslations } from "next-intl/server"

import { ButtonReturnBack } from "@/shared/components/widgets/button-return-back"
import { ArrowLeftIcon, MailIcon } from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

import { FormForgotPassword } from "../form-forgot-password"

type Props = {
  className?: string
}

export const CardForgotPassword = async ({ className }: Props) => {
  const t = await getTranslations("cardForgotPassword")

  return (
    <section
      className={cn(
        "mx-auto w-full max-w-md animate-fade-up space-y-6 px-4 shadow-lg md:px-0",
        className
      )}
    >
      <div className="mb-2 flex justify-center">
        <div className="rounded-full bg-primary/30 p-3">
          <MailIcon className="size-8 text-primary" />
        </div>
      </div>

      <hgroup className="space-y-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
        <p className="px-4 text-sm leading-relaxed text-muted-foreground">
          {t("subtitle")}
        </p>
      </hgroup>

      <FormForgotPassword />

      <ButtonReturnBack
        variant="ghost"
        size="xl"
        className="w-full"
      >
        <ArrowLeftIcon />
        {t("back")}
      </ButtonReturnBack>
    </section>
  )
}
