import type { Model, QueryFilter, UpdateQuery } from 'mongoose'
import { Types } from 'mongoose'
import { BaseEntity } from '../models/entity.model'
import { PaginatedQuery } from '../shared/pagination'

export class BaseRepository<
  TEntity extends BaseEntity,
  TCreateDTO extends Omit<TEntity, keyof BaseEntity> = Omit<TEntity, keyof BaseEntity>,
  TUpdateDTO extends Partial<TEntity> = Partial<TEntity>
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

  async list(pagination: PaginatedQuery): Promise<TEntity[]> {
    return this.model.find().skip(pagination.skip).limit(pagination?.limit)
  }

  async findById(id: string) {
    return this.model.findById(id)
  }

  async listIds(): Promise<Pick<TEntity, '_id'>[]> {
    return this.model.find().select('_id')
  }

  async update(id: string, updatedEntity: TUpdateDTO) {
    const updateQuery: UpdateQuery<TEntity> = { $set: updatedEntity }
    const entity = await this.model.updateOne({ _id: id }, updateQuery)
    return entity.modifiedCount > 0 ? this.findById(id) : null
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id)
  }
}
