import { Schema, model } from 'mongoose'

export interface IAnimal {
  name: string
  age: number
  breed?: string
}

const animalSchema = new Schema<IAnimal>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: false }
})

const animal = model<IAnimal>('Animals', animalSchema)

export default animal
