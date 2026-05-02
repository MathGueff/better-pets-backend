import { Types } from 'mongoose'
import { z } from '../config/zod'

const objectId = z.custom<string>((value) => {
  if (typeof value === 'string' && Types.ObjectId.isValid(value)) {
    return value
  }
}, 'ID inválido')

const objectIdSchema = z.object({ id: objectId }).strict().openapi('ObjectIdParams')

export { objectIdSchema }
