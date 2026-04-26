export type TApiResponse = { message: string; code: number; success: boolean }
export type TApiSuccess<T> = TApiResponse & { data?: T }
export type TApiError<T> = TApiResponse & { error?: T }