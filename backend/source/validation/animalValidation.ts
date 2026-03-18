import z from 'zod'
import { IAnimal } from '../models/animalModel'

const rules = {
  name: z
    .string('Nome deve ser uma string')
    .min(1, 'Nome é obrigatório')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  age: z
    .number('Idade deve ser um número')
    .positive('Idade deve ser um número positivo')
} satisfies { [K in keyof IAnimal]: z.ZodTypeAny }

const createAnimalSchema = z.object(rules)

const updateAnimalSchema = createAnimalSchema.partial()

export const AnimalValidations = {
  create: createAnimalSchema,
  update: updateAnimalSchema
}
export type CreateAnimalDTO = z.infer<typeof createAnimalSchema>
export type UpdateAnimalDTO = z.infer<typeof updateAnimalSchema>
