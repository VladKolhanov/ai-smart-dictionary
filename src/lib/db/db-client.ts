import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import { ENV } from '@/core/env'

const sql = neon(ENV.DATABASE_URL)
export const dbClient = drizzle({ client: sql })
