import { Types } from 'mongoose'
import { z } from '../config/zod'
import { AnimalsValidationMessages } from '../messages/animal-validation.messages'
import { AnimalGender, IAnimalInput } from '../models/animal.model'
import { ValidationRules } from './validation-rules.validation'

const M = AnimalsValidationMessages
const rules = {
  name: z.string(M.name.invalid).min(1, M.name.required).max(50, M.name.max),
  breed: z.string(M.breed.invalid),
  gender: z.enum(AnimalGender, M.gender.invalid),
  weight: z.number(M.weight.invalid).positive(M.weight.positive),
  height: z.number(M.size.invalid).positive(M.size.positive),
  birthdate: z.coerce
    .date(M.bornDate.date)
    .refine((date) => date < new Date(), M.bornDate.past),
  adoptionDate: z.coerce
    .date(M.adoptionDate.date)
    .refine((date) => date < new Date(), M.adoptionDate.past)
    .optional(),
  photo: z.string(M.photo.invalid).optional(),
  schedules: z
    .array(
      z
        .string('ID de agendamento incorreto')
        .refine((value) => Types.ObjectId.isValid(value), {
          message: 'ID de agendamento incorreto'
        })
    )
    .optional(),
  familyId: z.string('ID da família incorreto').optional()
} satisfies { [K in keyof ValidationRules<IAnimalInput>]: z.ZodType }

const createAnimalSchema = z.object(rules).strict().openapi('CreateAnimal')

const updateAnimalSchema = createAnimalSchema.partial().openapi('UpdateAnimal')

export const AnimalValidations = {
  create: createAnimalSchema,
  update: updateAnimalSchema
}

export type CreateAnimalDTO = z.infer<typeof createAnimalSchema>
export type UpdateAnimalDTO = z.infer<typeof updateAnimalSchema>
