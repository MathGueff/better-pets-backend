import { Request, Response } from 'express'
import { BaseController } from './baseController'
import { IEntity } from '../interfaces/entity'

export class CrudController<T extends IEntity> extends BaseController<T> {
  list = async (req: Request, res: Response): Promise<void> => {}

  findById = async (req: Request, res: Response): Promise<void> => {}

  create = async (req: Request, res: Response): Promise<void> => {}

  patch = async (req: Request, res: Response): Promise<void> => {}

  put = async (req: Request, res: Response): Promise<void> => {}

  delete = async (req: Request, res: Response): Promise<void> => {}
}
