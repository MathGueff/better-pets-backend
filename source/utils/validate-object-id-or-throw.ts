import { objectIdSchema } from '../validation/global/objectid.validation'
import { validateOrThrow } from './validate-or-throw'

export const validateObjectIdOrThrow = (
  inputId: string | undefined | string[]
) => {
  const { id } = validateOrThrow({
    schema: objectIdSchema,
    entry: { id: inputId },
    message: 'Insira um ID válido'
  })
  return id
}
