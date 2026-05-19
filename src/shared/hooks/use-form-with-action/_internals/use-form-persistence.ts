import { useEffect, useRef } from "react"
import type { FieldValues, Path, UseFormReturn } from "react-hook-form"
import Cookie from "js-cookie"

import type { PersistKeys } from "@/shared/constants"
import type { PlainObject } from "@/shared/types/global"
import { debounce } from "@/shared/utils/debounce"
import * as localStorage from "@/shared/utils/local-storage"
import { objectKeys } from "@/shared/utils/object"

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

function applyDataToForm<TValues extends FieldValues>(
  form: UseFormReturn<TValues>,
  persistData: LocalStorageData<TValues>,
  persistFields?: (keyof TValues)[]
) {
  const fieldsToApply =
    persistFields && persistFields.length > 0
      ? persistFields
      : objectKeys(persistData)

  fieldsToApply.forEach((key) => {
    const value = persistData.data[key]
    if (value !== undefined) {
      form.setValue(key as Path<TValues>, value)
    }
  })
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

  /* Get persist data */
  useEffect(() => {
    if (!persistKey || isLoadedRef.current) return

    const persistData =
      localStorage.getItem<LocalStorageData<TValues>>(persistKey)

    if (!persistData) return

    if (persistTimeToLive) {
      const isDataLive = persistData.timestamp + persistTimeToLive > Date.now()

      if (isDataLive) {
        applyDataToForm(form, persistData, persistFields)
        isLoadedRef.current = true
      } else {
        Cookie.remove(persistKey)
        localStorage.removeItem(persistKey)
        isLoadedRef.current = false
      }
    } else {
      applyDataToForm(form, persistData, persistFields)
      isLoadedRef.current = true
    }
  }, [persistKey, form, persistFields, persistTimeToLive])

  /* Set persist data */
  useEffect(() => {
    if (!persistKey) return

    const saveToLocalStorage = debounce((values) => {
      Cookie.set(persistKey, "true")
      localStorage.setItem(persistKey, values)
    }, persistDebounceMs)

    const subscription = form.watch((values) => {
      const formData = Object.entries(values).reduce<PlainObject>(
        (acc, [key, value]) => {
          if (!persistFields || persistFields.includes(key)) {
            acc[key] = value
          }

          return acc
        },
        {}
      )

      const isEmptyValues = Object.values(formData).every(
        (value) => value === "" || value === null || value === undefined
      )

      if (isEmptyValues) {
        Cookie.remove(persistKey)
        localStorage.removeItem(persistKey)
        return
      }

      saveToLocalStorage({ data: formData, timestamp: Date.now() })
    })

    return () => {
      subscription.unsubscribe()
      saveToLocalStorage.cancel()
    }
  }, [form, persistDebounceMs, persistFields, persistKey])

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
