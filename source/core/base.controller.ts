import { ZodType } from 'zod'
import { validateOrThrow } from '../utils/validate-or-throw'
import { paginationSchema } from '../validation/global/pagination.validation'
import { sortSchema } from '../validation/global/sorting.validation'

type GetQueryParamsResult = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: '1' | '-1'
  filters: Record<string, any>
}

export abstract class BaseController {
  protected getQueryParams(
    values: Record<string, any>,
    schema: ZodType
  ): GetQueryParamsResult {
    const { page, limit, sortBy, sortOrder, ...filters } = values
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
