import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Offer } from '../model/offer.model';
import { OffersStateService } from './offers.state.service';
import { tap } from 'rxjs';
import { ID } from 'src/app/core/types/id.type';
import { User } from 'src/app/auth/data_access/auth.state.service';
import { API_URL } from 'src/app/core/API-URL.token';
import { CommonFilters, DEFAULT_SORT } from 'src/app/shared/ui/common-filters.component';

export interface GetAllOffersParams {}

export interface AddOfferFormValue {
  name: string;
  description: string;
  budget: number;
  fundingLevel: number;
  targetAudience: string;
  startDate: string;
  endDate: string;
  link: string;
  categories: { id: ID; name: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class OffersApiService extends HttpBaseService {
  private stateService = inject(OffersStateService);

  constructor() {
    super('offers');
  }

  toggleFav(user: User, offerId: number) {
    const alreadyFollowed = user.offersFollowed.includes(offerId);

    this.http.patch(`${this.API_URL}/users/${user.id}`, {
      offersFollowed: alreadyFollowed
        ? user.offersFollowed.filter(id => id !== offerId)
        : [...user.offersFollowed, offerId],
    });
  }

  add(payload: AddOfferFormValue) {
    this.http
      .post<Offer>(`${this.url}`, payload)
      .pipe(
        tap(() => {
          this.getAll();
        })
      )
      .subscribe();
  }

  update(id: ID, payload: AddOfferFormValue) {
    this.http
      .patch<Offer>(`${this.url}/${id}`, payload)
      .pipe(
        tap(() => {
          this.getAll();
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

  getAll(params: CommonFilters = { sort: DEFAULT_SORT }) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    const url = new URL(this.url);
    const sp = new URLSearchParams({ _sort: 'startDate', _order: params.sort });

    url.search = sp.toString();

    return this.http
      .get<Offer[]>(url.href)
      .pipe(
        tap(offers => {
          this.stateService.setState({ loadListCallState: 'LOADED', list: offers });
        })
      )
      .subscribe();
  }
}
