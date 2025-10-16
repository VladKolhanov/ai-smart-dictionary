import { DrizzleQueryError } from 'drizzle-orm'

import {
  DatabaseException,
  EmptyResultException,
  UnknownException,
  ValidationException,
} from './exceptions'

export type NormalizedError = { message: string; code: string; cause?: unknown }

export const normalizeError = (error: unknown): NormalizedError => {
  console.error(error)

  if (
    error instanceof EmptyResultException ||
    error instanceof ValidationException
  ) {
    const { message, code, cause } = error
    return { message, code, cause }
  }

  if (!(error instanceof Error)) {
    throw new UnknownException('Unknown non-error value thrown', error)
  }

  if (error instanceof DrizzleQueryError) {
    throw new DatabaseException(error.message, error.cause)
  }

  throw new UnknownException(error.message, error.cause)
}
