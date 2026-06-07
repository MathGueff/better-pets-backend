import z from 'zod'
import { userFilterRules, userRules } from './user.rules'

const createUserSchema = z.object(userRules).strict().openapi('CreateUser')

const filterUserSchema = z
  .object(userFilterRules)
  .strict()
  .openapi('FilterUser')

const loginUserSchema = z
  .object({ email: userRules.email })
  .strict()
  .openapi('UserLogin')

export class UserValidations {
  static create = createUserSchema
  static filter = filterUserSchema
  static login = loginUserSchema
}

export type CreateUserDTO = z.infer<typeof UserValidations.create>
