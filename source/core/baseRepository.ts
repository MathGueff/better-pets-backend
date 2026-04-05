import type { Model, Types } from 'mongoose'
import type { IEntity } from '../models/entityModel'

export class BaseRepository<
  T extends IEntity,
  CreateDTO = Omit<T, '_id'>,
  UpdateDTO = Omit<T, '_id'>
> {
  constructor(private model: Model<T>) {}

  async create(newEntity: CreateDTO) {
    const entity = new this.model(newEntity)
    return await entity.save()
  }

  async exists(filter: Partial<Omit<T, '_id'>>) {
    return await this.model.exists(filter)
  }

  async list(): Promise<T[]> {
    return await this.model.find()
  }

  async findById(id: Types.ObjectId) {
    return await this.model.findById(id)
  }

  async update(id: Types.ObjectId, updatedEntity: Partial<UpdateDTO>) {
    const entity = await this.model.findById(id)
    if (!entity) {
      return null
    }
    Object.assign(entity, updatedEntity)
    return await entity.save()
  }

  async delete(id: Types.ObjectId) {
    return await this.model.findByIdAndDelete(id)
  }
}
