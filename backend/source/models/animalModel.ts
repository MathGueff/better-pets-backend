import mongoose from 'mongoose'

export interface IAnimal {
  name: string
  age: number
}

export class AnimalModel {
  private animal: IAnimal

  constructor(animal: IAnimal) {
    this.animal = animal
  }
}

const animalSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String
})

const animal = mongoose.model('Animals', animalSchema)

export default animal
