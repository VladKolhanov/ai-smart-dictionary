import { isRedirectError } from 'next/dist/client/components/redirect-error'
import z, { ZodError } from 'zod'

import { ClientError } from './exceptions'
import type { ClientErrorResponse } from './types'

export const handleError = (error: unknown): ClientErrorResponse | never => {
  if (isRedirectError(error)) {
    throw error
  }

  // Handle zod errors
  if (error instanceof ClientError && error.cause instanceof ZodError) {
    if (error.code === 'ZOD_PARSE_SCHEMA') {
      const flattenErrors = z.flattenError(error.cause)

      return {
        type: 'parse-schema',
        message: error.message,
        fields: flattenErrors.fieldErrors,
      }
    } else {
      return {
        type: 'default',
        message: error.message,
      }
    }
  }

  throw error
}
