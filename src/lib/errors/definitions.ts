export const ERROR_CODES = {
  test: 'test',
  zod_parse_schema: 'ZOD_PARSE_SCHEMA',
} as const

export type ErrorCodes = (typeof ERROR_CODES)[keyof typeof ERROR_CODES]

export const ERROR_MESSAGES: Record<ErrorCodes, string> = {
  test: 'test',
  ZOD_PARSE_SCHEMA:
    'Some fields have been filled out incorrectly. Please correct them.',
}
