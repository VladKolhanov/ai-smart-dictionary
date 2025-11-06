import { isProd } from '@/lib/env'

import {
  type CLIENT_ERROR_CODES,
  type ERROR_CODES,
  ERROR_MESSAGES,
  type SYSTEM_ERROR_CODES,
} from './definitions'

class AppError extends Error {
  public readonly code: ERROR_CODES
  public readonly cause?: unknown

  constructor(code: ERROR_CODES, cause?: unknown) {
    super(ERROR_MESSAGES[code])
    this.name = this.constructor.name
    this.code = code
    this.cause = cause
    if (!isProd) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export class SystemError extends AppError {
  constructor(code: SYSTEM_ERROR_CODES, cause?: unknown) {
    super(code, cause)
  }
}

export class ClientError extends AppError {
  constructor(code: CLIENT_ERROR_CODES, cause?: unknown) {
    super(code, cause)
  }
}
