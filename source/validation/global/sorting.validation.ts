import { z } from '../../config/zod'

const sortRules = {
  sortBy: z.string().optional(),
  sortOrder: z.enum(['DESC', 'ASC'], 'Ordem deve ser ASC (1) ou DESC (-1)').optional()
}
export const sortSchema = z.object(sortRules)

export type SortSchemaType = z.infer<typeof sortSchema>
