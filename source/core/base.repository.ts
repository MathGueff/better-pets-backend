import type { Model, QueryFilter } from 'mongoose'
import { Types } from 'mongoose'
import type { IEntity } from '../models/entity.model'
import { PaginatedQuery } from '../shared/pagination'

export class BaseRepository<
  T extends IEntity,
  CreateDTO = Omit<T, '_id'>,
  UpdateDTO = Omit<T, '_id'>
> {
  constructor(private model: Model<T>) {}

  async create(newEntity: CreateDTO) {
    const entity = new this.model(newEntity)
    return entity.save()
  }

  async exists(filter: QueryFilter<T>, excludeId?: string) {
    if (excludeId) {
      filter._id = { $ne: new Types.ObjectId(excludeId) }
    }

    return this.model.exists(filter)
  }

  async list(pagination: PaginatedQuery): Promise<T[]> {
    return this.model.find().limit(pagination.limit).skip(pagination.skip)
  }

  async findById(id: string) {
    return this.model.findById(id)
  }

  async listIds(): Promise<Pick<T, '_id'>[]> {
    return this.model.find().select('_id')
  }

  async update(id: string, updatedEntity: Partial<UpdateDTO>) {
    const entity = await this.model.findById(id)
    if (!entity) {
      return null
    }
    Object.assign(entity, updatedEntity)
    return await entity.save()
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id)
  }
}
