import { BaseEntity } from './entity.model'

export enum AnimalGender {
  MALE = 'M',
  FEMALE = 'F'
}

export type AnimalSchedule = {
  feed: { timeExpected: Date }
  walk: { timeExpected: Date }
  water: { timeExpected: Date }
}

export interface IAnimalInput {
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

export type IAnimalEntity = BaseEntity & IAnimalInput

export class Animal {
  constructor(private readonly data: IAnimalEntity) {}

  get description(): string {
    return `${this.data.name} is a ${this.data.breed} born on ${this.data.bornDate.toDateString()} and adopted on ${this.data.adoptionDate.toDateString()}.`
  }
}
