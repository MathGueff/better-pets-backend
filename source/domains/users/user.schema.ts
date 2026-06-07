import { model, Schema } from 'mongoose'
import { IUserEntity } from './user.model'

const userSchema = new Schema<IUserEntity>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
)

export const UserModel = model<IUserEntity>('Users', userSchema)

export default UserModel
