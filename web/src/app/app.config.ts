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
import { tap } from 'rxjs';
import { HttpErrorInterceptor } from './core/http-error.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environment';

registerLocaleData(localePl);

function checkTokenFactory(authService: AuthService) {
  return () => {
    const userToken = localStorage.getItem('token');

    if (!userToken) {
      return;
    }

    return authService.checkToken(userToken).pipe(
      tap(user => {
        if (!user) {
          return;
        }

        authService.setAuthenticatedUser(user);
      })
    );
  };
}

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak
      .init({
        config: {
          url: `${environment.KEYCLOAK_URL}`,
          realm: environment.KEYCLOAK_REALM,
          clientId: environment.KEYCLOAK_CLIENT_ID,
        },
      })
      .catch(e => {
        console.log('%cKeycloak nie działa 💥', 'font-size: 60px');
      });
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: checkTokenFactory,
      deps: [AuthService],
      multi: true,
    },
    importProvidersFrom(KeycloakAngularModule),
    importProvidersFrom(MatNativeDateModule),
    importProvidersFrom(MatDialogModule),
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
