import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Injectable, inject } from '@angular/core';
import { INITIAL_PAGINATION_STATE, ProjectsStateService } from './projects.state.service';
import { tap } from 'rxjs';
import { Project, ProjectStatus } from '../model/project.model';
import { Router } from '@angular/router';
import { ID } from 'src/app/core/types/id.type';
import { NGOsStateService } from '../../ngo/data-access/ngos.state.service';
import { CommonFilters, DEFAULT_SORT } from 'src/app/shared/ui/common-filters.component';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { ListApiResponse } from 'src/app/core/types/list-response.type';
import { createListHttpParams } from 'src/app/core/list-http-params.factory';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface GetAllProjectsParams {}

export interface AddProjectFormValue {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  links: string[];
  possibleVolunteer: boolean;
  tags: string[];
  cooperationMessage: string;
  status: ProjectStatus;
  budget: number;
  address: {
    city: string;
    zipCode: string;
    street: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsApiService extends HttpBaseService {
  private stateService = inject(ProjectsStateService);
  private router = inject(Router);

  private snack = inject(MatSnackBar);

  constructor() {
    super('projects');
  }

  uploadProjectImage(logo: File, projectId: ID) {
    const formData: FormData = new FormData();
    formData.append('file', logo);

    const start = this.snack.open('Rozpoczęto dodawanie obrazka', '', {
      duration: 0,
      verticalPosition: 'top',
    });

    this.http
      .post<Project>(`${this.url}/${projectId}/image`, formData)
      .pipe(
        tap(updated => {
          start.dismiss();
          this.snack.open('Udało się!, Dodano obrazek projektu', '', {
            duration: 2000,
            verticalPosition: 'top',
          });
          this.stateService.setState({
            list: this.stateService.$value().list.map(project => {
              return projectId === project.id
                ? {
                    ...project,
                    imageLink: updated.imageLink,
                  }
                : project;
            }),
          });
        })
      )
      .subscribe();
  }

  add(payload: AddProjectFormValue) {
    this.http
      .post<Project>(`${this.url}`, {
        ...payload,
        address: {
          ...payload.address,
          country: 'Polska',
        },
      })
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
    payload: Partial<AddProjectFormValue & { disabled: boolean; reason: string }>,
    filters?: CommonFilters & PaginationFilters
  ) {
    this.http
      .patch<Project>(`${this.url}/${id}`, {
        ...payload,
      })
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
          this.getAllMine();
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
      .get<Project[]>(`${this.url}/my`)
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

    this.http
      .get<ListApiResponse<Project>>(this.url + '/my', { params: createListHttpParams(params, params.sort) })
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
