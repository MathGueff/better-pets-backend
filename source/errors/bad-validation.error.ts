import { z } from '../config/zod'

type BadValidationErrorParams = { message: string; error: z.ZodError }

type ErrorIssues = { field: string; message: string }

export class BadValidationError extends Error {
  public issues: ErrorIssues[]
  constructor({ message, error }: BadValidationErrorParams) {
    super(message)
    this.issues = error.issues.map((issue) => {
      return { field: issue.path.join('.'), message: issue.message }
    })
  }
}
