import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from '../data_access/auth.state.service';

export const nonAuthGuard: CanMatchFn = () => {
  const status = inject(AuthStateService).$value().status;
  const router = inject(Router);

  if (status === 'AUTHENTICATED') {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
