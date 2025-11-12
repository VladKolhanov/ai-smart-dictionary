export const SYSTEM_ERROR_CODES = {
  db_column_not_exist: 'DB_COLUMN_NOT_EXIST',
  db_column_null_value: 'DB_COLUMN_NULL_VALUE',
  db_query_error_unknown: 'DB_QUERY_ERROR_UNKNOWN',
} as const

export const CLIENT_ERROR_CODES = {
  zod_parse_schema: 'ZOD_PARSE_SCHEMA',
} as const

export type SYSTEM_ERROR_CODES =
  (typeof SYSTEM_ERROR_CODES)[keyof typeof SYSTEM_ERROR_CODES]
export type CLIENT_ERROR_CODES =
  (typeof CLIENT_ERROR_CODES)[keyof typeof CLIENT_ERROR_CODES]
export type ERROR_CODES = SYSTEM_ERROR_CODES | CLIENT_ERROR_CODES

export const ERROR_MESSAGES: Record<ERROR_CODES, string> = {
  ZOD_PARSE_SCHEMA:
    'Some fields have been filled out incorrectly. Please correct them.',
  DB_COLUMN_NOT_EXIST: 'Column does not exist',
  DB_COLUMN_NULL_VALUE: 'Null value in column violates not-null constraint',
  DB_QUERY_ERROR_UNKNOWN: 'Unknown database error',
}
