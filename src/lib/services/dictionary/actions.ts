'use server'

import * as dal from '@/lib/db/dal/words'
import { getWordsInsertSchema } from '@/lib/db/schemas/words'
import { parseFormData } from '@/lib/utils/parse-form-data'
import { safeAsyncWithPayload } from '@/lib/utils/safe-async'

export const addWordToDictionaryAction = safeAsyncWithPayload(
  async (_state, formData) => {
    const parsedData = parseFormData(getWordsInsertSchema(), formData)

    const [result] = await dal.addWord(parsedData.data)

    return result
  }
)
