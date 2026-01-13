import { type ErrorCodes, ErrorMessages } from './definitions'

type Options = {
  message?: string
  details?: Record<string, unknown>
}

export class AppError extends Error {
  readonly code
  readonly details?: Options['details']

  constructor(code: ErrorCodes, options?: Options) {
    const message = options?.message ? options.message : ErrorMessages[code]
    super(message)

    this.code = code
    this.details = options?.details
  }
}
