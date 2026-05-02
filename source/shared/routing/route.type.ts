import { RequestHandler } from 'express'
import { HttpMethod } from '../http-method'

export interface IRoute {
  method: HttpMethod
  path: string
  middlewares?: RequestHandler[]
  handler: RequestHandler
}
