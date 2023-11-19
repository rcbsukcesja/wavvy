import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Company } from '../model/company.model';
import { CompaniesStateService } from './companies.state.service';
import { map, tap } from 'rxjs';
import { ID } from 'src/app/core/types/id.type';
import { NgoStatus } from '../../ngo/model/ngo.model';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { ListApiResponse } from 'src/app/core/types/list-response.type';

export interface GetAllCompaniesParams {}

export interface AddCompanyFormValue {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  link: string;
  categories: { id: ID; name: string }[];
  disabled?: boolean;
  reason?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompaniesApiService extends HttpBaseService {
  private stateService = inject(CompaniesStateService);

  constructor() {
    super('companies');
  }

  confirm(id: ID) {}

  add(payload: AddCompanyFormValue) {
    return this.http.post<Company>(`${this.url}`, payload);
  }

  update(id: ID, payload: Partial<AddCompanyFormValue & { status: keyof typeof NgoStatus }>) {
    return this.http.patch<Company>(`${this.url}/${id}`, payload).pipe();
  }

  delete(id: ID) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getAll(params: PaginationFilters & { search: string } & { id?: string } = { pageIndex: 0, pageSize: 5, search: '' }) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    const url = new URL(this.url);
    const sp = new URLSearchParams({
      // _sort: 'startTime',
      // _order: params.sort,
      q: params.search,
      // _page: params.pageIndex.toString(),
      _start: (params.pageIndex * params.pageSize).toString(),
      _limit: params.pageSize.toString(),
      id_like: params.id || '',
    });

    url.search = sp.toString();

    return this.http
      .get<Company[]>(url.href, { observe: 'response' })
      .pipe(
        map(response => {
          const totalCount = response.headers.get('X-Total-Count');

          return {
            content: response.body,
            empty: response.body?.length === 0,
            last: false,
            number: params.pageIndex,
            numberOfElements: response.body?.length,
            totalElements: totalCount ? +totalCount : 0,
            totalPages: totalCount ? Math.ceil(+totalCount / params.pageSize) : 0,
          } as ListApiResponse<Company>;
        }),
        tap(response => {
          this.stateService.setState({
            loadListCallState: 'LOADED',
            list: response.content,
            totalElements: response.totalElements,
          });
        })
      )
      .subscribe();
  }
}
