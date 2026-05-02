import { z } from '../config/zod'
import { BadValidationError } from '../errors/bad-validation.error'

type ValidationFactoryInput<T> = {
  schema: z.ZodType<T>
  entry: unknown
  message?: string
}
export const validateOrThrow = <T>(input: ValidationFactoryInput<T>): T => {
  const { schema, entry, message } = input
  const result = schema.safeParse(entry)

  if (!result.success) {
    throw new BadValidationError({
      message: message ?? 'Erro de validação',
      error: result.error
    })
  }

  return result.data
}
