import { useTranslations } from "next-intl"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty"
import { ButtonReturnBack } from "@/shared/components/widgets/button-return-back"
import { ArrowLeftIcon } from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

type Props = {
  pathname: string
  className?: string
}

export const NotFound = ({ pathname, className }: Props) => {
  const t = useTranslations("notFound")

  return (
    <Empty className={cn("w-full max-w-md", className)}>
      <EmptyHeader className="text-center">
        <EmptyTitle className="text-5xl font-bold">{t("title")}</EmptyTitle>
        <EmptyDescription className="text-xl">
          {t("description")}
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="text-center">
        <p className="text-muted-foreground">
          {t.rich("contentPageIsNotExist", {
            pathname: pathname,
            code: (chunks) => (
              <code className="rounded bg-muted px-1 py-0.5 text-sm">
                {chunks}
              </code>
            ),
          })}
        </p>
        <p className="text-sm text-muted-foreground">{t("contentCheckPage")}</p>
      </EmptyContent>

      <EmptyMedia>
        <ButtonReturnBack
          variant="outline"
          size="xl"
        >
          <ArrowLeftIcon className="mr-2 size-4" />
          {t("return")}
        </ButtonReturnBack>
      </EmptyMedia>
    </Empty>
  )
}
