import type { NextFunction, Request, Response } from 'express'
import { z } from '../config/zod'
import { ApiError } from '../errors/api.error'
import { ResponseHandler } from '../utils/response-handler'

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const responseHandler = new ResponseHandler()
  if (error instanceof z.ZodError) {
    console.log(error)
    const issues = error.issues.map((issue) => {
      return { field: issue.path.join('.'), message: issue.message }
    })
    return responseHandler.badRequest(res, 'Erro de validação', issues)
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
    error?.message ?? 'Erro interno do servidor',
    error
  )
}
