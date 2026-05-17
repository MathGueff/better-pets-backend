import type { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errors/api.error'
import { BadValidationError } from '../errors/bad-validation.error'
import { ResponseHandler } from '../utils/response-handler'

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof BadValidationError) {
    return ResponseHandler.badRequest(
      res,
      error.message ?? 'Erro de validação',
      error.issues
    )
  }

  if (error instanceof ApiError) {
    return ResponseHandler.callByCode(
      res,
      error.code,
      error.message,
      error?.data
    )
  }

  return ResponseHandler.internalServerError(
    res,
    error instanceof Error ? error.message : 'Erro interno do servidor',
    error
  )
}
