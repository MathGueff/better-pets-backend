import { Schema, model } from 'mongoose'
import { AnimalGender, IAnimalEntity } from '../models/animal.model'

const animalSchema = new Schema<IAnimalEntity>(
  {
    name: { type: String, required: true, unique: true },
    breed: { type: String, required: true },
    gender: { type: String, enum: Object.values(AnimalGender), required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    birthdate: { type: Date, required: true },
    adoptionDate: { type: Date, required: false },
    photo: { type: String, required: false },
    schedules: {
      type: [Schema.Types.ObjectId],
      ref: 'Schedules',
      required: false
    }
  },
  { versionKey: false, timestamps: true }
)

export const AnimalModel = model<IAnimalEntity>('Animals', animalSchema)

export default AnimalModel
