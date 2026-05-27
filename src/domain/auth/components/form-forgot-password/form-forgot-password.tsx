"use client"

import { useTranslations } from "next-intl"

import type { ForgotPasswordInputSchema } from "@/infrastructure/db/types"
import { getForgotPasswordInputSchema } from "@/infrastructure/db/validation/auth"
import { Form } from "@/shared/components/ui/form"
import { ErrorAlert } from "@/shared/components/widgets/error-alert"
import { FieldInputController } from "@/shared/components/widgets/field-input-controller"
import { FormSubmitButton } from "@/shared/components/widgets/form-submit-button"
import { PersistKeys } from "@/shared/constants"
import { useFormWithAction } from "@/shared/hooks"
import { SendIcon } from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

import * as actions from "../../actions"

type Props = {
  className?: string
}

export const FormForgotPassword = ({ className }: Props) => {
  const { form, actionErrorState, formAction, isPending } = useFormWithAction({
    action: actions.forgotPassword,
    getSchemaFn: getForgotPasswordInputSchema,
    defaultValues: { email: "" },
    persistKey: PersistKeys.FormForgotPassword,
    persistFields: ["email"],
    persistTimeToLive: 1000 * 60 * 60,
    mode: "onChange",
    disableIfPending: true,
  })

  const t = useTranslations("formForgotPassword")

  return (
    <Form {...form}>
      <ErrorAlert
        error={actionErrorState?.error}
        description={actionErrorState?.description}
      />
      <form
        action={formAction}
        className={cn("space-y-6 text-left", className)}
      >
        <FieldInputController<ForgotPasswordInputSchema>
          name="email"
          label={t("labelEmail")}
          inputProps={{
            autoComplete: "email",
            placeholder: t("placeholders.email"),
            type: "email",
          }}
        />

        <FormSubmitButton
          disabled={!form.formState.isValid || isPending}
          className="w-full"
        >
          <SendIcon className="size-4" />
          {t("submitButton")}
        </FormSubmitButton>
      </form>
    </Form>
  )
}
