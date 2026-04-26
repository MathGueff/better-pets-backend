import { Request } from 'express'

export abstract class BaseController {
  protected getQueryParams(req: Request) {
    const { page, limit, search, sortBy, sortOrder, ...filters } = req.query

    return {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 10,
      search: search as string,
      sortBy: sortBy as string,
      sortOrder:
        (sortOrder as string)?.toUpperCase() === 'DESC' ? 'desc' : 'asc',
      filters
    }
  }
}
