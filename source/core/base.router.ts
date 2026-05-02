import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router
} from 'express'
import { IRoute } from '../shared/routing/route.type'

export class BaseRouter {
  public readonly router: Router = Router()
  private readonly prefix: string

  /**
   * @param prefix Prefixo da rota
   * @param routes Rotas
   */
  constructor(
    prefix: string,
    private readonly routes: IRoute[]
  ) {
    this.prefix = prefix.startsWith('/') ? prefix : `/${prefix}`
    this.handleRoutes()
  }

  private handleRoutes() {
    this.routes.forEach((route) => {
      const fullPath = `${this.prefix}${route.path}`.replace(/\/+/g, '/')

      const asyncMiddlewares = route.middlewares?.map((middleware) =>
        this.asyncHandler(middleware)
      )
      const asyncHandler = this.asyncHandler(route.handler)

      this.router[route.method](
        fullPath,
        ...(asyncMiddlewares ?? []),
        asyncHandler
      )
    })
  }

  private asyncHandler(handler: RequestHandler): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await handler(req, res, next)
      } catch (error) {
        next(error)
      }
    }
  }
}
