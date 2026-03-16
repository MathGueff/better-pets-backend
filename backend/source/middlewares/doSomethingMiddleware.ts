import { NextFunction, Request, Response } from 'express'

export const doSomethingMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`I'm doing something at ${new Date().getDate()}`)
  next()
}
