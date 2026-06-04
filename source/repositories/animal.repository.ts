import { BaseRepository } from '../core/base.repository'
import { IAnimalEntity } from '../models/animal.model'
import AnimalModel from '../schemas/animal.schema'
import {
  CreateAnimalDTO,
  UpdateAnimalDTO
} from '../validation/animal/animal.validation'

export class AnimalRepository extends BaseRepository<
  IAnimalEntity,
  CreateAnimalDTO,
  UpdateAnimalDTO
> {
  constructor() {
    super(AnimalModel)
  }
}
