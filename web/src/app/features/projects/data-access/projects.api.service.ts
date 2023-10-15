import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Injectable, inject } from '@angular/core';
import { ProjectsStateService } from './projects.state.service';
import { tap } from 'rxjs';
import { Project } from '../model/project.model';
import { Router } from '@angular/router';
import { ID } from 'src/app/core/types/id.type';
import { AuthStateService } from 'src/app/auth/data_access/auth.state.service';
import { NGOsStateService } from '../../ngo/data-access/ngos.state.service';

export interface GetAllProjectsParams {}

export interface AddProjectFormValue {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  link: string;
  categories: { id: ID; name: string }[];
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

  add(payload: AddProjectFormValue) {
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

  update(id: ID, payload: AddProjectFormValue) {
    this.http
      .patch<Project>(`${this.url}/${id}`, payload)
      .pipe(
        tap(() => {
          this.getAll();
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

  getAll(params: GetAllProjectsParams = {}) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    // todo: mock before backend
    const ngo = this.ngoState().profile;

    let url = `${this.url}`;

    if (ngo) {
      url = `${this.url}/?ngoId=${ngo.id}`;
    }

    this.http
      .get<Project[]>(url)
      .pipe(
        tap(projects => {
          this.stateService.setState({ loadListCallState: 'LOADED', list: projects });
        })
      )
      .subscribe();
  }
}
