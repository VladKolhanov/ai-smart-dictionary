import type React from "react"
import { getTranslations } from "next-intl/server"

import { Link } from "@/shared/components/ui/link"
import { ButtonReturnBack } from "@/shared/components/widgets/button-return-back"
import { ArrowLeftIcon, ExternalLinkIcon, MailOpenIcon } from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

import { ButtonResendEmail } from "../../components/button-resend-email"

type Props = {
  email: string | null
  title: string
  subtitle: string
  content: string
  action: React.ComponentProps<typeof ButtonResendEmail>["sendEmailAction"]
} & React.ComponentProps<"section">

export const CheckEmailLayout = async ({
  email,
  title,
  subtitle,
  content,
  action,
  className,
}: Props) => {
  const t = await getTranslations("checkEmailLayout")

  return (
    <section
      className={cn(
        "mx-auto w-full max-w-md animate-fade-up space-y-4 px-4 md:px-0",
        className
      )}
    >
      <div className="mb-2 flex justify-center">
        <div className="rounded-full bg-primary/30 p-3">
          <MailOpenIcon className="size-8 text-primary" />
        </div>
      </div>

      <hgroup className="space-y-2 text-center">
        <h1 className="text-2xl leading-snug font-bold">{title}</h1>
        {email && (
          <p className="text-base text-muted-foreground">
            {subtitle} <br />
            <span className="font-medium text-foreground italic underline">
              {email}
            </span>
          </p>
        )}
      </hgroup>

      <p className="text-center text-sm text-muted-foreground">{content}</p>

      <article className="flex items-center gap-3 rounded-lg bg-muted/40 p-2 text-left">
        <span className="text-xl">💡</span>
        <p>
          {t.rich("content", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      </article>

      {email && (
        <>
          <menu className="mb-2 flex flex-col gap-2 [&>li]:w-full [&>li>*]:w-full">
            <li>
              <ButtonResendEmail
                email={email}
                sendEmailAction={action}
              />
            </li>
            <li>
              <ButtonReturnBack variant="outline">
                <ArrowLeftIcon />
                {t("backButton")}
              </ButtonReturnBack>
            </li>
          </menu>

          <Link
            href="https://mail.google.com"
            target="_blank"
            variant="link"
            className="flex-center ml-auto inline-flex w-fit text-primary"
          >
            {t("openPost")}
            <ExternalLinkIcon className="inline-block size-4" />
          </Link>
        </>
      )}
    </section>
  )
}
