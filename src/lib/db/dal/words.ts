import { type WordsInsertSchema, wordsTable } from '../schemas/words'

import { db } from '..'

export const addWord = async (data: WordsInsertSchema) => {
  return await db
    .insert(wordsTable)
    .values(data)
    .returning({ id: wordsTable.id })
}
