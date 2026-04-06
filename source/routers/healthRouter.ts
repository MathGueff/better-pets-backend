import { HealthController } from '../controllers/healthController'
import type { IRoute } from '../core/baseRouter'
import { BaseRouter, HttpMethod } from '../core/baseRouter'
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
