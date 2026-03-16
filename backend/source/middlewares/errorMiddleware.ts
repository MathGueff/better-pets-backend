import { NextFunction, Request, Response } from 'express'
import z from 'zod'

export const errorMiddleware = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    console.log('🐞 Some issue ocurred', error.issues)
    return res.json({
      error: error.issues.map((err) => err.message)
    })
  }

  return res.json({
    error: 'Something went wrong'
  })
}
