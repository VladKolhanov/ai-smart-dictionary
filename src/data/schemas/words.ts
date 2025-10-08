import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

import { timestamps } from './_helpers'

export const wordsTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  word: varchar({ length: 255 }).notNull(),
  translation: integer().notNull(),
  ...timestamps,
})
