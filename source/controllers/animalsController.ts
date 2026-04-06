import { BaseController } from '../core/baseController'
import { Request, Response } from 'express'
import { AnimalsService } from '../services/animalsService'
import { ResponseHandler } from '../utils/responseHandler'
import {
  AnimalValidations,
  type CreateAnimalDTO,
  type UpdateAnimalDTO
} from '../validation/animalValidation'
import { AnimalMessages } from '../messages/animalsMessages'

export class AnimalsController extends BaseController {
  constructor(
    private readonly service: AnimalsService = new AnimalsService(),
    private readonly responseHandler: ResponseHandler = new ResponseHandler()
  ) {
    super()
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const listed = await this.service.list()
    if (listed.length === 0) {
      return this.responseHandler.notFound(res, AnimalMessages.notFound)
    }
    this.responseHandler.ok(res, AnimalMessages.found, listed)
  }

  findById = async (req: Request, res: Response) => {
    const { id } = req.params
    const found = await this.service.findById(String(id))
    if (!found) {
      return this.responseHandler.notFound(res, AnimalMessages.notFound)
    }
    this.responseHandler.ok(res, AnimalMessages.foundById, found)
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const newAnimal: CreateAnimalDTO = AnimalValidations.create.parse(req.body)
    const created = await this.service.create(newAnimal)
    this.responseHandler.created(res, AnimalMessages.created, created)
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const updateAnimal: UpdateAnimalDTO = AnimalValidations.update.parse(
      req.body
    )
    const updated = await this.service.update(String(id), updateAnimal)
    if (!updated) {
      return this.responseHandler.notFound(res, AnimalMessages.notFoundToUpdate)
    }
    this.responseHandler.ok(res, AnimalMessages.updated, updated)
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const deleted = await this.service.delete(String(id))
    if (!deleted) {
      return this.responseHandler.notFound(res, AnimalMessages.notFoundToDelete)
    }
    this.responseHandler.ok(res, AnimalMessages.deleted, deleted)
  }
}
