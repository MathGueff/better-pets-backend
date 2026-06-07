import { Types } from 'mongoose'
import { z } from '../../config/zod'
import {
  AnimalGender,
  IAnimalFilter,
  IAnimalInput
} from './animal.model'
import { ZodEntityRules, ZodFilterRules } from '../../utils/zod-types'

export const animalRules = {
  name: z
    .string('Nome deve ser uma string')
    .min(1, 'Nome é obrigatório')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  breed: z.string('Raça deve ser uma string'),
  gender: z.enum(AnimalGender, 'Gênero inválido'),
  weight: z
    .number('Peso deve ser um número')
    .positive('Peso deve ser um número positivo'),
  height: z
    .number('Tamanho deve ser um número')
    .positive('Tamanho deve ser um número positivo'),
  birthdate: z.coerce
    .date('Data de nascimento deve ser uma data')
    .refine(
      (date) => date < new Date(),
      'Data de nascimento deve ser uma data passada'
    ),
  adoptionDate: z.coerce
    .date('Data de adoção deve ser uma data')
    .refine(
      (date) => date < new Date(),
      'Data de adoção deve ser uma data passada'
    )
    .optional(),
  photo: z.string('Foto deve ser um arquivo válido').optional(),
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
} satisfies ZodEntityRules<IAnimalInput>

export const animalFilterRules = {
  name: animalRules.name.optional(),
  breed: animalRules.breed.optional(),
  gender: animalRules.gender.optional()
} satisfies ZodFilterRules<IAnimalFilter>
