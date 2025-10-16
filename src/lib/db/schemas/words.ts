import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import type z from 'zod'

import { timestamps } from './_helpers'

export const wordsTable = pgTable('words', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  word: varchar({ length: 255 }).notNull(),
  translation: varchar().notNull(),
  ...timestamps,
})

export const wordsInsertSchema = createInsertSchema(wordsTable)

export type WordsInsertSchema = z.infer<typeof wordsInsertSchema>
