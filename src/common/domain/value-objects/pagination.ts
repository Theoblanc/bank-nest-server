export class Cursor {
  constructor(
    public readonly value: string,
    public readonly pointer: string
  ) {}
}

export class Offset {
  constructor(
    public readonly skip: number,
    public readonly take: number
  ) {}
}

export type PaginationMethod = Cursor | Offset;
