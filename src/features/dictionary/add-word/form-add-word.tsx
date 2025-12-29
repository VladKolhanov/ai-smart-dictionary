'use client'

import { useEffect } from 'react'
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
import { FormAlert } from '@/ui/components/molecules/form-alert'
import { FormField } from '@/ui/components/molecules/form-field'

type Props = {
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

  useEffect(() => {
    if (!actionState?.isSuccess) return

    toast.success('The word has been added to your dictionary')
    form.reset()
  }, [actionState, form])

  return (
    <div className="flex flex-col gap-12">
      {actionState?.error && (
        <FormAlert variant="error" data={actionState.error} />
      )}

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
