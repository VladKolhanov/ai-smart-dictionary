import type { ZodType } from 'zod'

import { ClientError } from '@/core/errors'

export const parseFormData = <TSchema extends ZodType>(
  schema: TSchema,
  formData: FormData
) => {
  const parsedData = schema.safeParse(Object.fromEntries(formData))

  if (!parsedData.success) {
    throw new ClientError('ZOD_PARSE_SCHEMA', { cause: parsedData.error })
  }

  return parsedData
}
