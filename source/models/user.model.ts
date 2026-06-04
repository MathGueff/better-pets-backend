import { BaseEntity } from './entity.model'

export interface IUserInput {
  name: string
  email: string
}

export interface IUserEntity extends BaseEntity, IUserInput {}

export class User {
  constructor(private readonly data: IUserEntity) {}
}
