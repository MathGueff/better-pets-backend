import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../core/base.controller'
import { UserModel } from '../schemas/user.schema'
import { ResponseHandler } from '../utils/response-handler'
import { validateOrThrow } from '../utils/validate-or-throw'
import { UserValidations } from '../validation/animal/user.validation'

export class UserController extends BaseController {
  list = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'Usuários encontrados com sucesso' })
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = validateOrThrow({
      entry: req.body,
      schema: UserValidations.create,
      message: 'Usuário inválido'
    })
    ResponseHandler.created(res, 'Usuário criado com sucesso', newUser)
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
