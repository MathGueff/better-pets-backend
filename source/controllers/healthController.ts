import type { Response, Request } from 'express'
import { BaseController } from '../core/baseController'
import type { IEntity } from '../interfaces/entity'

export class HealthController extends BaseController<IEntity> {
  check = (req: Request, res: Response) => {
    res.status(200).json({ message: 'API funcionando com sucesso!' })
  }
}
