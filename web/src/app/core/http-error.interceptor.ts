import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, catchError } from 'rxjs';
import { ErrorDialogComponent, ErrorDialogData } from '../shared/ui/dialogs/error-dialog.component';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('hey!', req.url);

  const dialog = inject(MatDialog);

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      console.log('catched!', e);

      console.log(req);

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
