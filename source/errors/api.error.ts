export class ApiError extends Error {
  code: number
  data?: any
  constructor(message: string, code: number, data?: any) {
    super(message)
    this.code = code
    this.data = data
  }
}
