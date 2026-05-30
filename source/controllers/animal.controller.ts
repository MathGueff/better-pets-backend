import { Request, Response } from 'express'
import { BaseController } from '../core/base.controller'
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
      return ResponseHandler.notFound(res, 'Nenhum animalzinho encontrado')
    }
    ResponseHandler.ok(res, 'Animaizinhos encontrados com sucesso', listed)
  }

  findById = async (req: Request, res: Response) => {
    const id = validateObjectIdOrThrow(req.params.id)
    const found = await this.service.findById(String(id))
    ResponseHandler.ok(res, 'Encontramos seu animalzinho com sucesso', found)
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const data = validateOrThrow({
      message: 'Não foi possível criar o animalzinho com os dados fornecidos',
      entry: req.body,
      schema: AnimalValidations.create
    })
    const created = await this.service.create(data)
    ResponseHandler.created(res, 'Animalzinho criado com sucesso', created)
  }

  update = async (req: Request, res: Response) => {
    const id = validateObjectIdOrThrow(req.params.id)
    const data = validateOrThrow({
      entry: req.body,
      schema: AnimalValidations.update,
      message:
        'Não foi possível atualizar o animalzinho com os dados fornecidos'
    })
    const updated = await this.service.update(id, data)
    ResponseHandler.ok(res, 'Animalzinho atualizado com sucesso', updated)
  }

  delete = async (req: Request, res: Response) => {
    const id = validateObjectIdOrThrow(req.params.id)

    const deleted = await this.service.delete(String(id))
    ResponseHandler.ok(res, 'Animalzinho removido com sucesso', deleted)
  }
}
