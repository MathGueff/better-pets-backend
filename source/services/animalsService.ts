import { Types } from 'mongoose'
import type { IAnimal } from '../models/animalModel'
import { AnimalRepository } from '../repositories/animalRepository'
import { BaseService } from '../core/baseService'
import {
  CreateAnimalDTO,
  UpdateAnimalDTO
} from '../validation/animalValidation'
import { ApiError } from '../errors/apiError'
import { AnimalMessages } from '../messages/animalsMessages'

export class AnimalsService extends BaseService {
  private animalRepository: AnimalRepository = new AnimalRepository()

  list() {
    const listed = this.animalRepository.list()
    return listed
  }

  findById(id: string) {
    const found = this.animalRepository.findById(new Types.ObjectId(String(id)))
    return found
  }

  async create(newAnimal: CreateAnimalDTO) {
    await this.exists(newAnimal.name)

    const created = await this.animalRepository.create(newAnimal)

    return created
  }

  async update(id: string, updateAnimal: Partial<UpdateAnimalDTO>) {
    await this.exists(updateAnimal.name)
    const updated = await this.animalRepository.update(
      new Types.ObjectId(String(id)),
      updateAnimal
    )
    return updated
  }

  delete(id: string) {
    const deleted = this.animalRepository.delete(new Types.ObjectId(String(id)))
    return deleted
  }

  private async exists(name?: string) {
    if (!name) return
    const exists = await this.animalRepository.exists({ name })
    if (exists) {
      throw new ApiError(AnimalMessages.alreadyExistsWithName, 400, { name })
    }
  }
}
