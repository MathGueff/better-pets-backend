import { AnimalsController } from '../controllers/animal.controller'
import { BaseRouter } from '../core/base.router'
import { Endpoint, EndpointNames } from '../types/endpoints'
import { HttpMethod } from '../types/http-method'
import { IRoute } from '../types/route.type'

class AnimalsRouter extends BaseRouter {
  constructor(
    prefix: string = Endpoint(EndpointNames.ANIMALS),
    controller: AnimalsController = new AnimalsController()
  ) {
    const routes: IRoute[] = [
      { method: HttpMethod.GET, path: '/', handler: controller.list },
      { method: HttpMethod.POST, path: '/', handler: controller.create },
      { method: HttpMethod.GET, path: '/:id', handler: controller.findById },
      { method: HttpMethod.DELETE, path: '/:id', handler: controller.delete },
      { method: HttpMethod.PATCH, path: '/:id', handler: controller.update }
    ]
    super(prefix, routes)
  }
}

const animalsRouter = new AnimalsRouter()
export default animalsRouter
