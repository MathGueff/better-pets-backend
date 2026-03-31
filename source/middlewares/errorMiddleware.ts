import type { NextFunction, Request, Response } from 'express'
import z from 'zod'

export const errorMiddleware = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    console.log('🐞 Some issue ocurred', error.issues)
    return res.status(400).json({ errors: error.issues.map((err) => err.message) })
  }

  return res.status(error?.code ?? 500).json({ message: error?.message || 'Something went wrong' })
}
