import { BaseService } from '../core/base.service'
import { ApiError } from '../errors/api.error'
import { AnimalRepository } from '../repositories/animal.repository'
import { PaginatedQuery } from '../shared/pagination'
import {
  CreateAnimalDTO,
  UpdateAnimalDTO
} from '../validation/animal/animal.validation'

export class AnimalsService extends BaseService {
  constructor(
    private readonly animalRepository: AnimalRepository = new AnimalRepository()
  ) {
    super()
  }

  async list(pagination: PaginatedQuery, filters: Record<string, any> = {}) {
    const result = await this.animalRepository.list(pagination, filters)
    if (!result.length) {
      throw new ApiError('Nenhum animalzinho encontrado', 404, { filters })
    }
    return result
  }

  async findById(id: string) {
    const found = await this.animalRepository.findById(id)
    if (!found) {
      throw new ApiError('Nenhum animalzinho encontrado', 404, { id })
    }
    return found
  }

  async create(newAnimal: CreateAnimalDTO) {
    const exists = await this.exists(newAnimal.name)
    if (exists) {
      throw new ApiError('Animal já cadastrado com esse nome', 409, {
        newAnimal
      })
    }

    return this.animalRepository.create(newAnimal)
  }

  async update(id: string, updateAnimal: Partial<UpdateAnimalDTO>) {
    if (updateAnimal.name) {
      const exists = await this.exists(updateAnimal.name, id)

      if (exists) {
        throw new ApiError('Animal já cadastrado com esse nome', 409, {
          updateAnimal
        })
      }
    }

    const updated = await this.animalRepository.update(id, updateAnimal)
    if (!updated) {
      throw new ApiError(
        'Não foi possível encontrar o animalzinho para atualizar',
        404,
        { id }
      )
    }
    return updated
  }

  async delete(id: string) {
    const deleted = await this.animalRepository.delete(id)
    if (!deleted) {
      throw new ApiError(
        'Não foi possível encontrar o animalzinho para excluir',
        404,
        { id }
      )
    }
    return deleted
  }

  async exists(name: string, excludeId?: string) {
    return this.animalRepository.exists({ name }, excludeId)
  }
}
