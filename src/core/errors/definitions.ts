export const ErrorCodes = {
  ZodParseSchema: 'ZOD_PARSE_SCHEMA',
  Test: 'TEST',
} as const

export const ErrorMessages: Record<
  (typeof ErrorCodes)[keyof typeof ErrorCodes],
  string
> = {
  [ErrorCodes.ZodParseSchema]:
    'Some fields have been filled out incorrectly. Please correct them.',
  [ErrorCodes.Test]: 'Test',
}

export type ErrorCodes = (typeof ErrorCodes)[keyof typeof ErrorCodes]
