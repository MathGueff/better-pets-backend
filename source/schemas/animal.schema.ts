import { HydratedDocument, Schema, model } from 'mongoose'
import { AnimalGender, IAnimalEntity } from '../models/animal.model'

export type IAnimalDocument = HydratedDocument<IAnimalEntity>

const animalSchema = new Schema<IAnimalEntity>(
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
  { versionKey: false, timestamps: true }
)

export const animalModel = model<IAnimalEntity>('Animals', animalSchema)

export default animalModel
