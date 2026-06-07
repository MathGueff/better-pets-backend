export type SortInput = { sortBy?: string; sortOrder?: 'ASC' | 'DESC' }
type SortOutput = { sortBy?: string; sortOrder?: 1 | -1 }

export class SortedQuery {
  sortBy: SortOutput['sortBy']
  sortOrder: SortOutput['sortOrder']
  constructor(sort: SortInput) {
    this.sortBy = sort.sortBy
    this.sortOrder = this.sortBy
      ? this.getSortMapped(sort.sortOrder)
      : undefined
  }

  private getSortMapped(
    sortOrder: SortInput['sortOrder']
  ): NonNullable<SortOutput['sortOrder']> {
    switch (sortOrder) {
      case 'ASC':
        return 1
      case 'DESC':
      default:
        return -1
    }
  }

  public getObjectSort(): Record<string, NonNullable<SortOutput['sortOrder']>> {
    if (!this.sortBy || !this.sortOrder) return {}
    return { [this.sortBy.toString()]: this.sortOrder }
  }
}
