import { Types } from 'mongoose'
import { PaginationInput } from '../utils/pagination'
import { SortInput } from '../utils/sorting'
import { BaseEntity } from './entity.model'

export enum AnimalGender {
  MALE = 'M',
  FEMALE = 'F'
}

export interface IAnimalInput {
  name: string
  breed: string
  gender: AnimalGender
  weight: number
  height: number
  birthdate: Date
  adoptionDate?: Date
  photo?: string
  familyId?: string
  schedules?: Array<Types.ObjectId | string>
}

export type IAnimalEntity = BaseEntity & IAnimalInput

export type IAnimalFilter = PaginationInput &
  SortInput &
  Partial<{
    name: IAnimalEntity['name']
    breed: IAnimalEntity['breed']
    gender: IAnimalEntity['gender']
  }>

export class Animal {
  constructor(private readonly data: IAnimalEntity) {}
}
