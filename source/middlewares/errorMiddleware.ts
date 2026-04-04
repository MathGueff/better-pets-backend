import type { NextFunction, Request, Response } from 'express'
import z from 'zod'
import { ResponseHandler } from '../utils/responseHandler'

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const responseHandler = new ResponseHandler()
  if (error instanceof z.ZodError) {
    const issues = error.issues.map((issue) => {
      return { field: issue.path.join('.'), message: issue.message }
    })
    return responseHandler.badRequest(res, 'Erro de validação', issues)
  }

  return responseHandler.internalServerError(
    res,
    'Erro interno do servidor',
    error
  )
}
