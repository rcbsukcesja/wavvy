import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideRouterStore } from '@ngrx/router-store';
import { MatNativeDateModule } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { LOCALE_ID } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth/data_access/auth.service';
import { tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpErrorInterceptor } from './core/http-error.interceptor';
import { MatDialogModule } from '@angular/material/dialog';

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

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    {
      provide: APP_INITIALIZER,
      useFactory: checkTokenFactory,
      deps: [AuthService],
      multi: true,
    },
    importProvidersFrom(MatNativeDateModule),
    importProvidersFrom(MatDialogModule),
    provideHttpClient(withInterceptors([HttpErrorInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideStore(),
    provideRouterStore(),
    importProvidersFrom(MatSnackBarModule),
  ],
};
