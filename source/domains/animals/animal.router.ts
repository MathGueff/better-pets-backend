import { AnimalsController } from './animal.controller'
import { BaseRouter } from '../../core/base.router'
import { EndpointNames } from '../../types/endpoints'
import { HttpMethod } from '../../types/http-method'
import { IRoute } from '../../types/route.type'

export class AnimalsRouter extends BaseRouter {
  constructor(
    prefix = EndpointNames.ANIMALS,
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
