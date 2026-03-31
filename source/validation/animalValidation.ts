import z from 'zod'
import { AnimalGender, type IAnimal } from '../models/animalModel'

const rules = {
  name: z
    .string('Nome deve ser uma string')
    .min(1, 'Nome é obrigatório')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  age: z
    .number('Idade deve ser um número')
    .positive('Idade deve ser um número positivo'),
  breed: z.string('Raça deve ser uma string'),
  gender: z.enum(AnimalGender, 'Gênero inválido'),
  weight: z
    .number('Peso deve ser um número')
    .positive('Peso deve ser um número positivo'),
  size: z
    .number('Tamanho deve ser um número')
    .positive('Tamanho deve ser um número positivo'),
  bornDate: z.date('Data de nascimento deve ser uma data'),
  adoptionDate: z.date('Data de adoção deve ser uma data'),
  photo: z.string('Foto deve ser um arquivo válido'),
  schedule: z
    .object({
      walk: z.object({
        timeExpected: z.date('Data de nascimento deve ser uma data')
      }),
      feed: z.object({
        timeExpected: z.date('Data de nascimento deve ser uma data')
      }),
      water: z.object({
        timeExpected: z.date('Data de nascimento deve ser uma data')
      })
    })
    .optional()
} satisfies { [K in keyof IAnimal]: z.ZodTypeAny }

const createAnimalSchema = z.object(rules)

const updateAnimalSchema = createAnimalSchema.partial()

export const AnimalValidations = {
  create: createAnimalSchema,
  update: updateAnimalSchema
}
export type CreateAnimalDTO = z.infer<typeof createAnimalSchema>
export type UpdateAnimalDTO = z.infer<typeof updateAnimalSchema>
