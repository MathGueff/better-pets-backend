import { z } from '../../config/zod'
import { animalFilterRules, animalRules } from './animal.rules'

const createAnimalSchema = z
  .object(animalRules)
  .strict()
  .openapi('CreateAnimal')

const updateAnimalSchema = z
  .object(animalRules)
  .partial()
  .openapi('UpdateAnimal')

const filterAnimalSchema = z
    .object(animalFilterRules)
    .strict()
    .openapi('AnimalFilterSchema')

export class AnimalValidations {
  static create = createAnimalSchema
  static update = updateAnimalSchema
  static filter = filterAnimalSchema
}

export type CreateAnimalDTO = z.infer<typeof createAnimalSchema>
export type UpdateAnimalDTO = z.infer<typeof updateAnimalSchema>
export type FilterAnimalDTO = z.infer<typeof filterAnimalSchema>