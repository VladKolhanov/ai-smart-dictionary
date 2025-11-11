import { isProd } from '@/lib/env'

import {
  type CLIENT_ERROR_CODES,
  type ERROR_CODES,
  ERROR_MESSAGES,
  type SYSTEM_ERROR_CODES,
} from './definitions'

type Options = { cause?: unknown; message?: string }

class AppError extends Error {
  public readonly code: ERROR_CODES
  public readonly cause?: unknown

  constructor(code: ERROR_CODES, options?: Options) {
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

export class SystemError extends AppError {
  constructor(code: SYSTEM_ERROR_CODES, options?: Options) {
    super(code, options)
  }
}

export class ClientError extends AppError {
  constructor(code: CLIENT_ERROR_CODES, options?: Options) {
    super(code, options)
  }
}
