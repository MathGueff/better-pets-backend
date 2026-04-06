import { BaseRepository } from '../core/baseRepository'
import type { IAnimal } from '../models/animalModel'
import animal from '../models/animalModel'
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
