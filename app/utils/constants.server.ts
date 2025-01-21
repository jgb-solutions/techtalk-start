import { z } from 'zod'

export const env = z
  .object({
    ADMIN_USERNAME: z.string(),
    ADMIN_PASSWORD: z.string()
  })
  .parse(process.env)