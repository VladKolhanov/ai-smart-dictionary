import { ClientError } from './exceptions'

export const transformClientError = (error: unknown) => {
  if (error instanceof ClientError) {
    const { message } = error

    return {
      message,
    }
  }

  throw error
}
