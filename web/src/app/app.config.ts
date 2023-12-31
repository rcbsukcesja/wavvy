import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { LOCALE_ID } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth/data_access/auth.service';
import { takeWhile, tap } from 'rxjs';
import { HttpErrorInterceptor } from './core/http-error.interceptor';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { KeycloakAngularModule, KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environment';
import { USER_ROLES, UserRoles } from './core/user-roles.enum';
import { NGOsApiService } from './features/ngo/data-access/ngos.api.service';

registerLocaleData(localePl);

function checkTokenFactory(authService: AuthService, keycloak: KeycloakService) {
  return () => {
    const userToken = localStorage.getItem('token');

    if (!userToken) {
      return;
    }

    return authService.checkToken(userToken).pipe(
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          return;
        }

        keycloak.loadUserProfile().then(user => {
          const keycloakRoles = keycloak.getUserRoles();

          authService.setAuthenticatedUser({
            id: user.id!,
            login: user.username!,
            offersFollowed: [],
            role: keycloakRoles[0] as UserRoles,
          });
        });
      })
    );
  };
}

function initializeKeycloak(keycloak: KeycloakService, auth: AuthService, ngoService: NGOsApiService) {
  keycloak.keycloakEvents$.pipe(takeWhile(({ type }) => type !== KeycloakEventType.OnTokenExpired)).subscribe({
    complete: () => {
      auth.handleTokenExpiration();
    },
  });

  return () =>
    keycloak
      .init({
        config: {
          url: `${environment.KEYCLOAK_URL}`,
          realm: environment.KEYCLOAK_REALM,
          clientId: environment.KEYCLOAK_CLIENT_ID,
        },
        initOptions: {
          onLoad: 'check-sso', // allowed values 'login-required', 'check-sso';
          flow: 'standard', // allowed values 'standard', 'implicit', 'hybrid';
        },
      })
      .then(isAuth => {
        if (!isAuth) {
          return;
        }

        // keycloak.keycloakEvents$.pipe(takeWhile).subscribe(x => x.type === KeycloakEventType.OnTokenExpired)

        return keycloak.loadUserProfile();
      })
      .then(user => {
        if (!user) {
          return;
        }
        const keycloakRoles = keycloak.getUserRoles();

        auth.setAuthenticatedUser({
          id: user.id!,
          login: user.username!,
          offersFollowed: [],
          role: keycloakRoles[0] as UserRoles,
        });

        if (keycloakRoles[0] !== USER_ROLES.ADMIN) {
          return ngoService.getProfileOnInit(keycloakRoles[0] as UserRoles).toPromise();
        }
        return;
      })
      .catch(e => {
        console.log('%cKeycloak nie działa 💥' + JSON.stringify(e), 'font-size: 60px');
      });
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(MatDialogModule),
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, AuthService, NGOsApiService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: checkTokenFactory,
      deps: [AuthService, KeycloakService],
      multi: true,
    },
    importProvidersFrom(KeycloakAngularModule),
    importProvidersFrom(MatNativeDateModule),
    provideHttpClient(withInterceptors([HttpErrorInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule),
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD-MM-YYYY', // Parsing format set to "DD-MM-YYYY"
        },
        display: {
          dateInput: 'DD-MM-YYYY', // Display format for input fields
          monthYearLabel: 'MMM YYYY', // Format for displaying month and year
          dateA11yLabel: 'DD-MM-YYYY', // Accessibility label format for dates
          monthYearA11yLabel: 'MMMM YYYY', // Accessibility label format for month and year
        },
      },
    },
  ],
};
