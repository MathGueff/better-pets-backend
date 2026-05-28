import { Request, Response } from 'express'
import { BaseController } from '../core/base.controller'
import { AnimalMessages } from '../messages/animal.messages'
import { Animal } from '../models/animal.model'
import { AnimalsService } from '../services/animal.service'
import { PaginatedQuery } from '../shared/pagination'
import { ResponseHandler } from '../utils/response-handler'
import { validateObjectIdOrThrow } from '../utils/validate-object-id-or-throw'
import { validateOrThrow } from '../utils/validate-or-throw'
import { AnimalValidations } from '../validation/animal.validation'
import {
  paginationSchema,
  PaginationSchemaType
} from '../validation/pagination.validation'

export class AnimalsController extends BaseController {
  constructor(private readonly service: AnimalsService = new AnimalsService()) {
    super()
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const { page, limit } = validateOrThrow<PaginationSchemaType>({
      schema: paginationSchema,
      entry: req.query,
      message: 'Pesquisa inválida'
    })
    const pagination = new PaginatedQuery({ page, limit })
    const listed = await this.service.list(pagination)
    if (listed.length === 0) {
      return ResponseHandler.notFound(res, AnimalMessages.notFound)
    }
    ResponseHandler.ok(res, AnimalMessages.found, listed)
  }

  listIds = async (req: Request, res: Response) => {
    const listed = await this.service.listIds()
    ResponseHandler.ok(res, AnimalMessages.animalsListIdFound, listed)
  }

  findById = async (req: Request, res: Response) => {
    const id = validateObjectIdOrThrow(req.params.id)
    const found = await this.service.findById(String(id))
    ResponseHandler.ok(res, AnimalMessages.foundById, found)
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const data = validateOrThrow({
      message: AnimalMessages.invalidDataCreate,
      entry: req.body,
      schema: AnimalValidations.create
    })
    const created = await this.service.create(data)
    ResponseHandler.created(res, AnimalMessages.created, created)
  }

  update = async (req: Request, res: Response) => {
    const id = validateObjectIdOrThrow(req.params.id)
    const data = validateOrThrow({
      entry: req.body,
      schema: AnimalValidations.update,
      message: AnimalMessages.invalidDataUpdate
    })
    const updated = await this.service.update(id, data)
    ResponseHandler.ok(res, AnimalMessages.updated, updated)
  }

  delete = async (req: Request, res: Response) => {
    const id = validateObjectIdOrThrow(req.params.id)

    const deleted = await this.service.delete(String(id))
    ResponseHandler.ok(res, AnimalMessages.deleted, deleted)
  }
}
