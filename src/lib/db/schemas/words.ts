import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import type z from 'zod'

import { schemaWithIntl } from '@/lib/utils/schema-with-intl'

import { timestamps } from './_helpers'

export const wordsTable = pgTable('words', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  word: varchar({ length: 255 }).notNull(),
  translation: varchar().notNull(),
  ...timestamps,
})

export const getWordsInsertSchema = schemaWithIntl((t) =>
  createInsertSchema(wordsTable, {
    word: (schema) => schema.min(1, t?.('required')),
    translation: (schema) => schema.min(1, t?.('required')),
  })
)

export type WordsInsertSchema = z.infer<
  Awaited<ReturnType<typeof getWordsInsertSchema>>
>
