import { BaseRepository } from '../../core/base.repository'
import { IAnimalEntity } from './animal.model'
import AnimalModel from './animal.schema'
import {
  CreateAnimalDTO,
  UpdateAnimalDTO
} from './animal.validation'

export class AnimalRepository extends BaseRepository<
  IAnimalEntity,
  CreateAnimalDTO,
  UpdateAnimalDTO
> {
  constructor() {
    super(AnimalModel)
  }
}
