import { BaseRepository } from '../core/base.repository'
import { IUserEntity } from '../models/user.model'
import UserModel from '../schemas/user.schema'

export class UserRepository extends BaseRepository<IUserEntity> {
  constructor() {
    super(UserModel)
  }
}
