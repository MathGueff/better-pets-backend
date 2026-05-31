import { ZodType } from 'zod'
import { PaginatedQuery } from '../utils/pagination'
import { SortedQuery } from '../utils/sorting'
import { validateOrThrow } from '../utils/validate-or-throw'
import { paginationSchema } from '../validation/global/pagination.validation'
import { sortSchema } from '../validation/global/sorting.validation'

type GetQueryParamsResult = {
  pagination: PaginatedQuery
  sort: SortedQuery
  filters: Record<string, any>
}

export abstract class BaseController {
  /**
   * Extrai e valida parâmetros de query (paginação, ordenação e filtros)
   *
   * @param queryParams - Valores brutos da query (req.query)
   * @param filterSchema - Schema Zod opcional para validar filtros específicos
   * @returns Objeto com paginação, ordenação e filtros validados
   */
  protected getQueryParams(
    queryParams: Record<string, any>,
    schema: ZodType
  ): GetQueryParamsResult {
    const { page, limit, sortBy, sortOrder, ...others } = queryParams

    const filters: Record<string, any> = {}
    const pagination = validateOrThrow({
      schema: paginationSchema,
      entry: { page, limit },
      message: 'Pesquisa inválida'
    })

    const sorting = validateOrThrow({
      schema: sortSchema,
      entry: { sortBy, sortOrder },
      message: 'Parâmetros de ordenação inválidos'
    })

    if (schema) {
      const filtersValidated = validateOrThrow({
        schema: schema,
        entry: others,
        message: 'Busca inválida'
      })
      Object.assign(filters, filtersValidated)
    }

    const result: GetQueryParamsResult = {
      pagination: new PaginatedQuery(pagination),
      sort: new SortedQuery(sorting),
      filters
    }

    console.log('Query params validados:', result)
    return result
  }
}
