import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { NGO, NgoStatus } from '../model/ngo.model';
import { NGOsStateService } from './ngos.state.service';
import { map, tap } from 'rxjs';
import { AuthStateService } from 'src/app/auth/data_access/auth.state.service';
import { ID } from 'src/app/core/types/id.type';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { ListApiResponse } from 'src/app/core/types/list-response.type';

export interface GetAllNGOsParams {}

export interface AddNGOFormValue {}

export type UpdateNGOProfileFormValue = Partial<
  Pick<NGO, 'address' | 'description' | 'email' | 'phone' | 'tags' | 'businnessAreas' | 'logoUrl'> & {
    status?: keyof typeof NgoStatus;
  }
>;

@Injectable({
  providedIn: 'root',
})
export class NGOsApiService extends HttpBaseService {
  private stateService = inject(NGOsStateService);
  private authState = inject(AuthStateService);

  constructor() {
    super('ngos');
  }

  add(payload: AddNGOFormValue) {
    return this.http.post<NGO>(`${this.url}`, payload);
  }

  updateLogo(logo: File) {
    const formData: FormData = new FormData();
    formData.append('file', logo);

    this.http.post(`${this.url}/my`, formData).subscribe();
  }

  updateProfile(payload: UpdateNGOProfileFormValue, id: ID) {
    this.stateService.setState({ updateProfileCallState: 'LOADING' });

    console.log({ payload });

    return this.http.patch(`${this.url}/${id}`, payload).pipe(
      tap(() => {
        this.stateService.setState({ updateProfileCallState: 'LOADED' });
        this.getProfile();
      })
    );
  }

  getProfile() {
    this.stateService.setState({ loadProfileCallState: 'LOADING' });

    this.http
      .get<NGO[]>(`${this.url}/?owner.id=${this.authState.$value().user!.id}`)
      .pipe(
        tap(([ngo]) => {
          console.log(ngo);
          this.stateService.setState({ loadProfileCallState: 'LOADED', profile: ngo });
        })
      )
      .subscribe();
  }

  getAll(params: PaginationFilters = { pageIndex: 0, pageSize: 5 }) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    const url = new URL(this.url);
    const sp = new URLSearchParams({
      // _sort: 'startTime',
      // _order: params.sort,
      // q: params.search,
      // _page: params.pageIndex.toString(),
      _start: (params.pageIndex * params.pageSize).toString(),
      _limit: params.pageSize.toString(),
    });

    url.search = sp.toString();

    this.http
      .get<NGO[]>(url.href, { observe: 'response' })
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
          } as ListApiResponse<NGO>;
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

  getById(id: ID) {
    this.stateService.setState({ loadByIdCallState: 'LOADING' });

    this.http
      .get<NGO>(`${this.url}/${id}`)
      .pipe(
        tap(ngo => {
          this.stateService.setState({ loadByIdCallState: 'LOADED', details: ngo });
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
