import { NeonDbError } from '@neondatabase/serverless'
import { DrizzleQueryError } from 'drizzle-orm'
import z, { ZodError } from 'zod'

import { CLIENT_ERROR_CODES } from './definitions'
import { ClientError, SystemError } from './exceptions'

export const handleError = (
  error: unknown
):
  | {
      payload:
        | string
        | { message: string; description: Record<string, string[]> }
    }
  | never => {
  if (
    error instanceof DrizzleQueryError &&
    error.cause instanceof NeonDbError
  ) {
    if (error.cause.code === '42703') {
      throw new SystemError('DB_COLUMN_NOT_EXIST', {
        message: error.cause.message,
        cause: error,
      })
    }

    if (error.cause.code === '23502') {
      throw new SystemError('DB_COLUMN_NULL_VALUE', {
        message: error.cause.message,
        cause: error,
      })
    }
  }

  if (error instanceof ClientError) {
    if (
      error.code === CLIENT_ERROR_CODES.zod_parse_schema &&
      error.cause instanceof ZodError
    ) {
      const flattenErrors = z.flattenError(error.cause)

      return {
        payload: {
          message: error.message,
          description: flattenErrors.fieldErrors,
        },
      }
    } else {
      const { message } = error

      return {
        payload: message,
      }
    }
  } else {
    throw error
  }
}
