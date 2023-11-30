import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { NGO } from '../model/ngo.model';
import { NGOsStateService } from './ngos.state.service';
import { combineLatest, switchMap, tap } from 'rxjs';
import { AuthStateService } from 'src/app/auth/data_access/auth.state.service';
import { ID } from 'src/app/core/types/id.type';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { ListApiResponse } from 'src/app/core/types/list-response.type';
import { USER_ROLES } from 'src/app/core/user-roles.enum';
import { INITIAL_PAGINATION_STATE, ProjectsStateService } from '../../projects/data-access/projects.state.service';
import { createListHttpParams } from 'src/app/core/list-http-params.factory';
import { ProjectsApiService } from '../../projects/data-access/projects.api.service';

export interface GetAllNGOsParams {}

export interface AddNGOFormValue {}

export type UpdateNGOProfileFormValue = Partial<
  Pick<NGO, 'address' | 'description' | 'email' | 'phone' | 'tags'> & {
    disabled?: boolean;
    reason?: string;
    businessAreaIds: string[];
  }
>;

@Injectable({
  providedIn: 'root',
})
export class NGOsApiService extends HttpBaseService {
  private stateService = inject(NGOsStateService);
  private projectsStateService = inject(ProjectsStateService);
  private projectsService = inject(ProjectsApiService);
  private authState = inject(AuthStateService);

  constructor() {
    super('ngos');
  }

  confirm(id: ID) {}

  add(payload: AddNGOFormValue) {
    return this.http.post<NGO>(`${this.url}`, payload);
  }

  updateLogo(logo: File, id: string) {
    const formData: FormData = new FormData();
    formData.append('file', logo);

    this.http.post(`${this.url.replace('ngos', 'organizations')}/${id}/logo`, formData).subscribe();
  }

  updateProfile(payload: UpdateNGOProfileFormValue, id: string) {
    this.stateService.setState({ updateProfileCallState: 'LOADING' });

    return this.http.patch(`${this.url}/${id}`, payload).pipe(
      tap(() => {
        this.stateService.setState({ updateProfileCallState: 'LOADED' });
        this.getProfile();
      })
    );
  }

  getProfile() {
    this.stateService.setState({ loadProfileCallState: 'LOADING' });
    console.log('test', this.url);
    const user = this.authState.$value().user;

    if (!user) {
      return;
    }

    this.http
      .get<NGO>(`${user.role === USER_ROLES.NGO_USER ? this.url : this.url.replace('ngos', 'companies')}/my`)
      .pipe(
        tap(ngo => {
          console.log({ ngo });
          this.stateService.setState({ loadProfileCallState: 'LOADED', profile: ngo });
        })
      )
      .subscribe();
  }

  getAll(
    params: PaginationFilters & { search: string } & { id?: string } = {
      pageIndex: 0,
      pageSize: INITIAL_PAGINATION_STATE.size,
      search: '',
    }
  ) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    this.http
      .get<ListApiResponse<NGO>>(this.url, { params: createListHttpParams(params) })
      .pipe(
        tap(response => {
          console.log({ response });
          this.stateService.setState({
            loadListCallState: 'LOADED',
            list: response.content,
            totalElements: response.totalElements,
          });
        })
      )
      .subscribe();
  }

  getById(id: ID) {
    this.stateService.setState({ loadByIdCallState: 'LOADING' });
    console.log();
    this.http
      .get<NGO>(`${this.url}/${id}`)
      .pipe(
        tap(ngo => {
          this.stateService.setState({ loadByIdCallState: 'LOADED', details: ngo });
        }),
        switchMap(ngo => {
          return combineLatest(ngo.projects.slice(0, 3).map(project => this.projectsService.getById(project.id)));
        }),
        tap(projects => {
          this.projectsStateService.setState({ loadListCallState: 'LOADING' });

          this.projectsStateService.setState({ loadListCallState: 'LOADED', list: projects });
        })
      )
      .subscribe();
  }

  getCurrentNgo(id: ID) {
    this.stateService.setState({ loadByIdCallState: 'LOADING' });

    this.http
      .get<NGO>(`$users/${id}/ngo`)
      .pipe(
        tap(ngo => {
          this.stateService.setState({ loadByIdCallState: 'LOADED', details: ngo });
        })
      )
      .subscribe();
  }
}
