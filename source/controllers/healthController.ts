import type { Response, Request } from 'express'
import { BaseController } from '../core/baseController'

export class HealthController extends BaseController {
  check = (req: Request, res: Response) => {
    res.status(200).json({ message: 'API funcionando com sucesso!' })
  }
}
