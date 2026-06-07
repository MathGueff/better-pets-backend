import { BaseService } from '../../core/base.service'
import { IUserInput } from './user.model'
import { UserRepository } from './user.repository'
import { QueryOptions } from '../../types/query-options'
import { UnsplashContextQuery, UnsplashService } from '../../services/unsplash.service'

export class UserService extends BaseService {
  constructor(
    private readonly userRepository: UserRepository = new UserRepository()
  ) {
    super()
  }

  list = async (filters: Record<string, any>, options: QueryOptions) => {
    const user = await this.userRepository.list(filters, options)
    return user
  }

  register = async (newUser: IUserInput) => {
    newUser.photo = await new UnsplashService().takeAPhoto(
      UnsplashContextQuery.USERPROFILE
    )

    return await this.userRepository.create(newUser)
  }

  login = async (email: string) => {
    return await this.userRepository.exists({ email })
  }
}
