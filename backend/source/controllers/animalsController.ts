import { BaseController } from '../core/baseController'
import { IEntity } from '../interfaces/entity'
import { Request, Response } from 'express'
import { AnimalRepository } from '../repositories/animalRepository'
import { AnimalValidations } from '../validation/animalValidation'
import { AnimalsService } from '../services/animalsService'

export class AnimalsController extends BaseController<IEntity> {
  public repository: AnimalRepository = new AnimalRepository()
  public service: AnimalsService = new AnimalsService()

  constructor() {
    super()
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const listed = await this.service.list()
    res.json({ message: 'Encontramos os animais com sucesso', data: listed })
  }

  findById = async (req: Request, res: Response) => {
    const { id } = req.params
    const found = await this.service.findById(String(id))
    res.json({
      message: 'Encontramos seu animalzinho com sucesso',
      data: found
    })
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const newAnimal = AnimalValidations.create.parse(req.body)
    const created = await this.service.create(newAnimal)
    res.json({ message: 'Cadastramos o animal com sucesso', data: created })
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const updateAnimal = AnimalValidations.update.parse(req.body)
    const updated = await this.service.update(String(id), updateAnimal)
    res.json({
      message: 'Animalzinho foi atualizado com sucesso',
      data: updated
    })
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const deleted = await this.service.delete(String(id))
    res.json({
      message: 'Animalzinho removido com sucesso, vai fazer falta',
      data: deleted
    })
  }
}
