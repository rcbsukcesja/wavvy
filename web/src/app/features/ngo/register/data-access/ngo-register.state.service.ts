import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
// import { Offer } from '../model/Offer.model';
import { CallState } from 'src/app/core/call-state.enum';
import { StateService } from 'src/app/core/state.service';
import { NgoRegisterForm } from '../model/ngo-register-form.model';

export interface NgoRegisterFormStateValue {
  list: NgoRegisterForm[];
  loadListCallState: CallState;
}

const initialState: NgoRegisterFormStateValue = {
  list: [],
  loadListCallState: 'INITIAL',
};

@Injectable({
  providedIn: 'root',
})
export class NgoRegisterFormStateService extends StateService<NgoRegisterFormStateValue> {
  constructor() {
    super(initialState);
  }
}
