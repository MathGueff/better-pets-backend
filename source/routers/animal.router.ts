import { AnimalsController } from '../controllers/animal.controller'
import type { IRoutes } from '../core/base.router'
import { BaseRouter, HttpMethod } from '../core/base.router'
import { Endpoint, EndpointNames } from '../global/endpoints'

class AnimalsRouter extends BaseRouter {
  constructor(
    prefix: string = Endpoint(EndpointNames.ANIMALS),
    controller: AnimalsController = new AnimalsController()
  ) {
    const routes: IRoutes = [
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
