import { Request } from 'express'
import { ZodType } from 'zod'
import { validateOrThrow } from '../utils/validate-or-throw'
import { paginationSchema } from '../validation/pagination.validation'
import { sortSchema } from '../validation/sorting.validation'

type GetQueryParamsResult = {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: '1' | '-1'
  filters: Record<string, any>
}

export abstract class BaseController {
  protected getQueryParams(
    req: Request,
    schema?: ZodType
  ): GetQueryParamsResult {
    const { page, limit, search, sortBy, sortOrder, ...filters } = req.query
    const result: GetQueryParamsResult = { filters: {} }

    const pagination = validateOrThrow({
      schema: paginationSchema,
      entry: { page, limit },
      message: 'Pesquisa inválida'
    })
    Object.assign(result, pagination)

    const sorting = validateOrThrow({
      schema: sortSchema,
      entry: { sortBy, sortOrder },
      message: 'Parâmetros de ordenação inválidos'
    })
    Object.assign(result, sorting)

    if (schema) {
      const filtersValidated = validateOrThrow({
        schema: schema,
        entry: filters,
        message: 'Filtros inválidos'
      })
      Object.assign(result.filters, filtersValidated)
    }

    console.log('Query params validados:', result)
    return result
  }
}
