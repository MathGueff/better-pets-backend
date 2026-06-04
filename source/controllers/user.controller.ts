import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../core/base.controller'
import { UserRepository } from '../repositories/user.repository'
import { UserModel } from '../schemas/user.schema'
import { ResponseHandler } from '../utils/response-handler'
import { validateOrThrow } from '../utils/validate-or-throw'
import { UserValidations } from '../validation/animal/user.validation'

export class UserController extends BaseController {
  constructor(
    private readonly userRepository: UserRepository = new UserRepository()
  ) {
    super()
  }
  list = async (req: Request, res: Response, next: NextFunction) => {
    const { pagination, sort, filters } = this.getQueryParams(
      req.query,
      UserValidations.filter
    )
    const users = await this.userRepository.list(filters, { pagination, sort })
    ResponseHandler.ok(res, 'Usuários encontrados com sucesso', users)
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = validateOrThrow({
      entry: req.body,
      schema: UserValidations.create,
      message: 'Usuário inválido'
    })
    const userPersisted = await this.userRepository.create(newUser)
    ResponseHandler.created(res, 'Usuário criado com sucesso', userPersisted)
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body
    const user = await UserModel.findOne({ name })
    if (!user) {
      return ResponseHandler.notFound(res, 'Usuário não encontrado')
    }
    ResponseHandler.ok(res, 'Login bem-sucedido', user)
  }
}
