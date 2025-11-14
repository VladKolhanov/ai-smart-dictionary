import { NeonDbError } from '@neondatabase/serverless'
import { DrizzleQueryError } from 'drizzle-orm'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import z, { ZodError } from 'zod'

import { SYSTEM_ERROR_CODES } from './definitions'
import { ClientError, SystemError } from './exceptions'
import type { ClientErrorResponse } from './types'

export const handleError = (error: unknown): ClientErrorResponse | never => {
  if (isRedirectError(error)) {
    throw error
  }

  // Handle database errors
  if (
    error instanceof DrizzleQueryError &&
    error.cause instanceof NeonDbError
  ) {
    const messageMap: Record<string, SYSTEM_ERROR_CODES> = {
      '42703': 'DB_COLUMN_NOT_EXIST',
      '23502': 'DB_COLUMN_NULL_VALUE',
    }

    const code = error.cause.code
      ? (messageMap[error.cause.code] ??
        SYSTEM_ERROR_CODES.db_query_error_unknown)
      : SYSTEM_ERROR_CODES.db_query_error_unknown

    throw new SystemError(code, {
      message: error.cause.message,
      cause: error,
    })
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
