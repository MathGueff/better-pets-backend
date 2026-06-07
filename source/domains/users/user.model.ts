import { BaseEntity } from '../../core/base.entity'

export interface IUserInput {
  name: string
  email: string
  password: string
  photo: string
}

export interface IUserEntity extends BaseEntity, IUserInput {}

export class User {
  constructor(private readonly data: IUserEntity) {}
}
