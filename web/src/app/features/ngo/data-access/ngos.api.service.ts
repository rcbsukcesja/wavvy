import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { NGO } from '../model/ngo.model';
import { NGOsStateService } from './ngos.state.service';
import { tap } from 'rxjs';
import { AuthStateService } from 'src/app/auth/data_access/auth.state.service';
import { ID } from 'src/app/core/types/id.type';

export interface GetAllNGOsParams {}

export interface AddNGOFormValue {}

export type UpdateNGOProfileFormValue = Partial<
  Pick<NGO, 'address' | 'description' | 'email' | 'phone' | 'tags' | 'businnessAreas' | 'logo'>
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

    return this.http.put(`${this.url}/${id}`, payload).pipe(
      tap(() => {
        this.stateService.setState({ updateProfileCallState: 'LOADED' });
        this.getProfile();
      })
    );
  }

  getProfile() {
    this.stateService.setState({ loadProfileCallState: 'LOADING' });

    this.http
      .get<NGO[]>(`${this.url}/?userId=${this.authState.$value().user!.id}`)
      .pipe(
        tap(([ngo]) => {
          console.log(ngo);
          this.stateService.setState({ loadProfileCallState: 'LOADED', profile: ngo });
        })
      )
      .subscribe();
  }

  getAll(params: GetAllNGOsParams = {}) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    this.http
      .get<NGO[]>(`${this.url}`)
      .pipe(
        tap(ngos => {
          this.stateService.setState({ loadListCallState: 'LOADED', list: ngos });
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
