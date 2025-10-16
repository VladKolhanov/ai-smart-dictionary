export class AppException extends Error {
  public readonly code: string
  public readonly cause?: unknown

  constructor(message: string, code: string, cause?: unknown) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.cause = cause
    Error.captureStackTrace(this, this.constructor)
  }
}

export class DatabaseException extends AppException {
  constructor(message: string, cause?: unknown) {
    super(message, 'DATABASE_ERROR', cause)
  }
}

export class EmptyResultException extends AppException {
  constructor(entity: string, context?: string) {
    super(
      `${entity} returned no data${context ? ` in ${context}` : ''}`,
      'EMPTY_RESULT_ERROR'
    )
  }
}

export class ValidationException extends AppException {
  constructor(message: string, cause?: unknown) {
    super(message, 'VALIDATION_ERROR', cause)
  }
}

export class UnknownException extends AppException {
  constructor(message: string, cause?: unknown) {
    super(message, 'UNKNOWN ERROR', cause)
  }
}
