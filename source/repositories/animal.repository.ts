import { BaseRepository } from '../core/base.repository'
import type { IAnimal } from '../models/animal.model'
import animal from '../models/animal.model'
import {
  CreateAnimalDTO,
  UpdateAnimalDTO
} from '../validation/animal.validation'

export class AnimalRepository extends BaseRepository<
  IAnimal,
  CreateAnimalDTO,
  UpdateAnimalDTO
> {
  constructor() {
    super(animal)
  }
}
