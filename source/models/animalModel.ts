import { Schema, model } from 'mongoose'
import type { IEntity } from '../interfaces/entity'

export enum AnimalGender {
  MALE = 'M',
  FEMALE = 'F'
}

export type AnimalSchedule = {
  feed: { timeExpected: Date }
  walk: { timeExpected: Date }
  water: { timeExpected: Date }
}

export interface IAnimal extends IEntity {
  name: string
  breed: string
  photo?: string
  gender: AnimalGender
  size: number
  weight: number
  bornDate: Date
  adoptionDate: Date
  schedule?: AnimalSchedule
}

export class Animal implements IAnimal {
  public name: IAnimal['name']
  public breed: IAnimal['breed']
  public photo: IAnimal['photo']
  public gender: IAnimal['gender']
  public size: IAnimal['size']
  public weight: IAnimal['weight']
  public bornDate: IAnimal['bornDate']
  public adoptionDate: IAnimal['adoptionDate']
  public schedule: IAnimal['schedule']

  constructor(animal: IAnimal) {
    this.name = animal.name
    this.breed = animal.breed
    this.photo = animal.photo
    this.gender = animal.gender
    this.size = animal.size
    this.weight = animal.weight
    this.bornDate = animal.bornDate
    this.adoptionDate = animal.adoptionDate
    this.schedule = animal.schedule
  }
}

const animalSchema = new Schema<Animal>(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
    gender: { type: String, enum: Object.values(AnimalGender), required: true },
    size: { type: Number, required: true },
    weight: { type: Number, required: true },
    bornDate: { type: Date, required: true },
    adoptionDate: { type: Date, required: true },
    photo: { type: String, required: false },
    schedule: { type: Object, required: false }
  },
  { versionKey: false }
)

const animalModel = model<Animal>('Animals', animalSchema)

export default animalModel
