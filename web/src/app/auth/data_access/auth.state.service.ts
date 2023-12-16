import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ID } from 'src/app/core/types/id.type';
import { UserRoles } from 'src/app/core/user-roles.enum';

export interface User {
  id: string;
  role: UserRoles;
  login: string;
  offersFollowed: number[];
}

export type AuthStateValue =
  | {
      status: 'AUTHENTICATED';
      user: User;
    }
  | {
      status: 'NON_AUTHENTICATED';
      user: null;
    };

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private $state = signal<AuthStateValue>({
    status: 'NON_AUTHENTICATED',
    user: null,
  });

  $value = this.$state.asReadonly();

  value$ = toObservable(this.$state);

  setState(value: AuthStateValue) {
    this.$state.update(state => ({ ...state, ...value }));
  }
}
