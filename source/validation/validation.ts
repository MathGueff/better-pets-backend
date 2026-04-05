import { z } from '../config/zod'

export type ValidationRules<T, OmitKeys extends keyof T> = Record<keyof Omit<T, OmitKeys>, z.ZodType>
