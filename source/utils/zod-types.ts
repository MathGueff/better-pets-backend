import { z } from '../config/zod'
import { PaginationInput } from '../shared/pagination'
import { SortInput } from '../shared/sorting'

export type ZodEntityRules<T> = Record<keyof T, z.ZodType>

export type ZodFilterRules<T> = {
  [K in keyof Omit<T, keyof PaginationInput | keyof SortInput>]: z.ZodType
}
