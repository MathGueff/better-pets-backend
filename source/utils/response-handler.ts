import type { Response } from 'express'
import { TApiError, TApiSuccess } from '../types/response'

export class ResponseHandler {
  static callByCode = <T>(
    res: Response,
    code: number,
    message: string,
    data?: T
  ) => {
    if (code >= 200 && code <= 299) {
      this.sendSuccess(res, code, message, data)
    } else {
      this.sendError(res, code, message, data)
    }
  }

  static ok = <T>(res: Response, message: string, data?: T) => {
    this.sendSuccess(res, 200, message, data)
  }

  static created = <T>(res: Response, message: string, data?: T) => {
    this.sendSuccess(res, 201, message, data)
  }

  static notFound = <T>(res: Response, message: string, error?: T) => {
    this.sendError(res, 404, message, error)
  }

  static badRequest = <T>(res: Response, message: string, error?: T) => {
    this.sendError(res, 400, message, error)
  }

  static internalServerError = <T>(
    res: Response,
    message: string,
    error?: T
  ) => {
    this.sendError(res, 500, message, error)
  }

  private static sendSuccess = <T>(
    res: Response,
    code: number,
    message: string,
    data?: T
  ) => {
    const content: TApiSuccess<T> = { message, code, success: true, data }
    res.status(content.code).json(content)
  }

  private static sendError = <T>(
    res: Response,
    code: number,
    message: string,
    error?: T
  ) => {
    const content: TApiError<T> = { message, code, success: false, error }
    res.status(content.code).json(content)
  }
}
