import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import type { GenerateMetadataProps } from "@/shared/types/global"

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t("metadata.dashboard"),
  }
}

export default function DashboardPage() {
  return <div>Dashboard Page</div>
}
