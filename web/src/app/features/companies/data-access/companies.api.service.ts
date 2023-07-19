import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Company } from '../model/company.model';
import { CompaniesStateService } from './companies.state.service';
import { tap } from 'rxjs';

export interface GetAllCompaniesParams {}

export interface AddCompanyFormValue {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  link: string;
  categories: { id: number; name: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class CompaniesApiService extends HttpBaseService {
  private stateService = inject(CompaniesStateService);

  constructor() {
    super('companies');
  }

  add(payload: AddCompanyFormValue) {
    return this.http.post<Company>(`${this.url}`, payload);
  }

  update(id: string, payload: AddCompanyFormValue) {
    return this.http.patch<Company>(`${this.url}/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getAll(params: GetAllCompaniesParams = {}) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    return this.http
      .get<Company[]>(`${this.url}`)
      .pipe(
        tap(companies => {
          this.stateService.setState({ loadListCallState: 'LOADED', list: companies });
        })
      )
      .subscribe();
  }
}
