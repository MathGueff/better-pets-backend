import { z } from '../config/zod'

export const ResponseSchema = {
  success: (dataSchema: z.ZodTypeAny) =>
    z.object({
      message: z.string().openapi({ example: 'Sucesso' }),
      code: z.number().openapi({ example: 200 }),
      success: z.boolean().openapi({ example: true }),
      data: dataSchema
    }),
  error: (message: string, code: number, error?: unknown) =>
    z.object({
      message: z.string().openapi({ example: message }),
      code: z.number().openapi({ example: code }),
      success: z.boolean().openapi({ example: false }),
      error: z.any().optional().openapi({ example: error })
    })
}
