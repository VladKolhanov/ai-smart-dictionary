'use client'

import { useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import * as actions from '@/features/dictionary/actions'
import {
  getWordInsertSchema,
  type WordInsertSchema,
} from '@/lib/db/schemas/words'
import { cn } from '@/shared/utils/cn'
import { debounce } from '@/shared/utils/debounce'
import * as localStorage from '@/shared/utils/local-storage'
import { Button } from '@/ui/components/atoms/button'
import { Form } from '@/ui/components/atoms/form'
import { FormAlert } from '@/ui/components/molecules/form-alert'
import { FormField } from '@/ui/components/molecules/form-field'

import { FormAddWordDefaultValues } from './form-default-values'

const LS_KEY = 'form-add-word'
const DEBOUNCE_MS = 500

type Props = {
  className?: string
}

export const FormAddWord = ({ className }: Props) => {
  const [actionState, formAction, isPending] = useActionState(
    actions.addWord,
    null
  )
  const t = useTranslations('validation')

  const form = useForm<WordInsertSchema>({
    resolver: zodResolver(getWordInsertSchema(t)),
    defaultValues: localStorage.getItem(LS_KEY) || FormAddWordDefaultValues,
    mode: 'onChange',
    disabled: isPending,
  })

  useEffect(() => {
    if (!actionState?.isSuccess) return

    toast.success('The word has been added to your dictionary')
    form.reset()
    localStorage.removeItem(LS_KEY)
  }, [actionState, form])

  useEffect(() => {
    const saveToLocalStorage = debounce((values) => {
      localStorage.setItem(LS_KEY, values)
    }, DEBOUNCE_MS)

    const unsubscribe = form.subscribe({
      formState: {
        values: true,
      },
      callback: (formState) => {
        saveToLocalStorage(formState.values)
      },
    })

    return () => {
      unsubscribe()
      saveToLocalStorage.cancel()
      localStorage.removeItem(LS_KEY)
    }
  }, [form])

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
