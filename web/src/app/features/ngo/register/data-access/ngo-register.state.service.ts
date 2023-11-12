import { Injectable } from '@angular/core';
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
