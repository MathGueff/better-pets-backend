type PaginationInput = { limit?: number; page?: number }
type PaginationOutput = { limit: number; page: number; skip: number }

const FALLBACK_LIMIT = 10
const FALLBACK_PAGE = 1

export class PaginatedQuery {
  public readonly page: PaginationOutput['page']
  public readonly limit: PaginationOutput['limit']

  constructor(pagination: PaginationInput) {
    const { limit = FALLBACK_LIMIT, page = FALLBACK_PAGE } = pagination
    this.limit = typeof limit === 'number' ? this.parseLimit(limit) : limit
    this.page = typeof page === 'number' ? this.parsePage(page) : page
  }

  private parseLimit(limit: number) {
    const numberLimit = Number(limit)
    return !isNaN(numberLimit) ? numberLimit : FALLBACK_LIMIT
  }

  private parsePage(page: number) {
    const numberPage = Number(page)
    return !isNaN(numberPage) ? numberPage : FALLBACK_PAGE
  }

  public get skip(): PaginationOutput['skip'] {
    return Math.max(this.page - 1, 0) * this.limit
  }
}
