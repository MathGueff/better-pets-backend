import { z } from '../config/zod'
import { TApiError, TApiSuccess } from '../shared/response'

export const ResponseSchema = {
  success: (dataSchema: z.ZodType<unknown>) =>
    z.object({
      message: z.string().openapi({ example: 'Sucesso' }),
      code: z.number().openapi({ example: 200 }),
      success: z.boolean().openapi({ example: true }),
      data: dataSchema
    } satisfies { [K in keyof TApiSuccess<unknown>]: z.ZodType }),
  error: (message: string, code: number, error?: unknown) =>
    z.object({
      message: z.string().openapi({ example: message }),
      code: z.number().openapi({ example: code }),
      success: z.boolean().openapi({ example: false }),
      error: z.unknown().optional().openapi({ example: error })
    } satisfies { [K in keyof TApiError<unknown>]: z.ZodType })
}
