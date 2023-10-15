import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Message, MessagePayload } from '../model/message.model';
import { MessagesStateService } from './messages.state.service';
import { tap } from 'rxjs';
import { AuthStateService } from 'src/app/auth/data_access/auth.state.service';
import { NGOsStateService } from '../../ngo/data-access/ngos.state.service';

export interface GetAllMessagesParams {}

@Injectable({
  providedIn: 'root',
})
export class MessagesApiService extends HttpBaseService {
  private stateService = inject(MessagesStateService);
  private authStateService = inject(AuthStateService);
  private ngoStateService = inject(NGOsStateService);

  constructor() {
    super('messages');
  }

  send(payload: MessagePayload) {
    this.stateService.setState({ sendCallState: 'LOADING' });

    const id = this.authStateService.$value().user?.id;

    console.log(payload);

    this.http
      .post(`${this.url}`, {
        ...payload,
        senderId: id,
        createdAt: Date.now(),
        receiverId: payload.receiverId,
      })
      .pipe(
        tap(() => {
          this.stateService.setState({ sendCallState: 'LOADED' });
        })
      )
      .subscribe();
  }

  getAll() {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    const id = this.ngoStateService.$value().profile?.id;

    this.http
      .get<Message[]>(`${this.url}/?receiverId=${id}`)
      .pipe(
        tap(messages => {
          this.stateService.setState({ loadListCallState: 'LOADED', list: messages });
        })
      )
      .subscribe();
  }
}
