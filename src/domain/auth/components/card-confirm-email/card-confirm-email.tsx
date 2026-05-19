import { getTranslations } from "next-intl/server"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Link } from "@/shared/components/ui/link"
import { ButtonReturnBack } from "@/shared/components/widgets/button-return-back"
import { ArrowLeftIcon, ExternalLinkIcon, MailIcon } from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

import * as actions from "../../actions"
import { ButtonResendEmail } from "../button-resend-email"

type Props = {
  email: string | null
  className?: string
}

export const CardConfirmEmail = async ({ className, email }: Props) => {
  const t = await getTranslations("cardConfirmEmail")

  return (
    <Card className={cn("mx-auto w-full max-w-md shadow-lg", className)}>
      <CardHeader className="text-center">
        <div className="mb-2 flex justify-center">
          <div className="rounded-full bg-primary/10 p-3">
            <MailIcon className="size-8 text-primary" />
          </div>
        </div>

        <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>

        {email && (
          <CardDescription className="text-base">
            {t("description")} <br />
            <span className="font-medium text-foreground italic">{email}</span>
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4 text-center text-sm text-muted-foreground">
        <p>{t("main")}</p>

        <div className="flex items-center gap-3 rounded-lg bg-muted p-2 text-left">
          <span className="text-xl">💡</span>
          <p>
            {t.rich("note", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>
      </CardContent>

      {email && (
        <CardFooter className="grid grid-cols-2 grid-rows-2 gap-2">
          <ButtonResendEmail
            className="col-span-2"
            email={email}
            sendEmailAction={actions.resendEmail}
          />

          <ButtonReturnBack
            variant="outline"
            className="col-span-2"
          >
            <ArrowLeftIcon />
            {t("backButton")}
          </ButtonReturnBack>

          <Link
            href="https://mail.google.com"
            target="_blank"
            variant="link"
            className="col-start-2 justify-self-end text-primary"
          >
            {t("openPost")}
            <ExternalLinkIcon className="size-4" />
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
