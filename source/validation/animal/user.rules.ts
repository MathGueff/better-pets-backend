import z from 'zod'
import { IUserInput } from '../../models/user.model'
import { ZodEntityRules } from '../../utils/zod-types'

export const userRules = {
  name: z.string('O nome deve ser uma string').max(50, 'Nome muito grande').min(2, 'Nome muito pequeno')
} satisfies {
  [K in keyof ZodEntityRules<IUserInput>]: z.ZodType
}
