import { transformClientError } from '@/lib/errors/transform-client-error'

type SuccessResponse<TData> = {
  isSuccess: true
  data: TData | null
}

type ErrorResponse = {
  isSuccess: false
  error: ReturnType<typeof transformClientError>
}

export type HttpResponse<TData = null> = SuccessResponse<TData> | ErrorResponse

export const response = <TData>(
  data: TData,
  error: unknown
): HttpResponse<TData> => {
  if (data || (!data && !error)) {
    return { isSuccess: true, data }
  }

  return { isSuccess: false, error: transformClientError(error) }
}
