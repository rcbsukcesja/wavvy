import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Offer } from '../model/offer.model';
import { OffersStateService } from './offers.state.service';
import { map, tap } from 'rxjs';
import { ID } from 'src/app/core/types/id.type';
import { AuthStateService, User } from 'src/app/auth/data_access/auth.state.service';
import { CommonFilters, DEFAULT_SORT } from 'src/app/shared/ui/common-filters.component';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { ListApiResponse } from 'src/app/core/types/list-response.type';
import { NGOsStateService } from '../../ngo/data-access/ngos.state.service';

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
  private ngoState = inject(NGOsStateService);

  constructor() {
    super('offers');
  }

  toggleFav(user: User, offerId: number) {
    const ngo = this.ngoState.$value().profile;

    if (!ngo) {
      return;
    }

    const alreadyFollowed = ngo.followedByUser.includes(offerId);
    const payload = alreadyFollowed
      ? ngo.followedByUser.filter(id => id !== offerId)
      : [...ngo.followedByUser, offerId];

    this.http
      .patch<User>(`${this.API_URL}/${offerId}/follow`, payload)
      .pipe(
        tap(user => {
          this.ngoState.setState({
            ...this.ngoState.$value(),
            profile: {
              ...ngo,
              followedByUser: payload,
            },
          });
        })
      )
      .subscribe();
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

  getAll(params: CommonFilters & PaginationFilters = { sort: DEFAULT_SORT, search: '', pageIndex: 0, pageSize: 5 }) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    const url = new URL(this.url);
    const sp = new URLSearchParams({
      sort: `startDate,${params.sort}`,
      // TODO parametr do wyszukiwania
      q: params.search,
      page: params.pageIndex.toString(),
      size: params.pageSize.toString(),
    });

    url.search = sp.toString();

    return this.http
      .get<ListApiResponse<Offer>>(url.href)
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
