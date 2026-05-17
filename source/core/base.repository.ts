import type { Model, QueryFilter } from 'mongoose'
import { Types } from 'mongoose'
import { BaseEntity } from '../models/entity.model'
import { PaginatedQuery } from '../shared/pagination'

export class BaseRepository<
  TEntity extends BaseEntity,
  TCreateDTO = Omit<TEntity, keyof BaseEntity>,
  TUpdateDTO = Partial<TCreateDTO>
> {
  constructor(private model: Model<TEntity>) {}

  async create(newEntity: TCreateDTO) {
    const entity = new this.model(newEntity)
    return entity.save()
  }

  async exists(filter: QueryFilter<TEntity>, excludeId?: string) {
    if (excludeId) {
      filter._id = { $ne: new Types.ObjectId(excludeId) }
    }

    return this.model.exists(filter)
  }

  async list(pagination?: PaginatedQuery): Promise<TEntity[]> {
    return this.model.find({
      $limit: pagination?.limit,
      $skip: pagination?.skip
    })
  }

  async findById(id: string) {
    return this.model.findById(id)
  }

  async listIds(): Promise<Pick<TEntity, '_id'>[]> {
    return this.model.find().select('_id')
  }

  async update(id: string, updatedEntity: Partial<TUpdateDTO>) {
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
