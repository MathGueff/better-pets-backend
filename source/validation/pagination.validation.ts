import { z } from '../config/zod'
import { commonValidationMessages } from '../messages/commons-validation.messages'

const M = commonValidationMessages
const { limit, page } = M.invalid

export const paginationSchema = z.object({
  limit: z.coerce
    .number(limit.type)
    .min(0, limit.min)
    .max(50, limit.max)
    .optional(),
  page: z.coerce.number(page.type).min(0, page.min).optional()
})

export type PaginationSchemaType = z.infer<typeof paginationSchema>
