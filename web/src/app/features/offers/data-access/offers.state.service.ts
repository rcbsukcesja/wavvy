import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
// import { Offer } from '../model/Offer.model';
import { CallState } from 'src/app/core/call-state.enum';
import { Offer } from '../model/offer.model';
import { StateService } from 'src/app/core/state.service';

export interface OffersStateValue {
  list: Offer[];
  loadListCallState: CallState;
}

const initialState: OffersStateValue = {
  list: [],
  loadListCallState: 'INITIAL',
};

@Injectable({
  providedIn: 'root',
})
export class OffersStateService extends StateService<OffersStateValue> {
  constructor() {
    super(initialState);
  }
}
