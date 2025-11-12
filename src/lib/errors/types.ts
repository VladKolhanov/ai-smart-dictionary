type DefaultErrorResponse = { type: 'default'; message: string }

type ParseSchemaErrorResponse = {
  type: 'parse-schema'
  message: string
  fields: Record<string, string[]>
}

export type ClientErrorResponse =
  | DefaultErrorResponse
  | ParseSchemaErrorResponse
