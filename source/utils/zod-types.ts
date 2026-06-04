import { z } from '../config/zod'
import { PaginationInput } from './pagination'
import { SortInput } from './sorting'

export type ZodEntityRules<T> = Record<keyof T, z.ZodType>

export type ZodFilterRules<T> = Record<
  keyof Omit<T, keyof PaginationInput | keyof SortInput>,
  z.ZodType
>
