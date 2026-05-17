import { ObjectId } from 'mongoose'

export interface BaseEntity {
  _id: ObjectId
  createdAt: Date
  updatedAt: Date
}
