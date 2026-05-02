import { Request, Response } from 'express'
import { BaseController } from '../core/base.controller'
import { BadValidationError } from '../errors/bad-validation.error'
import { AnimalMessages } from '../messages/animal.messages'
import { Animal } from '../models/animal.model'
import { AnimalsService } from '../services/animal.service'
import { ResponseHandler } from '../utils/response-handler'
import { AnimalValidations } from '../validation/animal.validation'
import { objectIdSchema } from '../validation/objectid.validation'

export class AnimalsController extends BaseController {
  constructor(private readonly service: AnimalsService = new AnimalsService()) {
    super()
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const listed = await this.service.list()
    if (listed.length === 0) {
      return ResponseHandler.notFound(res, AnimalMessages.notFound)
    }
    ResponseHandler.ok(res, AnimalMessages.found, listed)
  }

  getDescription = async (req: Request, res: Response) => {
    const { id } = objectIdSchema.parse(req.params)
    const found = await this.service.findById(String(id))
    ResponseHandler.ok(res, AnimalMessages.foundDescription, {
      description: new Animal(found).description
    })
  }

  findById = async (req: Request, res: Response) => {
    const { id } = objectIdSchema.parse(req.params)
    const found = await this.service.findById(String(id))
    ResponseHandler.ok(res, AnimalMessages.foundById, found)
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const { data, error } = AnimalValidations.create.safeParse(req.body)
    if (error) {
      throw new BadValidationError({
        message: AnimalMessages.invalidDataCreate,
        error
      })
    }
    const created = await this.service.create(data)
    ResponseHandler.created(res, AnimalMessages.created, created)
  }

  update = async (req: Request, res: Response) => {
    const { id } = objectIdSchema.parse(req.params)
    const { data, error } = AnimalValidations.update.safeParse(req.body)
    if (error) {
      throw new BadValidationError({
        message: AnimalMessages.invalidDataUpdate,
        error
      })
    }
    const updated = await this.service.update(String(id), data)
    ResponseHandler.ok(res, AnimalMessages.updated, updated)
  }

  delete = async (req: Request, res: Response) => {
    const { id } = objectIdSchema.parse(req.params)

    const deleted = await this.service.delete(String(id))
    ResponseHandler.ok(res, AnimalMessages.deleted, deleted)
  }
}
