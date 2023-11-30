import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Company } from '../model/company.model';
import { CompaniesStateService } from './companies.state.service';
import { tap } from 'rxjs';
import { ID } from 'src/app/core/types/id.type';
import { NgoStatus } from '../../ngo/model/ngo.model';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { ListApiResponse } from 'src/app/core/types/list-response.type';
import { INITIAL_PAGINATION_STATE } from '../../projects/data-access/projects.state.service';
import { createListHttpParams } from 'src/app/core/list-http-params.factory';

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

  confirm(id: string) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    this.http
      .patch(`${this.url}/${id}`, {
        confirmed: true,
      })
      .pipe(
        tap(() => {
          this.stateService.setState({
            loadListCallState: 'LOADED',
            list: this.stateService.$value().list.map(c => {
              if (c.id === id) {
                return {
                  ...c,
                  confirmed: true,
                };
              }

              return c;
            }),
          });
        })
      )
      .subscribe();
  }

  add(payload: AddCompanyFormValue) {
    return this.http.post<Company>(`${this.url}`, payload);
  }

  update(id: ID, payload: Partial<AddCompanyFormValue & { status: keyof typeof NgoStatus }>) {
    return this.http.patch<Company>(`${this.url}/${id}`, payload).pipe();
  }

  delete(id: ID) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getAll(
    params: PaginationFilters & { search: string } & { id?: string } = {
      pageIndex: 0,
      pageSize: INITIAL_PAGINATION_STATE.size,
      search: '',
    }
  ) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    return this.http
      .get<ListApiResponse<Company>>(this.url, { params: createListHttpParams(params) })
      .pipe(
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
