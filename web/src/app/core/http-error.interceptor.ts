import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, catchError, from, switchMap } from 'rxjs';
import { ErrorDialogComponent, ErrorDialogData } from '../shared/ui/dialogs/error-dialog.component';
import { AuthStateService } from '../auth/data_access/auth.state.service';
import { KeycloakService } from 'keycloak-angular';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const dialog = inject(MatDialog);
  const authState = inject(AuthStateService);
  const keycloak = inject(KeycloakService);

  const cloned = req.clone();

  let nextt = next(cloned);

  const { user } = authState.$value();

  if (user) {
    nextt = from(keycloak.getToken()).pipe(
      switchMap(token => {
        return next(
          req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
          })
        );
      })
    );
  }

  return nextt.pipe(
    catchError((e: HttpErrorResponse) => {
      dialog.open<ErrorDialogComponent, ErrorDialogData>(ErrorDialogComponent, {
        data: {
          error: e,
          req,
          next,
        },
      });

      return EMPTY;
    })
  );
};
