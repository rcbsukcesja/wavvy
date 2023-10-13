import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { AuthStateService, User } from './auth.state.service';
import { Observable, map, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/core/API-URL.token';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NGOsApiService } from 'src/app/features/ngo/data-access/ngos.api.service';
import { ID } from 'src/app/core/types/id.type';

export type RegisterFormValue = {
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  KRS?: string;
  NIP: string;
};

export interface LoginFormValue {
  login: string;
  password: string;
}

export interface FirstLoginFormValue {
  old: string;
  new: string;
  repeatNew: string;
}

type Token = string;

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpBaseService {
  router = inject(Router);
  authStateService = inject(AuthStateService);
  apiURL = inject(API_URL);

  private snack = inject(MatSnackBar);

  private ngoService = inject(NGOsApiService);

  constructor() {
    super('users');
  }

  handleFirstLogin(payload: FirstLoginFormValue, id: ID) {
    return this.http.patch<User>(`${this.url}/${id}`, { firstLogin: false }).pipe(
      switchMap(user => {
        return user ? of(user) : throwError(() => new Error('Coś poszło nie tak'));
      }),
      tap(user => {
        this.setAuthenticatedUser(user);
        this.router.navigateByUrl('/manage/ngo-profile');
      })
    );
  }

  login(loginFormValue: LoginFormValue) {
    this.http
      .get<User[]>(`${this.url}?login=${loginFormValue.login}&password=${loginFormValue.password}`)
      .pipe(
        map(([user]) => user),
        switchMap(user => {
          console.log(user);
          return user ? of(user) : throwError(() => new Error('Login lub hasło jest niepoprawne'));
        }),
        tap(user => {
          this.setAuthenticatedUser(user);
          console.log(user, user.firstLogin ? '/auth/first-login' : '/');

          this.router.navigateByUrl(user.firstLogin ? 'auth/first-login' : '/');
        })
      )
      .subscribe({
        error: err => {
          this.snack.open(err.message, '', {
            duration: 2000,
          });
        },
      });
  }

  checkToken(token: Token) {
    return this.http.get<User[]>(`${this.url}?id=${token}`).pipe(map(([user]) => user));
  }

  logout(callback?: VoidFunction) {
    this.authStateService.setState({ status: 'NON_AUTHENTICATED', user: null });
    this.router.navigateByUrl('/');
    localStorage.removeItem('token');

    this.snack.open('wylogowano', '', {
      duration: 2000,
    });
  }

  setAuthenticatedUser(user: User) {
    localStorage.setItem('token', user.id + '');
    this.authStateService.setState({ status: 'AUTHENTICATED', user });
  }

  register(payload: RegisterFormValue): Observable<void> {
    return this.http.post<void>(`${this.apiURL}/register`, payload);
  }
}
