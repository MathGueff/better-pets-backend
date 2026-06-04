import z from 'zod'
import { userRules } from './user.rules'

const createUserSchema = z.object(userRules).strict().openapi('CreateUser')
export class UserValidations {
  static create = createUserSchema
}
