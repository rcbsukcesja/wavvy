import { HttpParams } from '@angular/common/http';
import { PaginationFilters } from './types/pagination.type';

export function createListHttpParams(
  params: { search: string } & PaginationFilters,
  sort?: 'asc' | 'desc'
): HttpParams {
  let sp = new HttpParams({
    fromObject: {
      page: params.pageIndex,
      size: params.pageSize,
      search: params.search,
    },
  });

  if (sort) {
    sp = sp.append('sort', `startTime,${sort}`);
  }

  return sp;
}
