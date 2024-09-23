export class PageInfo<T> {
  constructor(
    public readonly items: T[],
    public readonly totalCount: number,
    public readonly hasNextPage: boolean
  ) {}
}
