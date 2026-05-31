import { z } from '../../config/zod'

const sortRules = {
  sortBy: z.string().optional(),
  sortOrder: z.enum(['1', '-1'], 'Parâmetro de ordenação inválido').optional()
}
export const sortSchema = z.object(sortRules)

export type SortSchemaType = z.infer<typeof sortSchema>
