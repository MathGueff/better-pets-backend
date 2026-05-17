import { BaseRepository } from '../core/base.repository'
import { IAnimalEntity } from '../models/animal.model'
import animalModel from '../schemas/animal.schema'
import {
  CreateAnimalDTO,
  UpdateAnimalDTO
} from '../validation/animal.validation'

export class AnimalRepository extends BaseRepository<
  IAnimalEntity,
  CreateAnimalDTO,
  UpdateAnimalDTO
> {
  constructor() {
    super(animalModel)
  }
}
