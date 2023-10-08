import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { NgoRegisterFormStateService } from './ngo-register.state.service';
import { tap } from 'rxjs';
import { NgoRegisterForm } from '../model/ngo-register-form.model';

export interface GetAllOffersParams {}

export type NgoRegisterFormUpdateValue =
  | {
      status: 'REJECTED';
      reason: string;
    }
  | { status: 'ACCEPTED' };

@Injectable({
  providedIn: 'root',
})
export class NgoRegisterFormApiService extends HttpBaseService {
  private stateService = inject(NgoRegisterFormStateService);

  constructor() {
    super('register');
  }

  update(id: string, payload: NgoRegisterFormUpdateValue) {
    this.http
      .patch<NgoRegisterForm>(`${this.url}/${id}`, payload)
      .pipe(
        tap(() => {
          this.getAll();
        })
      )
      .subscribe();
  }

  getAll(params: GetAllOffersParams = {}) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    return this.http
      .get<NgoRegisterForm[]>(`${this.url}`)
      .pipe(
        tap(forms => {
          this.stateService.setState({ loadListCallState: 'LOADED', list: forms });
        })
      )
      .subscribe();
  }
}
