import type { Response } from 'express'
import type { IEntity } from '../interfaces/entity'

type data = Array<IEntity> | IEntity

type IApiResponse<T extends data> = { message: string; code: number; data?: T }

export class ResponseHandler<T extends data> {
  ok = (res: Response, message: string, data?: T) => {
    this.send(res, 200, message, data)
  }

  created = (res: Response, message: string, data?: T) => {
    this.send(res, 201, message, data)
  }

  notFound = (res: Response, message: string, data?: T) => {
    this.send(res, 404, message, data)
  }

  send = (res: Response, code: number, message: string, data?: T) => {
    const content: IApiResponse<T> = { message, code, data }
    res.status(content.code).json(content)
  }
}
