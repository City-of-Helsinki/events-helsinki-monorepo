import { InternalServerError } from '@tsed/exceptions';
import type { UnPromisify } from 'events-helsinki-core';
import type { PrismaClientDbMain } from 'events-helsinki-db-main-prisma';
import type { SearchPoemsParams } from './SearchPoems.types';

type SearchPoems = UnPromisify<ReturnType<SearchPoemsQuery['searchPoems']>>;

export class SearchPoemsQuery {
  constructor(private readonly prisma: PrismaClientDbMain) {}

  execute = async (params: SearchPoemsParams) => {
    return this.mapToResult(await this.searchPoems(params));
  };

  private mapToResult = (rows: SearchPoems) => {
    // https://www.prisma.io/docs/support/help-articles/working-with-many-to-many-relations#explicit-relations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rows.map((poem: any) => {
      const { createdAt, updatedAt, keywords, ...rest } = poem;
      return {
        ...rest,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        keywords: keywords.map((keyword: any) => keyword.keyword.name),
      };
    });
  };

  /**
   * @todo for many-to-many better to use raw query for
   * significantly better performance (n+1...)
   */
  private searchPoems = async (params: SearchPoemsParams) => {
    const { limit, offset } = params ?? {};
    try {
      return await this.prisma.poem.findMany({
        skip: offset,
        take: limit,
        include: {
          keywords: {
            include: {
              keyword: true,
            },
          },
        },
        orderBy: { author: 'desc' },
      });
    } catch (e) {
      throw new InternalServerError(`Poems can't be retrieved`, e);
    }
  };
}
