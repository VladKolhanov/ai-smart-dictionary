'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import * as actions from '@/features/dictionary/actions'
import {
  getWordInsertSchema,
  type WordInsertSchema,
} from '@/lib/db/schemas/words'
import { useFormWithAction } from '@/shared/hooks/use-form-with-action/use-form-with-action'
import { cn } from '@/shared/utils/cn'
import { Button } from '@/ui/components/atoms/button'
import { Form } from '@/ui/components/atoms/form'
import { FormErrorAlert } from '@/ui/components/molecules/form-error-alert'
import { FormField } from '@/ui/components/molecules/form-field'

export type Props = {
  className?: string
}

export const FormAddWord = ({ className }: Props) => {
  const { form, actionState, formAction, isPending } = useFormWithAction({
    action: actions.addWord,
    getSchemaFn: getWordInsertSchema,
    defaultValues: { word: '', translation: '' },
    persistKey: 'form-add-word',
    mode: 'onChange',
    disableIfPending: true,
  })

  const t = useTranslations('formAddWord')

  useEffect(() => {
    if (actionState.status === 'success') {
      toast.success(t('toastSuccess'))
      form.reset()
    }
  }, [actionState.status, form, t])

  return (
    <div className="flex w-1/3 flex-col gap-12">
      <FormErrorAlert error={actionState.error} />

      <Form {...form}>
        <form
          action={formAction}
          className={cn('grid gap-y-7 md:gap-x-6 lg:gap-x-12', className)}
        >
          <FormField<WordInsertSchema>
            label="Word"
            name="word"
            inputProps={{
              type: 'text',
              autoComplete: 'off',
            }}
          />
          <FormField<WordInsertSchema>
            label="Translation"
            name="translation"
            inputProps={{
              type: 'text',
              autoComplete: 'off',
            }}
          />

          <Button disabled={!form.formState.isValid || isPending}>Send</Button>
        </form>
      </Form>
    </div>
  )
}
