import { z } from '../../config/zod'

const sortRules = {
  sortBy: z.string().optional(),
  sortOrder: z.enum(['DESC', 'ASC'], 'Parâmetro de ordenação inválido').optional()
}
export const sortSchema = z.object(sortRules)

export type SortSchemaType = z.infer<typeof sortSchema>
