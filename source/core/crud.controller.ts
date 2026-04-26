import type { Request, Response } from 'express'
import type { IEntity } from '../models/entity.model'
import { BaseController } from './base.controller'

export class CrudController<T extends IEntity> extends BaseController {
  list = async (req: Request, res: Response): Promise<void> => {}

  findById = async (req: Request, res: Response): Promise<void> => {}

  create = async (req: Request, res: Response): Promise<void> => {}

  patch = async (req: Request, res: Response): Promise<void> => {}

  put = async (req: Request, res: Response): Promise<void> => {}

  delete = async (req: Request, res: Response): Promise<void> => {}
}
