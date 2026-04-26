import { HealthController } from '../controllers/health.controller'
import type { IRoute } from '../core/base.router'
import { BaseRouter, HttpMethod } from '../core/base.router'
import { Endpoint, EndpointNames } from '../global/endpoints'

class HealthRouter extends BaseRouter {
  constructor(
    prefix: string = Endpoint(EndpointNames.HEALTH),
    controller: HealthController = new HealthController()
  ) {
    const routes: Array<IRoute> = [
      { method: HttpMethod.GET, path: '/', handler: controller.check }
    ]
    super(prefix, routes)
  }
}

const healthRouter = new HealthRouter()
export default healthRouter
