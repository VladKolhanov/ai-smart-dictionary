'use server'

import * as dal from '@/lib/db/repositories/words.repository'
import { getWordInsertSchema } from '@/lib/db/schemas/words'
import { parseFormData } from '@/shared/utils/parse-form-data'
import { safeAsyncWithPayload } from '@/shared/utils/safe-async'

export const addWord = safeAsyncWithPayload(async (_state, formData) => {
  const parsedData = parseFormData(getWordInsertSchema(), formData)

  const [result] = await dal.addWord(parsedData.data)

  return result
})
