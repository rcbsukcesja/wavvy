import { Component, Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { AuthStateService, User } from './auth.state.service';
import { map, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/core/API-URL.token';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NGOsApiService } from 'src/app/features/ngo/data-access/ngos.api.service';
import { USER_ROLES, UserRoles } from 'src/app/core/user-roles.enum';
import { KeycloakService } from 'keycloak-angular';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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

@Component({
  template: `
    <h1 mat-dialog-title>Aktualna sesja wygasła</h1>
    <div mat-dialog-content>
      <p>Ze względów bezpieczeństwa zostałeś wylogowany!</p>
    </div>

    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Ok, rozumiem!</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class TokenExpiredDialogComponent {
  private dialogRef = inject<MatDialogRef<TokenExpiredDialogComponent>>(MatDialogRef);
  private keycloak = inject(KeycloakService);

  ngOnInit() {
    this.dialogRef.afterClosed().subscribe(() => {
      this.keycloak.logout();
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpBaseService {
  handleTokenExpiration() {
    this.dialog.open(TokenExpiredDialogComponent);
  }
  router = inject(Router);
  authStateService = inject(AuthStateService);
  apiURL = inject(API_URL);

  private dialog = inject(MatDialog);
  private kc = inject(KeycloakService);
  private snack = inject(MatSnackBar);
  private ngoService = inject(NGOsApiService);

  constructor() {
    super('users');

    this.kc.init();
  }

  handleFirstLogin(payload: FirstLoginFormValue, id: string) {
    return this.http.patch<User>(`${this.url}/${id}`, { firstLogin: false }).pipe(
      switchMap(user => {
        return user ? of(user) : throwError(() => new Error('Coś poszło nie tak'));
      }),
      tap(user => {
        this.setAuthenticatedUser(user);
        this.router.navigateByUrl('/manage/my-profile');
      })
    );
  }

  login(loginFormValue: LoginFormValue) {
    this.http
      .get<User[]>(`${this.url}?login=${loginFormValue.login}&password=${loginFormValue.password}`)
      .pipe(
        map(([user]) => user),
        switchMap(user => {
          return user ? of(user) : throwError(() => new Error('Login lub hasło jest niepoprawne'));
        }),
        tap(user => {
          this.setAuthenticatedUser(user);

          this.router.navigateByUrl('/');
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
    return of(this.kc.isLoggedIn());
  }

  logout(callback?: VoidFunction) {
    this.kc.logout().then(() => {
      this.authStateService.setState({ status: 'NON_AUTHENTICATED', user: null });
      this.router.navigateByUrl('/');

      this.snack.open('Wylogowano', '', {
        duration: 2000,
      });
    });
  }

  setAuthenticatedUser(user: User) {
    this.authStateService.setState({ status: 'AUTHENTICATED', user });

    const rolesWithOrganisationProfile: UserRoles[] = [USER_ROLES.COMPANY_USER, USER_ROLES.NGO_USER];

    if (rolesWithOrganisationProfile.includes(user.role)) {
      this.ngoService.getProfile();
    }
  }
}
