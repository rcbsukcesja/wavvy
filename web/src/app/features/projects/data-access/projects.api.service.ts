import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Injectable, inject } from '@angular/core';
import { ProjectsStateService } from './projects.state.service';
import { tap } from 'rxjs';
import { Project } from '../model/project.model';
import { Router } from '@angular/router';

export interface GetAllProjectsParams {}

export interface AddProjectFormValue {
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
export class ProjectsApiService extends HttpBaseService {
  private stateService = inject(ProjectsStateService);
  private router = inject(Router);

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

  update(id: string, payload: AddProjectFormValue) {
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

  delete(id: string) {
    this.http
      .delete(`${this.url}/${id}`)
      .pipe(
        tap(() => {
          this.getAll();
        })
      )
      .subscribe();
  }

  getById(id: string) {
    return this.http.get<Project>(`${this.url}/${id}`);
  }

  getByNGOId(id: string) {
    this.stateService.setState({ loadListByNGOIdCallState: 'LOADING' });

    this.http
      .get<Project[]>(`${this.url}/?ngoId=${id}`)
      .pipe(
        tap(projects => {
          this.stateService.setState({ loadListByNGOIdCallState: 'LOADED', listByNGOId: projects });
        })
      )
      .subscribe();
  }

  getAll(params: GetAllProjectsParams = {}) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    this.http
      .get<Project[]>(`${this.url}`)
      .pipe(
        tap(projects => {
          this.stateService.setState({ loadListCallState: 'LOADED', list: projects });
        })
      )
      .subscribe();
  }
}
