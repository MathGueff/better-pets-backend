export type PaginationInput = { limit?: number; page?: number }
type PaginationOutput = { limit: number; page: number; skip: number }

const FALLBACK_LIMIT = 10
const FALLBACK_PAGE = 1

export class PaginatedQuery {
  public readonly page: PaginationOutput['page']
  public readonly limit: PaginationOutput['limit']

  constructor(pagination: PaginationInput) {
    const { limit = FALLBACK_LIMIT, page = FALLBACK_PAGE } = pagination
    this.limit = limit
    this.page = page
  }

  public get skip(): PaginationOutput['skip'] {
    return Math.max(this.page - 1, 0) * this.limit
  }
}
