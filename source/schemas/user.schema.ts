import { model, Schema } from "mongoose";
import { IUserEntity } from "../models/user.model";

const userSchema = new Schema<IUserEntity>(
  {
    name: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
)

export const UserModel = model<IUserEntity>('Users', userSchema)

export default UserModel