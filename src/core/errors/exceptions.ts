import { isProd } from '@/core/env'

import { ERROR_MESSAGES, type ErrorCodes } from './definitions'

type Options = { cause?: unknown; message?: string }

class AppError extends Error {
  public readonly code
  public readonly cause?: unknown

  constructor(code: ErrorCodes, options?: Options) {
    const message = options?.message ? options.message : ERROR_MESSAGES[code]
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.cause = options?.cause
    if (!isProd) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export class ClientError extends AppError {
  constructor(code: ErrorCodes, options?: Options) {
    super(code, options)
  }
}
