import { CanMatchFn, Route, Router } from '@angular/router';
import { AuthStateService } from '../data_access/auth.state.service';
import { inject } from '@angular/core';
import { UserRoles } from 'src/app/core/user-roles.enum';
import { KeycloakService } from 'keycloak-angular';

export const roleGuard: CanMatchFn = (route: Route) => {
  const user = inject(AuthStateService).$value().user;
  const keycloak = inject(KeycloakService);

  if (!user) {
    keycloak.login();
    return false;
  }

  const forRoles: UserRoles[] = route.data?.['roles'] || [];

  if (forRoles.includes(user.role)) {
    return true;
  }

  keycloak.login();
  return false;
};
