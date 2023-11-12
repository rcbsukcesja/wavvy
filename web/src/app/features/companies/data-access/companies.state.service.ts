import { Injectable, signal } from '@angular/core';
import { CallState } from 'src/app/core/call-state.enum';
import { Company } from '../model/company.model';
import { StateService } from 'src/app/core/state.service';

export interface CompaniesStateValue {
  list: Company[];
  loadListCallState: CallState;
  totalElements: number;
}

const initialState: CompaniesStateValue = {
  list: [],
  loadListCallState: 'INITIAL',
  totalElements: 0,
};

@Injectable({
  providedIn: 'root',
})
export class CompaniesStateService extends StateService<CompaniesStateValue> {
  constructor() {
    super(initialState);
  }
}
