import { BaseService } from '../core/base.service'
import { ApiError } from '../errors/api.error'
import { AnimalMessages } from '../messages/animal.messages'
import { AnimalRepository } from '../repositories/animal.repository'
import {
  CreateAnimalDTO,
  UpdateAnimalDTO
} from '../validation/animal.validation'

export class AnimalsService extends BaseService {
  constructor(
    private readonly animalRepository: AnimalRepository = new AnimalRepository()
  ) {
    super()
  }

  async list() {
    return this.animalRepository.list()
  }

  async findById(id: string) {
    return this.animalRepository.findById(id)
  }

  async create(newAnimal: CreateAnimalDTO) {
    const exists = await this.exists(newAnimal.name)
    if (exists) {
      throw new ApiError(AnimalMessages.alreadyExistsWithName, 409, {
        newAnimal
      })
    }

    return this.animalRepository.create(newAnimal)
  }

  async update(id: string, updateAnimal: Partial<UpdateAnimalDTO>) {
    if (updateAnimal.name) {
      const exists = await this.exists(updateAnimal.name, id)

      if (exists) {
        throw new ApiError(AnimalMessages.alreadyExistsWithName, 409, {
          updateAnimal
        })
      }
    }

    return this.animalRepository.update(id, updateAnimal)
  }

  async delete(id: string) {
    return this.animalRepository.delete(id)
  }

  async exists(name: string, excludeId?: string) {
    return this.animalRepository.exists({ name }, excludeId)
  }
}
