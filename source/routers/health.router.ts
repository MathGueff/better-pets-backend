import { HealthController } from '../controllers/health.controller'
import { BaseRouter } from '../core/base.router'
import { Endpoint, EndpointNames } from '../shared/endpoints'
import { HttpMethod } from '../shared/http-method'
import { IRoute } from '../shared/routing/route.type'

class HealthRouter extends BaseRouter {
  constructor(
    prefix: string = Endpoint(EndpointNames.HEALTH),
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
