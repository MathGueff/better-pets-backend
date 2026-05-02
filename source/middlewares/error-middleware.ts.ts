import type { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errors/api.error'
import { ResponseHandler } from '../utils/response-handler'
import { BadValidationError } from '../errors/bad-validation.error'

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const responseHandler = new ResponseHandler()
  if (error instanceof BadValidationError) {
    return responseHandler.badRequest(
      res,
      error.message ?? 'Erro de validação',
      error.issues
    )
  }

  if (error instanceof ApiError) {
    return responseHandler.callByCode(
      res,
      error.code,
      error.message,
      error?.data
    )
  }

  return responseHandler.internalServerError(
    res,
    error instanceof Error ? error.message : 'Erro interno do servidor',
    error
  )
}
