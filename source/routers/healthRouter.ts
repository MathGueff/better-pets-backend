import { HealthController } from '../controllers/healthController'
import type { IRoute } from '../core/baseRouter'
import { BaseRouter, HttpMethod } from '../core/baseRouter'

class HealthRouter extends BaseRouter {
  constructor(prefix: string) {
    const controller: HealthController = new HealthController()
    const routes: Array<IRoute> = [
      { method: HttpMethod.GET, path: '/', handler: controller.check }
    ]
    super(prefix, routes)
  }
}

const healthRouter = new HealthRouter('/health')
export default healthRouter
