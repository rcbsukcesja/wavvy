import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthStatus } from '../utils/auth-status.enum';
import { UserRoles } from 'src/app/core/user-roles.enum';

export interface User {
  id: number;
  role: UserRoles;
}

export interface AuthStateValue {
  status: AuthStatus;
  user: User | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private $state = signal<AuthStateValue>({
    status: 'NON_AUTHENTICATED',
    user: null,
  });

  get $value() {
    return this.$state.asReadonly();
  }

  get value$() {
    return toObservable(this.$state);
  }

  setState(value: Partial<AuthStateValue>) {
    this.$state.update(state => ({ ...state, ...value }));
  }
}
