import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../core/base.controller'
import { UserService } from './user.service'
import { ResponseHandler } from '../../utils/response-handler'
import { validateOrThrow } from '../../utils/validate-or-throw'
import { UserValidations } from './user.validation'

export class UserController extends BaseController {
  constructor(private readonly userService: UserService = new UserService()) {
    super()
  }
  list = async (req: Request, res: Response, next: NextFunction) => {
    const { pagination, sort, filters } = this.getQueryParams(
      req.query,
      UserValidations.filter
    )
    const users = await this.userService.list(filters, { pagination, sort })
    ResponseHandler.ok(res, 'Usuários encontrados com sucesso', users)
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    const newUserEntry = validateOrThrow({
      entry: req.body,
      schema: UserValidations.create,
      message: 'Usuário inválido'
    })
    const newUser = await this.userService.register(newUserEntry)
    ResponseHandler.created(res, 'Usuário criado com sucesso', newUser)
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = validateOrThrow({
      entry: req.body,
      schema: UserValidations.login
    })
    const user = await this.userService.login(email)
    if (!user) {
      return ResponseHandler.notFound(res, 'Usuário não encontrado')
    }
    ResponseHandler.ok(res, 'Login bem-sucedido', user)
  }
}
