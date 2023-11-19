import { Injectable, inject } from '@angular/core';
import { NGO } from '../model/ngo.model';
import { CallState } from 'src/app/core/call-state.enum';
import { StateService } from 'src/app/core/state.service';
import { AuthStateService } from 'src/app/auth/data_access/auth.state.service';
import { filter, skip } from 'rxjs';

export interface NGOsStateValue {
  list: NGO[];
  profile: NGO | null;
  details: NGO | null;
  loadListCallState: CallState;
  loadByIdCallState: CallState;
  loadProfileCallState: CallState;
  updateProfileCallState: CallState;
  totalElements: number;
}

const initialState: NGOsStateValue = {
  list: [],
  details: null,
  profile: null,
  loadByIdCallState: 'INITIAL',
  loadListCallState: 'INITIAL',
  loadProfileCallState: 'INITIAL',
  updateProfileCallState: 'INITIAL',
  totalElements: 0,
};

@Injectable({
  providedIn: 'root',
})
export class NGOsStateService extends StateService<NGOsStateValue> {
  private $authState = inject(AuthStateService);
  constructor() {
    super(initialState);

    this.$authState.value$
      .pipe(
        skip(1),
        filter(s => s.status === 'NON_AUTHENTICATED')
      )
      .subscribe(s => {
        this.setState({
          ...this.$value(),
          details: null,
          profile: null,
        });
      });
  }
}
