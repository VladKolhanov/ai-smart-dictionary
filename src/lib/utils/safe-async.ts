/* eslint-disable @typescript-eslint/no-explicit-any */
import { tryCatch } from '@/lib/utils/try-catch'

import { type HttpResponse, response } from './response'

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

    return response(data, error)
  }
}

export const safeAsync = <TResult, TArgs extends any[] = any[]>(
  fn: (...args: TArgs) => Promise<TResult>
): ((...args: TArgs) => Promise<HttpResponse<TResult>>) => {
  return async (...args: TArgs) => {
    const [data, error] = await tryCatch(fn(...args))

    return response(data, error)
  }
}
