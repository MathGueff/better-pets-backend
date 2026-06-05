import z from 'zod'
import { IUserInput } from '../../models/user.model'
import { ZodEntityRules, ZodFilterRules } from '../../utils/zod-types'

export const userRules = {
  name: z
    .string('O nome deve ser uma string')
    .max(50, 'Nome muito grande')
    .min(2, 'Nome muito pequeno'),
  email: z.email('Email informado é inválido'),
  password: z
    .string('Senha inválida')
    .min(6, 'Senha não é segura')
    .max(20, 'Extrapolou na senha ai mermão'),
  photo: z.string('URL inválida')
} satisfies ZodEntityRules<IUserInput>

export const userFilterRules = {
  email: userRules.email.optional(),
  name: userRules.name.optional()
} satisfies ZodFilterRules<IUserInput>
