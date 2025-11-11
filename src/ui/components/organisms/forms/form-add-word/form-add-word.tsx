'use client'

import { useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import {
  getWordsInsertSchema,
  type WordsInsertSchema,
} from '@/lib/db/schemas/words'
import { addWordToDictionaryAction } from '@/lib/services/dictionary/actions'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/ui/components/atoms/button'
import { Form } from '@/ui/components/atoms/form'
import { FormAlert } from '@/ui/components/molecules/form-alert'
import { FormField } from '@/ui/components/molecules/form-field'

type Props = {
  className?: string
}

export const FormAddWord = ({ className }: Props) => {
  const [actionState, formAction, isPending] = useActionState(
    addWordToDictionaryAction,
    null
  )
  const t = useTranslations('validation')
  const schema = getWordsInsertSchema(t)

  const form = useForm<WordsInsertSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      word: '',
      translation: '',
    },
    mode: 'onChange',
    disabled: isPending,
  })

  useEffect(() => {
    if (!actionState) return
    if (actionState.isSuccess) {
      toast.success('The word has been added to your dictionary')
      form.reset()
    }
  }, [actionState, form])

  const isActionError = actionState && !actionState.isSuccess

  return (
    <div className="flex flex-col gap-12">
      {isActionError && <FormAlert variant="error" data={actionState.error} />}

      <Form {...form}>
        <form
          action={formAction}
          className={cn('grid gap-y-7 md:gap-x-6 lg:gap-x-12', className)}
        >
          <FormField<WordsInsertSchema>
            label="Word"
            name="word"
            inputProps={{
              type: 'text',
              autoComplete: 'off',
            }}
          />
          <FormField<WordsInsertSchema>
            label="Translation"
            name="translation"
            inputProps={{
              type: 'text',
              autoComplete: 'off',
            }}
          />
          <Button>Send</Button>
          {/* <Button disabled={!form.formState.isValid || isPending}>Send</Button> */}
        </form>
      </Form>
    </div>
  )
}
