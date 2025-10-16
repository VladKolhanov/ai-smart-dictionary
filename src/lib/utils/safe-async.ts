/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type NormalizedError,
  normalizeError,
} from '@/lib/errors/normalize-error'
import { tryCatch } from '@/lib/utils/try-catch'

type SuccessResponse<TData> = {
  isSuccess: true
  data: TData | null
}

type ErrorResponse = {
  isSuccess: false
  error: NormalizedError
}

type HttpResponse<TData = null> = SuccessResponse<TData> | ErrorResponse

const normalizeData = <TData>(
  data: TData,
  error: unknown
): HttpResponse<TData> => {
  if (data || (!data && !error)) {
    return { isSuccess: true, data }
  }

  return { isSuccess: false, error: normalizeError(error) }
}

export const safeAsyncWithPayload = <TResult>(
  fn: (
    state: HttpResponse<unknown> | null,
    formData: FormData
  ) => Promise<TResult>
) => {
  return async (
    state: HttpResponse<unknown> | null,
    formData: FormData
  ): Promise<HttpResponse<TResult>> => {
    const [data, error] = await tryCatch(fn(state, formData))

    return normalizeData(data, error)
  }
}

export const safeAsync = <TResult, TArgs extends any[] = any[]>(
  fn: (...args: TArgs) => Promise<TResult>
): ((...args: TArgs) => Promise<HttpResponse<TResult>>) => {
  return async (...args: TArgs) => {
    const [data, error] = await tryCatch(fn(...args))

    return normalizeData(data, error)
  }
}
