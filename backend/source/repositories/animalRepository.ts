import { IAnimal } from '../models/animalModel'
import animal from '../models/animalModel'
import { BaseRepository } from '../core/baseRepository'

export class AnimalRepository extends BaseRepository<IAnimal> {
  constructor() {
    super(animal)
  }
}
