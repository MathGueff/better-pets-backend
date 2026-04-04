import { AnimalGender, type IAnimal } from '../models/animalModel'
import { z } from '../config/zod'

const rules = {
  name: z
    .string('Nome deve ser uma string')
    .min(1, 'Nome é obrigatório')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  breed: z.string('Raça deve ser uma string'),
  gender: z.enum(AnimalGender, 'Gênero inválido'),
  weight: z
    .number('Peso deve ser um número')
    .positive('Peso deve ser um número positivo'),
  size: z
    .number('Tamanho deve ser um número')
    .positive('Tamanho deve ser um número positivo'),
  bornDate: z.coerce.date('Data de nascimento deve ser uma data'),
  adoptionDate: z.coerce.date('Data de adoção deve ser uma data'),
  photo: z.string('Foto deve ser um arquivo válido'),
  schedule: z
    .object(
      {
        walk: z.object(
          {
            timeExpected: z.coerce.date('Data de nascimento deve ser uma data')
          },
          'Horário de passeio inválido'
        ),
        feed: z.object(
          {
            timeExpected: z.coerce.date('Data de nascimento deve ser uma data')
          },
          'Horário de alimentação inválido'
        ),
        water: z.object(
          {
            timeExpected: z.coerce.date('Data de nascimento deve ser uma data')
          },
          'Horário de água inválido'
        )
      },
      'Horários inválidos'
    )
    .optional()
} satisfies { [K in keyof IAnimal]: z.ZodType }

const createAnimalSchema = z.object(rules).openapi('CreateAnimal')

const updateAnimalSchema = createAnimalSchema.partial().openapi('UpdateAnimal')

export const AnimalValidations = {
  create: createAnimalSchema,
  update: updateAnimalSchema
}

export type CreateAnimalDTO = z.infer<typeof createAnimalSchema>
export type UpdateAnimalDTO = z.infer<typeof updateAnimalSchema>
