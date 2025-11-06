export const SYSTEM_ERROR_CODES = {
  parse_schema: 'PARSE_SCHEMA',
} as const

export const CLIENT_ERROR_CODES = {
  example_client_error: 'EXAMPLE_CLIENT_ERROR',
} as const

export type SYSTEM_ERROR_CODES =
  (typeof SYSTEM_ERROR_CODES)[keyof typeof SYSTEM_ERROR_CODES]
export type CLIENT_ERROR_CODES =
  (typeof CLIENT_ERROR_CODES)[keyof typeof CLIENT_ERROR_CODES]
export type ERROR_CODES = SYSTEM_ERROR_CODES | CLIENT_ERROR_CODES

export const ERROR_MESSAGES: Record<ERROR_CODES, string> = {
  PARSE_SCHEMA: 'Failed to parse data schema.',
  EXAMPLE_CLIENT_ERROR: 'Example.',
}
