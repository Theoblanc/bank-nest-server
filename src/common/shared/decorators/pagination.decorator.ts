import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Cursor, Offset } from '@common/domain/value-objects/pagination';

export const Paginate = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { cursorPagination, offsetPagination } = ctx.getArgs();

    if (cursorPagination) {
      return new Cursor(cursorPagination.after, cursorPagination.first);
    } else if (offsetPagination) {
      return new Offset(offsetPagination.skip, offsetPagination.take);
    } else {
      throw new Error('Either cursor or offset pagination must be provided');
    }
  }
);

export function Paginated() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);
      const paginationInfo = args[args.length - 1];

      const totalCount = await this.getTotalCount(args[0]);

      return {
        items: result,
        pageInfo: {
          hasNextPage:
            result.length ===
            (paginationInfo instanceof Offset
              ? paginationInfo.take
              : paginationInfo.first),
          totalCount: totalCount,
          endCursor: result.length > 0 ? result[result.length - 1].id : null
        }
      };
    };

    return descriptor;
  };
}
