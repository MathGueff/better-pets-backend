import { z } from '../config/zod'

export const sortSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(['1', '-1'], "Parâmetro de ordenação inválido").optional()
})

export type SortSchemaType = z.infer<typeof sortSchema>
