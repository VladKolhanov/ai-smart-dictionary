import type { ZodType } from 'zod'

import { ValidationException } from '@/lib/errors/exceptions'

export const parseFormData = <TSchema extends ZodType>(
  schema: TSchema,
  formData: FormData
) => {
  const parsedData = schema.safeParse(Object.fromEntries(formData))

  if (!parsedData.success) {
    throw new ValidationException(
      parsedData.error.message,
      parsedData.error.cause
    )
  }

  return parsedData
}
