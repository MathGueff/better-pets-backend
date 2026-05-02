import { Types } from 'mongoose'
import { z } from '../config/zod'

const objectIdSchema = z
  .object({
    id: z
      .string()
      .refine((value) => Types.ObjectId.isValid(value), {
        message: 'ID inválido'
      })
  })
  .openapi('ObjectIdParams')

export { objectIdSchema }
