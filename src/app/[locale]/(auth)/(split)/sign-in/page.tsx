import { type Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { CardSignIn } from "@/domain/auth/components/card-sign-in"
import { redirectIfSessionExist } from "@/infrastructure/auth/utils"
import type { GenerateMetadataProps, PageProps } from "@/shared/types/global"

import { BroadcastEffect } from "./broadcast-effect"
import { ToastEffect } from "./toast-effect"

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t("metadata.sign-in"),
  }
}

type Props = PageProps<
  undefined,
  { email: string; isResetPasswordCompleted: string }
>

export default async function SignInPage({ searchParams }: Props) {
  await redirectIfSessionExist()

  const { email, isResetPasswordCompleted } = await searchParams

  return (
    <>
      <BroadcastEffect
        isResetPasswordCompleted={!!isResetPasswordCompleted}
        email={email}
      />
      <ToastEffect isResetPasswordCompleted={!!isResetPasswordCompleted} />

      <CardSignIn email={email} />
    </>
  )
}
