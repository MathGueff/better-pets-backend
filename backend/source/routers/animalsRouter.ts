import { BaseRouter, HttpMethod, IRoutes } from '../core/baseRouter'
import { AnimalsController } from '../controllers/animalsController'

class AnimalsRouter extends BaseRouter {
  constructor() {
    const controller = new AnimalsController()
    const routes: IRoutes = [
      { method: HttpMethod.GET, path: '/', handler: controller.list },
      { method: HttpMethod.POST, path: '/', handler: controller.create },
      { method: HttpMethod.GET, path: '/:id', handler: controller.findById },
      { method: HttpMethod.DELETE, path: '/:id', handler: controller.delete },
      { method: HttpMethod.PATCH, path: '/:id', handler: controller.update }
    ]
    super('/animals', routes)
  }
}

const animalsRouter = new AnimalsRouter()
export default animalsRouter
