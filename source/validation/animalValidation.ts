import { z } from '../config/zod'
import { AnimalsValidationMessages } from '../messages/animalsValidationMessages'
import { AnimalGender, IAnimal } from '../models/animalModel'
import { ValidationRules } from './validation'

const M = AnimalsValidationMessages

const rules = {
  name: z.string(M.name.invalid).min(1, M.name.required).max(50, M.name.max),
  breed: z.string(M.breed.invalid),
  gender: z.enum(AnimalGender, M.gender.invalid),
  weight: z.number(M.weight.invalid).positive(M.weight.positive),
  size: z.number(M.size.invalid).positive(M.size.positive),
  bornDate: z.coerce.date(M.bornDate.date),
  adoptionDate: z.coerce.date(M.adoptionDate.date),
  photo: z.string(M.photo.invalid),
  schedule: z
    .object(
      {
        walk: z.object(
          { timeExpected: z.coerce.date(M.schedule.time) },
          M.schedule.walk
        ),
        feed: z.object(
          { timeExpected: z.coerce.date(M.schedule.time) },
          M.schedule.feed
        ),
        water: z.object(
          { timeExpected: z.coerce.date(M.schedule.time) },
          M.schedule.water
        )
      },
      M.schedule.invalid
    )
    .optional()
} satisfies { [K in keyof ValidationRules<IAnimal, '_id'>]: z.ZodType }

const createAnimalSchema = z.object(rules).openapi('CreateAnimal')

const updateAnimalSchema = createAnimalSchema.partial().openapi('UpdateAnimal')

export const AnimalValidations = {
  create: createAnimalSchema,
  update: updateAnimalSchema
}

export type CreateAnimalDTO = z.infer<typeof createAnimalSchema>
export type UpdateAnimalDTO = z.infer<typeof updateAnimalSchema>
