import { BaseService } from '../core/base.service'
import { ApiError } from '../errors/api.error'
import { AnimalMessages } from '../messages/animal.messages'
import { AnimalRepository } from '../repositories/animal.repository'
import { PaginatedQuery } from '../shared/pagination'
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

  async list(pagination?: PaginatedQuery) {
    return this.animalRepository.list(pagination)
  }

  async findById(id: string) {
    const found = await this.animalRepository.findById(id)
    if (!found) {
      throw new ApiError(AnimalMessages.notFound, 404, { id })
    }
    return found
  }

  async listIds() {
    const found = await this.animalRepository.listIds()
    return found
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

    const updated = await this.animalRepository.update(id, updateAnimal)
    if (!updated) {
      throw new ApiError(AnimalMessages.notFoundToUpdate, 404, { id })
    }
    return updated
  }

  async delete(id: string) {
    const deleted = await this.animalRepository.delete(id)
    if (!deleted) {
      throw new ApiError(AnimalMessages.notFoundToDelete, 404, { id })
    }
    return deleted
  }

  async exists(name: string, excludeId?: string) {
    return this.animalRepository.exists({ name }, excludeId)
  }
}
