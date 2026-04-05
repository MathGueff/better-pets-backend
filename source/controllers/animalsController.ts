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
  public service: AnimalsService = new AnimalsService()
  public responseHandler = new ResponseHandler()

  list = async (req: Request, res: Response): Promise<void> => {
    const listed = await this.service.list()
    if (listed.length === 0) {
      return this.responseHandler.notFound(res, AnimalMessages.NOT_FOUND)
    }
    this.responseHandler.ok(res, AnimalMessages.FOUND, listed)
  }

  findById = async (req: Request, res: Response) => {
    const { id } = req.params
    const found = await this.service.findById(String(id))
    if (!found) {
      return this.responseHandler.notFound(res, AnimalMessages.NOT_FOUND)
    }
    this.responseHandler.ok(res, AnimalMessages.FOUND_BY_ID, found)
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const newAnimal: CreateAnimalDTO = AnimalValidations.create.parse(req.body)
    const created = await this.service.create(newAnimal)
    this.responseHandler.created(res, AnimalMessages.CREATED, created)
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
        AnimalMessages.NOT_FOUND_TO_UPDATE
      )
    }
    this.responseHandler.ok(res, AnimalMessages.UPDATED, updated)
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const deleted = await this.service.delete(String(id))
    if (!deleted) {
      return this.responseHandler.notFound(
        res,
        AnimalMessages.NOT_FOUND_TO_DELETE
      )
    }
    this.responseHandler.ok(res, AnimalMessages.DELETED, deleted)
  }
}
