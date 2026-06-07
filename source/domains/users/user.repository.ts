import { BaseRepository } from '../../core/base.repository'
import { IUserEntity } from './user.model'
import UserModel from './user.schema'

export class UserRepository extends BaseRepository<IUserEntity> {
  constructor() {
    super(UserModel)
  }
}
