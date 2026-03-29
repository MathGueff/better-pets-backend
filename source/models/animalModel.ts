import { Schema, model } from 'mongoose'
import type { IEntity } from '../interfaces/entity'

export interface IAnimal extends IEntity {
  name: string
  age: number
  breed?: string
}

const animalSchema = new Schema<IAnimal>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    breed: { type: String, required: false }
  },
  { versionKey: false }
)

const animal = model<IAnimal>('Animals', animalSchema)

export default animal
