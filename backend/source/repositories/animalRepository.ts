import { Types } from 'mongoose'
import { IAnimal } from '../models/animalModel'
import animal from '../models/animalModel'

export class AnimalRepository {
  async create(newAnimal: IAnimal) {
    return await animal.create(newAnimal)
  }

  async list(): Promise<IAnimal[]> {
    return await animal.find()
  }

  async findById(id: Types.ObjectId) {
    return await animal.findById(id)
  }

  async update(id: Types.ObjectId, updatedAnimal: IAnimal) {
    return await animal.findByIdAndUpdate(id, updatedAnimal, { new: true })
  }

  async delete(id: Types.ObjectId) {
    return await animal.findByIdAndDelete(id)
  }
}
