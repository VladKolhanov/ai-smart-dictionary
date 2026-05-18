"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Link } from "@/shared/components/ui/link"
import { SeparatorWithLabel } from "@/shared/components/ui/separator"
import { Routes } from "@/shared/constants"
import { ArrowRightIcon, CheckCircleIcon } from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

import { AUTH_CHANNEL, type AuthChannelMessage } from "../../constants"

type Props = {
  className?: string
}

export const CardConfirmSuccess = ({ className }: Props) => {
  const t = useTranslations("emailVerified")

  useEffect(() => {
    const channel = new BroadcastChannel(AUTH_CHANNEL)

    const message: AuthChannelMessage = {
      type: "EMAIL_CONFIRMED",
    }

    channel.postMessage(message)
  }, [])

  return (
    <Card className={cn("mx-auto w-full max-w-md shadow-lg", className)}>
      <CardHeader className="text-center">
        <div className="mb-2 flex justify-center">
          <div className="rounded-full bg-primary/10 p-3">
            <CheckCircleIcon className="size-6 text-primary md:size-8" />
          </div>
        </div>

        <CardTitle className="text-lg font-bold md:text-2xl">
          {t("title")}
        </CardTitle>

        <CardDescription className="text-base">
          {t("description")}
        </CardDescription>
      </CardHeader>

      <SeparatorWithLabel>{t("separator")}</SeparatorWithLabel>

      <CardContent className="space-y-4 text-center">
        <Link
          className="w-full gap-2"
          size="lg"
          href={Routes.Dashboard}
        >
          {t("dashboardButton")} <ArrowRightIcon />
        </Link>

        <p className="text-xs text-muted-foreground">{t("closeHint")}</p>
      </CardContent>
    </Card>
  )
}
