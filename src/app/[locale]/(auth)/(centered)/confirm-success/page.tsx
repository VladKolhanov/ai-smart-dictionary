import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { CardConfirmSuccess } from "@/domain/auth/components/card-confirm-success"
import { getSessionOrRedirect } from "@/infrastructure/auth/utils"
import type { GenerateMetadataProps } from "@/shared/types/global"

import { BroadcastEffect } from "./broadcast-effect"

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t("metadata.emailVerified"),
  }
}

export default async function ConfirmSuccessPage() {
  await getSessionOrRedirect()

  return (
    <>
      <BroadcastEffect />

      <CardConfirmSuccess className="mt-15 md:mt-25" />
    </>
  )
}
