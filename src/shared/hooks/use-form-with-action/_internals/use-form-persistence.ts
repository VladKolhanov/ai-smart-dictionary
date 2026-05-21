import { useEffect, useRef } from "react"
import { type FieldValues, type UseFormReturn, useWatch } from "react-hook-form"
import Cookie from "js-cookie"

import type { PersistKeys } from "@/shared/constants"
import type { PlainObject } from "@/shared/types/global"
import { debounce } from "@/shared/utils/debounce"
import * as localStorage from "@/shared/utils/local-storage"

type LocalStorageData<TValues> = {
  data: TValues
  timestamp: number
}

type UseFormPersistenceProps<TValues extends FieldValues> = {
  form: UseFormReturn<TValues>
  persistKey?: PersistKeys
  persistFields?: (keyof TValues)[]
  persistDebounceMs?: number
  persistTimeToLive?: number
  actionStatus?: "init" | "success" | "error"
  isPending?: boolean
}

export function useFormPersistence<TValues extends FieldValues>({
  form,
  persistKey,
  persistFields,
  persistDebounceMs = 300,
  persistTimeToLive,
  actionStatus,
  isPending,
}: UseFormPersistenceProps<TValues>) {
  const isLoadedRef = useRef(false)
  const watchedValues = useWatch({
    control: form.control,
  })

  /* Get persist data */
  useEffect(() => {
    if (!persistKey || isLoadedRef.current) return

    isLoadedRef.current = true

    const persistData =
      localStorage.getItem<LocalStorageData<TValues>>(persistKey)

    if (!persistData) return

    if (persistTimeToLive) {
      const isDataLive = persistData.timestamp + persistTimeToLive > Date.now()

      if (!isDataLive) {
        Cookie.remove(persistKey)
        localStorage.removeItem(persistKey)
        return
      }
    }

    const valuesToApply =
      persistFields && persistFields.length > 0
        ? persistFields.reduce<Partial<TValues>>((acc, key) => {
            const value = persistData.data[key]

            if (value !== undefined) {
              acc[key] = value
            }

            return acc
          }, {})
        : persistData.data

    form.reset({
      ...form.getValues(),
      ...valuesToApply,
    })
  }, [persistKey, form, persistFields, persistTimeToLive])

  /* Set persist data */
  useEffect(() => {
    if (!persistKey) return

    const saveToLocalStorage = debounce((values: Partial<TValues>) => {
      Cookie.set(persistKey, "true")
      localStorage.setItem(persistKey, {
        data: values,
        timestamp: Date.now(),
      })
    }, persistDebounceMs)

    const formData = Object.entries(watchedValues).reduce<PlainObject>(
      (acc, [key, value]) => {
        if (!persistFields || persistFields.includes(key)) {
          acc[key] = value
        }

        return acc
      },
      {}
    )

    const isEmptyValues = Object.values(formData).every(
      (value) =>
        value === "" || value === null || value === undefined || value === false
    )

    if (isEmptyValues) {
      Cookie.remove(persistKey)
      localStorage.removeItem(persistKey)
      return
    }

    saveToLocalStorage(formData as Partial<TValues>)

    return () => {
      saveToLocalStorage.cancel()
    }
  }, [watchedValues, persistKey, persistDebounceMs, persistFields])

  /* Clear persist data */
  useEffect(() => {
    if (!persistKey) return

    if (actionStatus === "success") {
      Cookie.remove(persistKey)
      localStorage.removeItem(persistKey)
    }

    return () => {
      if (isPending && !Cookie.get(persistKey)) {
        localStorage.removeItem(persistKey)
      }
    }
  }, [actionStatus, persistKey, isPending])
}
