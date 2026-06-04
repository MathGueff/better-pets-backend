import z from 'zod'
import { userFilterRules, userRules } from './user.rules'

const createUserSchema = z.object(userRules).strict().openapi('CreateUser')
const filterUserSchema = z
  .object(userFilterRules)
  .strict()
  .openapi('FilterUser')
export class UserValidations {
  static create = createUserSchema
  static filter = filterUserSchema
}

export type CreateUserDTO = z.infer<typeof UserValidations.create>
