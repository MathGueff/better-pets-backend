import type { IAnimal } from '../models/animalModel'
import animal from '../models/animalModel'
import { BaseRepository } from '../core/baseRepository'
import {
  CreateAnimalDTO,
  UpdateAnimalDTO
} from '../validation/animalValidation'

export class AnimalRepository extends BaseRepository<
  IAnimal,
  CreateAnimalDTO,
  UpdateAnimalDTO
> {
  constructor() {
    super(animal)
  }
}
