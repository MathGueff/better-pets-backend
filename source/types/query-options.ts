import { PaginatedQuery } from "../utils/pagination"
import { SortedQuery } from "../utils/sorting"

export type QueryOptions = {
  pagination: PaginatedQuery,
  sort: SortedQuery
}