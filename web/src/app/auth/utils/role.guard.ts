import { CanMatchFn, Route, Router } from '@angular/router';
import { AuthStateService } from '../data_access/auth.state.service';
import { inject } from '@angular/core';
import { UserRoles } from 'src/app/core/user-roles.enum';

export const roleGuard: CanMatchFn = (route: Route) => {
  const user = inject(AuthStateService).$value().user;
  const router = inject(Router);

  if (!user) {
    router.navigateByUrl('/auth');
    return false;
  }

  const forRoles: UserRoles[] = route.data?.['roles'] || [];

  if (forRoles.includes(user.role)) {
    return true;
  }

  router.navigateByUrl('/auth');
  return false;
};
