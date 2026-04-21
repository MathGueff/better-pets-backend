import { Types } from 'mongoose'
import { BaseService } from '../core/baseService'
import { ApiError } from '../errors/apiError'
import { AnimalMessages } from '../messages/animalsMessages'
import { AnimalRepository } from '../repositories/animalRepository'
import {
  CreateAnimalDTO,
  UpdateAnimalDTO
} from '../validation/animalValidation'

export class AnimalsService extends BaseService {
  constructor(
    private readonly animalRepository: AnimalRepository = new AnimalRepository()
  ) {
    super()
  }

  async list() {
    return await this.animalRepository.list()
  }

  async findById(id: string) {
    return await this.animalRepository.findById(id)
  }

  async create(newAnimal: CreateAnimalDTO) {
    if (await this.exists(newAnimal.name)) {
      throw new ApiError(AnimalMessages.alreadyExistsWithName, 409, {
        newAnimal
      })
    }

    return this.animalRepository.create(newAnimal)
  }

  async update(id: string, updateAnimal: Partial<UpdateAnimalDTO>) {
    if (updateAnimal.name) {
      const existing = await this.animalRepository.exists(updateAnimal)

      if (existing && String(existing._id) !== id) {
        throw new ApiError(AnimalMessages.alreadyExistsWithName, 409, {
          updateAnimal
        })
      }
    }

    return this.animalRepository.update(id, updateAnimal)
  }

  async delete(id: string) {
    return await this.animalRepository.delete(id)
  }

  async exists(name: string): Promise<boolean> {
    return Boolean(await this.animalRepository.exists({ name }))
  }
}
