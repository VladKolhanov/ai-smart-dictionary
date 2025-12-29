/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleError } from '@/core/errors'
import type { ActionResponse } from '@/core/types/global'
import { tryCatch } from '@/shared/utils/try-catch'

const actionResponse = <TData>(
  data: TData,
  error: unknown
): ActionResponse<TData> => {
  if (data || (!data && !error)) {
    return { status: 'success', error: null, data }
  }

  return { status: 'error', error: handleError(error), data: null }
}

export const safeAsyncWithPayload = <TResult>(
  fn: (
    state: ActionResponse<unknown> | null,
    formData: FormData
  ) => Promise<TResult>
) => {
  return async (
    state: ActionResponse<unknown> | null,
    formData: FormData
  ): Promise<ActionResponse<TResult | null>> => {
    const [data, error] = await tryCatch(fn(state, formData))

    return actionResponse(data, error)
  }
}

export const safeAsync = <TResult, TArgs extends any[] = any[]>(
  fn: (...args: TArgs) => Promise<TResult>
): ((...args: TArgs) => Promise<ActionResponse<TResult | null>>) => {
  return async (...args: TArgs) => {
    const [data, error] = await tryCatch(fn(...args))

    return actionResponse(data, error)
  }
}
