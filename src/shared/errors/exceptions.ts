import type { PlainObject } from "@/shared/types/global"

import {
  type AppErrorCodes,
  AppErrorMessages,
  type BusinessErrorCodes,
} from "./definitions"

type Options = {
  details?: PlainObject
}

export class BusinessError extends Error {
  readonly code
  readonly details?: Options["details"]

  constructor(code: BusinessErrorCodes, options?: Options) {
    super()

    this.code = code
    this.details = options?.details
  }
}

export class AppError extends Error {
  readonly code
  readonly details?: Options["details"]

  constructor(code: AppErrorCodes, options?: Options) {
    super(AppErrorMessages[code])

    this.code = code
    this.details = options?.details
  }
}
