import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { AuthStateService, User } from './auth.state.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/core/API-URL.token';

export type RegisterFormValue = {
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
};

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
  apiURL = inject(API_URL);

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

  register(payload: RegisterFormValue): Observable<void> {
    return this.http.post<void>(`${this.apiURL}/register`, payload);
  }
}
