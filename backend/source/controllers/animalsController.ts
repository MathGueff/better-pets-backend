import { BaseController } from '../core/baseController'
import { IEntity } from '../interfaces/entity'
import { Request, Response } from 'express'
import { AnimalRepository } from '../repositories/animalRepository'
import { Types } from 'mongoose'
import { IAnimal } from '../models/animalModel'

export class AnimalsController extends BaseController<IEntity> {
  public repository : AnimalRepository = new AnimalRepository()
  
  constructor() {
    super()
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const listed = await this.repository.list()
    res.json({ message: 'Encontramos os animais com sucesso', data: listed })
  }

  findById = async (req: Request, res: Response) => {
    const { id } = req.params
    const found = await this.repository.findById(new Types.ObjectId(String(id)))
    res.json({
      message: 'Encontramos seu animalzinho com sucesso',
      data: found
    })
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const newAnimal = req.body
    const created = await this.repository.create(newAnimal)
    res.json({ message: 'Cadastramos o animal com sucesso', data: created })
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    const deleted = await this.repository.delete(new Types.ObjectId(String(id)))
    res.json({
      message: 'Animalzinho removido com sucesso, vai fazer falta',
      data: deleted
    })
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { age, name } = req.body as IAnimal
    const updateAnimal = { age, name }
    const updated = await this.repository.update(new Types.ObjectId(String(id)), updateAnimal)
    res.json({
      message: 'Animalzinho foi atualizado com sucesso',
      data: updated
    })
  }
}
