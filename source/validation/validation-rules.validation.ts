import { z } from '../config/zod'

export type ValidationRules<T> = Record<
  keyof T,
  z.ZodType
>
