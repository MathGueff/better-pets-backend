import type { Response } from 'express'

type ApiResponse = { message: string; code: number; status: boolean }
type ApiSuccess<T> = ApiResponse & { data?: T }
type ApiError<T> = ApiResponse & { error?: T }

export class ResponseHandler {
  ok = <T>(res: Response, message: string, data?: T) => {
    this.sendSuccess(res, 200, message, data)
  }

  created = <T>(res: Response, message: string, data?: T) => {
    this.sendSuccess(res, 201, message, data)
  }

  notFound = <T>(res: Response, message: string, error?: T) => {
    this.sendError(res, 404, message, error)
  }

  badRequest = <T>(res: Response, message: string, error?: T) => {
    this.sendError(res, 400, message, error)
  }

  internalServerError = <T>(res: Response, message: string, error?: T) => {
    this.sendError(res, 500, message, error)
  }

  private sendSuccess = <T>(
    res: Response,
    code: number,
    message: string,
    data?: T
  ) => {
    const content: ApiSuccess<T> = { message, code, data, status: true }
    res.status(content.code).json(content)
  }

  private sendError = <T>(
    res: Response,
    code: number,
    message: string,
    error?: T
  ) => {
    const content: ApiError<T> = { message, code, error, status: false }
    res.status(content.code).json(content)
  }
}
