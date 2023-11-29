import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Injectable, inject } from '@angular/core';
import { INITIAL_PAGINATION_STATE, ProjectsStateService } from './projects.state.service';
import { map, tap } from 'rxjs';
import { Project } from '../model/project.model';
import { Router } from '@angular/router';
import { ID } from 'src/app/core/types/id.type';
import { NGOsStateService } from '../../ngo/data-access/ngos.state.service';
import { CommonFilters, DEFAULT_SORT } from 'src/app/shared/ui/common-filters.component';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { ListApiResponse } from 'src/app/core/types/list-response.type';
import { HttpParams } from '@angular/common/http';
import { createListHttpParams } from 'src/app/core/list-http-params.factory';

export interface GetAllProjectsParams {}

export interface AddProjectFormValue {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  link: string;
  categories: { id: ID; name: string }[];
  reason?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsApiService extends HttpBaseService {
  private stateService = inject(ProjectsStateService);
  private router = inject(Router);

  private ngoState = inject(NGOsStateService).$value;

  constructor() {
    super('projects');
  }

  uploadProjectImage(logo: File, projectId: ID) {
    const formData: FormData = new FormData();
    formData.append('file', logo);

    this.http.post(`${this.url}/${projectId}/logo`, formData).subscribe();
  }

  add(payload: AddProjectFormValue) {
    const ngo = this.ngoState().profile;

    if (ngo) {
      payload = { ...payload, ngoId: ngo.id } as AddProjectFormValue;
    }

    this.http
      .post<Project>(`${this.url}`, payload)
      .pipe(
        tap(() => {
          this.getAll();
          this.router.navigateByUrl('/manage/projects');
        })
      )
      .subscribe();
  }

  update(
    id: ID,
    payload: Partial<AddProjectFormValue & { disabled: boolean }>,
    filters?: CommonFilters & PaginationFilters
  ) {
    this.http
      .patch<Project>(`${this.url}/${id}`, payload)
      .pipe(
        tap(() => {
          this.getAll(filters);
          this.router.navigateByUrl('/manage/projects');
        })
      )
      .subscribe();
  }

  delete(id: ID) {
    this.http
      .delete(`${this.url}/${id}`)
      .pipe(
        tap(() => {
          this.getAll();
        })
      )
      .subscribe();
  }

  getById(id: ID) {
    return this.http.get<Project>(`${this.url}/${id}`);
  }

  getByNGOId(id: ID) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    this.http
      .get<Project[]>(`${this.url}/?ngoId=${id}`)
      .pipe(
        tap(projects => {
          this.stateService.setState({ loadListCallState: 'LOADED', list: projects });
        })
      )
      .subscribe();
  }

  getAllMine(
    params: CommonFilters & PaginationFilters & { id?: string } = {
      sort: DEFAULT_SORT,
      search: '',
      pageIndex: 0,
      pageSize: INITIAL_PAGINATION_STATE.size,
    }
  ) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    // todo: mock before backend
    const ngo = this.ngoState().profile;

    const url = new URL(this.url);
    const sp = new URLSearchParams({
      _sort: 'startTime',
      _order: params.sort,
      q: params.search,
      // _page: params.pageIndex.toString(),
      _start: (params.pageIndex * params.pageSize).toString(),
      _limit: params.pageSize.toString(),
      // id_like: params.id || '',
    });

    if (ngo) {
      sp.append('ngoId', ngo.id.toString());
    }

    url.search = sp.toString();

    this.http
      .get<Project[]>(url.href, { observe: 'response' })
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
          } as ListApiResponse<Project>;
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

  getAll(
    params: CommonFilters & PaginationFilters & { id?: string } = {
      sort: DEFAULT_SORT,
      search: '',
      pageIndex: 0,
      pageSize: INITIAL_PAGINATION_STATE.size,
    }
  ) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    this.http
      .get<ListApiResponse<Project>>(this.url, {
        params: createListHttpParams(params, params.sort),
      })
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
