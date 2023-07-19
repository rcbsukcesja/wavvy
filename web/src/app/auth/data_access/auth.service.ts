import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { AuthStateService, User } from './auth.state.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginFormValue {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpBaseService {
  router = inject(Router);
  authStateService = inject(AuthStateService);

  constructor() {
    super('users');
  }

  login(loginFormValue: LoginFormValue) {
    this.http.get<User[]>(`${this.url}?role=${loginFormValue.login}`).pipe(tap(this.setAuthenticatedUser)).subscribe();
  }

  logout() {
    this.authStateService.setState({ status: 'NON_AUTHENTICATED', user: null });
    this.router.navigateByUrl('/');
  }

  private setAuthenticatedUser = (users: User[]) => {
    const [user] = users;
    if (!user) return;

    this.authStateService.setState({ status: 'AUTHENTICATED', user });
    this.router.navigateByUrl('/');
  };
}
