import { Injectable, signal } from '@angular/core';
import { CallState } from 'src/app/core/call-state.enum';
import { Message } from '../model/message.model';
import { StateService } from 'src/app/core/state.service';

export interface MessagesStateValue {
  sendCallState: CallState;
  list: Message[];
  loadListCallState: CallState;
}

const initialState: MessagesStateValue = {
  sendCallState: 'INITIAL',
  list: [],
  loadListCallState: 'INITIAL',
};

@Injectable({
  providedIn: 'root',
})
export class MessagesStateService extends StateService<MessagesStateValue> {
  constructor() {
    super(initialState);
  }
}
