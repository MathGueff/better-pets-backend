import { UserController } from '../controllers/user.controller'
import { BaseRouter } from '../core/base.router'
import { EndpointNames } from '../types/endpoints'
import { HttpMethod } from '../types/http-method'
import { IRoute } from '../types/route.type'

export class UserRouter extends BaseRouter {
  constructor(
    prefix: EndpointNames = EndpointNames.USER,
    controller: UserController = new UserController()
  ) {
    const routes: IRoute[] = [
      { path: '/', method: HttpMethod.GET, handler: controller.list },
      { path: '/', method: HttpMethod.POST, handler: controller.register },
      { path: '/', method: HttpMethod.POST, handler: controller.login }
    ]
    super(prefix, routes)
  }
}
