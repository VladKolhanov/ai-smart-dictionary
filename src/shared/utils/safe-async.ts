/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleError } from '@/core/errors'
import { tryCatch } from '@/shared/utils/try-catch'

type ActionResponse<TData> = {
  isSuccess: boolean
  data: TData | null
  error: ReturnType<typeof handleError> | null
}

const actionResponse = <TData>(
  data: TData,
  error: unknown
): ActionResponse<TData> => {
  if (data || (!data && !error)) {
    return { isSuccess: true, error: null, data }
  }

  return { isSuccess: false, error: handleError(error), data: null }
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
