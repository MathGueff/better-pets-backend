import { HealthController } from '../controllers/health.controller'
import { BaseRouter } from '../core/base.router'
import { EndpointNames } from '../types/endpoints'
import { HttpMethod } from '../types/http-method'
import { IRoute } from '../types/route.type'

class HealthRouter extends BaseRouter {
  constructor(
    prefix = EndpointNames.HEALTH,
    controller: HealthController = new HealthController()
  ) {
    const routes: IRoute[] = [
      { method: HttpMethod.GET, path: '/', handler: controller.check }
    ]
    super(prefix, routes)
  }
}

const healthRouter = new HealthRouter()
export default healthRouter
