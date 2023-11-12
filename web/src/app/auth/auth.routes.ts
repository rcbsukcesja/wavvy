import { CanMatchFn, Router, Routes } from '@angular/router';
import AuthPageComponent from './auth.page.component';
import JoinPageComponent from './join.page.component';
import FirstLoginPageComponent from './first-login.page.component';
import { inject } from '@angular/core';
import { AuthStateService } from './data_access/auth.state.service';
import { nonAuthGuard } from './utils/non-auth.guard';
import { USER_ROLES } from '../core/user-roles.enum';

export const FirstLoginGuard: CanMatchFn = () => {
  const user = inject(AuthStateService).$value().user;
  const router = inject(Router);

  if (user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MANAGER) {
    return true;
  }

  if (!user || !user.firstLogin) {
    router.navigateByUrl('/');

    return false;
  }

  return true;
};

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthPageComponent,
    canMatch: [nonAuthGuard],
  },
  {
    path: 'join',
    component: JoinPageComponent,
    canMatch: [nonAuthGuard],
  },
  {
    path: 'first-login',
    component: FirstLoginPageComponent,
    canMatch: [FirstLoginGuard],
  },
];

export default routes;
