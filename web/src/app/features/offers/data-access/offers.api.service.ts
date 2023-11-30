import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Offer } from '../model/offer.model';
import { OffersStateService } from './offers.state.service';
import { map, tap } from 'rxjs';
import { ID } from 'src/app/core/types/id.type';
import { User } from 'src/app/auth/data_access/auth.state.service';
import { CommonFilters, DEFAULT_SORT } from 'src/app/shared/ui/common-filters.component';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { ListApiResponse } from 'src/app/core/types/list-response.type';
import { NGOsStateService } from '../../ngo/data-access/ngos.state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INITIAL_PAGINATION_STATE } from '../../projects/data-access/projects.state.service';
import { createListHttpParams } from 'src/app/core/list-http-params.factory';

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
}

@Injectable({
  providedIn: 'root',
})
export class OffersApiService extends HttpBaseService {
  private stateService = inject(OffersStateService);
  private ngoState = inject(NGOsStateService);
  private snackBar = inject(MatSnackBar);

  constructor() {
    super('offers');
  }

  toggleFav(offerId: string, following: boolean) {
    const ngo = this.ngoState.$value().profile;

    console.log(ngo);

    if (!ngo) {
      return;
    }

    this.http
      .patch<User>(`${this.url}/${offerId}/follow`, {})
      .pipe(
        tap(user => {
          this.snackBar.open(following ? 'Przestałeś obserwować ofertę' : 'Obserwujesz ofertę!', '', {
            duration: 2000,
          });

          const offersState = this.stateService.$value();

          this.stateService.setState({
            ...offersState,
            list: offersState.list.map(offer => {
              if (offer.id === offerId) {
                return {
                  ...offer,
                  followedByUser: !following,
                };
              }

              return offer;
            }),
          });
          // this.ngoState.setState({
          //   ...this.ngoState.$value(),
          //   profile: {
          //     ...ngo,
          //     // followedByUser: payload,
          //   },
          // });
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

  getAll(
    params: CommonFilters & PaginationFilters = {
      sort: DEFAULT_SORT,
      search: '',
      pageIndex: 0,
      pageSize: INITIAL_PAGINATION_STATE.size,
    }
  ) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    return this.http
      .get<ListApiResponse<Offer>>(this.url, { params: createListHttpParams(params, params.sort, 'startDate') })
      .pipe(
        tap(response => {
          console.log(response.content);
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
