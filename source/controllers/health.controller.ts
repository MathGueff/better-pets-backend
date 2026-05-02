import type { Request, Response } from 'express'
import { BaseController } from '../core/base.controller'

export class HealthController extends BaseController {
  check = (req: Request, res: Response) => {
    res.status(200).json({ message: 'API funcionando com sucesso!' })
  }
}
