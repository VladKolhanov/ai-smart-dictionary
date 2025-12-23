import { createInsertSchema } from 'drizzle-zod'
import type z from 'zod'

import { schemaWithIntl } from '@/shared/utils/schema-with-intl'

import { wordsTable } from '../tables/words'

export const getWordInsertSchema = schemaWithIntl((t) =>
  createInsertSchema(wordsTable, {
    word: (schema) => schema.min(1, t?.('required')),
    translation: (schema) => schema.min(1, t?.('required')),
  })
)

export type WordInsertSchema = z.infer<
  Awaited<ReturnType<typeof getWordInsertSchema>>
>
