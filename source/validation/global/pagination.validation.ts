import { z } from '../../config/zod'

const paginationRules = {
  limit: z.coerce
    .number('Limite deve ser um número')
    .min(0, 'Limite deve ser maior do que 0')
    .max(50, 'Limite deve ser menor do que 50')
    .optional(),
  page: z.coerce
    .number('Pagina deve ser um número')
    .min(0, 'Página deve ser maior do que 0')
    .optional()
}

export const paginationSchema = z.object(paginationRules)

export type PaginationSchemaType = z.infer<typeof paginationSchema>
