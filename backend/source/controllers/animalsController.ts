import { BaseController } from '../core/baseController'
import { IEntity } from '../interfaces/entity'
import { Request, Response } from 'express'

export class AnimalsController extends BaseController<IEntity> {
  constructor() {
    super()
  }

  list = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: 'Encontramos os animais com sucesso', data: this.data })
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const newAnimal = req.body
    this.data = [...this.data, newAnimal]
    res.json({ message: 'Cadastramos o animal com sucesso', data: newAnimal })
  }
}
