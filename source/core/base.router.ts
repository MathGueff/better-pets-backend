import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router
} from 'express'
import { EndpointNames } from '../types/endpoints'
import { IRoute } from '../types/route.type'

export class BaseRouter {
  public readonly router: Router = Router()

  /**
   * @param prefix Prefixo da rota
   * @param routes Rotas
   */
  constructor(
    private readonly prefix: EndpointNames,
    private readonly routes: IRoute[]
  ) {
    this.handleRoutes()
  }

  private handleRoutes() {
    console.log(`INICIANDO PATHS para ${this.prefix}`)
    this.routes.forEach((route) => {
      const fullPath = `/${this.prefix}${route.path}`.replace(/\/+/g, '/')

      const asyncMiddlewares = route.middlewares?.map((middleware) =>
        this.asyncHandler(middleware)
      )
      const asyncHandler = this.asyncHandler(route.handler)

      this.router[route.method](
        fullPath,
        ...(asyncMiddlewares ?? []),
        asyncHandler
      )

      console.info('Path inicializado: ', { path: fullPath, route })
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
