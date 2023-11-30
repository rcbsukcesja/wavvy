import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Message, MessagePayload } from '../model/message.model';
import { MessagesStateService } from './messages.state.service';
import { tap } from 'rxjs';
import { AuthStateService } from 'src/app/auth/data_access/auth.state.service';
import { NGOsStateService } from '../../ngo/data-access/ngos.state.service';
import { CommonFilters, DEFAULT_SORT } from 'src/app/shared/ui/common-filters.component';
import { MessageDialogFormValue } from 'src/app/shared/ui/common-message-dialog.component';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { INITIAL_PAGINATION_STATE } from '../../projects/data-access/projects.state.service';
import { createListHttpParams } from 'src/app/core/list-http-params.factory';

export interface GetAllMessagesParams {}

@Injectable({
  providedIn: 'root',
})
export class MessagesApiService extends HttpBaseService {
  private stateService = inject(MessagesStateService);

  constructor() {
    super('messages');
  }

  sendToCity(messageValue: MessageDialogFormValue) {
    // todo: provide city user id
    this.send({ ...messageValue, receiverId: '321' });
  }

  send(payload: MessagePayload) {
    this.stateService.setState({ sendCallState: 'LOADING' });

    // const id = this.authStateService.$value().user?.id;

    this.http
      .post(`${this.url}`, {
        ...payload,
        // senderId: id,
        // createdAt: Date.now(),
        receiverId: payload.receiverId,
      })
      .pipe(
        tap(() => {
          this.stateService.setState({ sendCallState: 'LOADED' });
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

    // const url = new URL(this.url + '/received');
    // const sp = new URLSearchParams({
    //   _sort: 'createdAt',
    //   _order: params.sort,
    //   _start: (params.pageIndex * params.pageSize).toString(),
    //   _limit: params.pageSize.toString(),
    //   receiverId: this.ngoStateService.$value().profile?.id.toString() || '',
    //   q: params.search,
    // });

    this.http
      .get<Message[]>(this.url + '/received', { params: createListHttpParams(params, params.sort) })
      .pipe(
        tap(messages => {
          this.stateService.setState({ loadListCallState: 'LOADED', list: messages });
        })
      )
      .subscribe();
  }
}
