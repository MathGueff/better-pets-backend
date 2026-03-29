import type { Model, Types } from 'mongoose'
import type { IEntity } from '../interfaces/entity'

export class BaseRepository<T extends IEntity> {
  constructor(private model: Model<T>) {}

  async create(newEntity: T) {
    return await this.model.create(newEntity)
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

  async update(id: Types.ObjectId, updatedEntity: Partial<T>) {
    return await this.model.findByIdAndUpdate(id, updatedEntity, { new: true })
  }

  async delete(id: Types.ObjectId) {
    return await this.model.findByIdAndDelete(id)
  }
}
