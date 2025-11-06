import type { ZodType } from 'zod'

import { SystemError } from '@/lib/errors'

export const parseFormData = <TSchema extends ZodType>(
  schema: TSchema,
  formData: FormData
) => {
  const parsedData = schema.safeParse(Object.fromEntries(formData))

  if (!parsedData.success) {
    throw new SystemError('PARSE_SCHEMA', parsedData.error)
  }

  return parsedData
}
