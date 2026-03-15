import type { RequestHandler } from 'express'
import { Router } from 'express'

export enum HttpMethod {
	GET = 'get',
	POST = 'post',
	PATCH = 'patch',
	PUT = 'put',
	DELETE = 'delete'
}

export interface IRoute {
	path: string
	handler: RequestHandler
	middlewares?: Array<RequestHandler>
	method: HttpMethod
}

export type IRoutes = Array<IRoute>

export class BaseRouter {
	public router: Router
	/**
	 * @param prefix Prefixo da rota
	 * @param routes Rotas
	 */
	constructor(prefix: string, routes: Array<IRoute>) {
		this.router = Router()
		routes.forEach((route) => {
			const fullPath = `${prefix}${route.path}`.replace(/\/+/g, '/')
			this.router[route.method](
				fullPath,
				...(route.middlewares ?? []),
				this.wrap(route.handler)
			)
		})
	}

	private wrap(handler: RequestHandler): RequestHandler {
		return (req, res, next) =>
			Promise.resolve(handler(req, res, next)).catch(next)
	}
}
