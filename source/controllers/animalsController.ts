import { BaseController } from '../core/baseController'
import { Request, Response } from 'express'
import { AnimalRepository } from '../repositories/animalRepository'
import { AnimalsService } from '../services/animalsService'
import { ResponseHandler } from '../utils/responseHandler'
import type { IAnimal } from '../models/animalModel'
import {
  AnimalValidations,
  type CreateAnimalDTO,
  type UpdateAnimalDTO
} from '../validation/animalValidation'

export class AnimalsController extends BaseController {
  public repository: AnimalRepository = new AnimalRepository()
  public service: AnimalsService = new AnimalsService()
  public responseHandler = new ResponseHandler()

  list = async (req: Request, res: Response): Promise<void> => {
    const listed = await this.service.list()
    this.responseHandler.ok(res, 'Animaizinhos encontrados com sucesso', listed)
  }

  findById = async (req: Request, res: Response) => {
    const { id } = req.params
    const found = await this.service.findById(String(id))
    if (!found) {
      return this.responseHandler.notFound(
        res,
        'Não foi possível encontrar o animalzinho com esse ID'
      )
    }
    this.responseHandler.ok(
      res,
      'Encontramos seu animalzinho com sucesso',
      found
    )
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const newAnimal: CreateAnimalDTO = AnimalValidations.create.parse(req.body)
    const created = await this.service.create(newAnimal)
    this.responseHandler.created(
      res,
      'Cadastramos o animal com sucesso!',
      created
    )
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const updateAnimal: UpdateAnimalDTO = AnimalValidations.update.parse(
      req.body
    )
    const updated = await this.service.update(String(id), updateAnimal)
    if (!updated) {
      return this.responseHandler.notFound(
        res,
        'Não foi possível encontrar o animalzinho para atualizar'
      )
    }
    this.responseHandler.ok(res, 'Animalzinho atualizado com sucesso', updated)
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const deleted = await this.service.delete(String(id))
    if (!deleted) {
      return this.responseHandler.notFound(
        res,
        'Não foi possível encontrar o animalzinho para excluir, UFA'
      )
    }
    this.responseHandler.ok(
      res,
      'Animalzinho removido com sucesso, vai fazer falta',
      deleted
    )
  }
}
