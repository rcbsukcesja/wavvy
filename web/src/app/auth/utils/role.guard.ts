import { CanMatchFn, Route, Router } from '@angular/router';
import { AuthStateService } from '../data_access/auth.state.service';
import { inject } from '@angular/core';
import { UserRoles } from 'src/app/core/user-roles.enum';
import { KeycloakService } from 'keycloak-angular';

export const roleGuard: CanMatchFn = (route: Route) => {
  const router = inject(Router);
  const user = inject(AuthStateService).$value().user;

  if (!user) {
    router.navigateByUrl('/');

    return false;
  }

  const forRoles: UserRoles[] = route.data?.['roles'] || [];

  if (forRoles.includes(user.role)) {
    return true;
  }

  router.navigateByUrl('/');

  return false;
};
