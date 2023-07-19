import { CanMatchFn, Router } from '@angular/router';
import { AuthStateService } from '../data_access/auth.state.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = () => {
  const status = inject(AuthStateService).$value().status;
  const router = inject(Router);

  if (status === 'NON_AUTHENTICATED') {
    router.navigateByUrl('/auth');
    return false;
  }

  return true;
};
