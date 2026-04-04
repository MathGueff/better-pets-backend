import type { Request, Response } from 'express'
import { BaseController } from './baseController'
import type { IEntity } from '../interfaces/entity'

export class CrudController<T extends IEntity> extends BaseController {
  list = async (req: Request, res: Response): Promise<void> => {}

  findById = async (req: Request, res: Response): Promise<void> => {}

  create = async (req: Request, res: Response): Promise<void> => {}

  patch = async (req: Request, res: Response): Promise<void> => {}

  put = async (req: Request, res: Response): Promise<void> => {}

  delete = async (req: Request, res: Response): Promise<void> => {}
}
