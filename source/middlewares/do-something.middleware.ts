import type { NextFunction, Request, Response } from 'express'

export const doSomethingMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`I'm doing ${req.method} at ${new Date()}`)
  next()
}
