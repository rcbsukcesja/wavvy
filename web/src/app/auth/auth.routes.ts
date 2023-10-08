import { CanMatchFn, Router, Routes } from '@angular/router';
import AuthPageComponent from './auth.page.component';
import JoinPageComponent from './join.page.component';
import FirstLoginPageComponent from './first-login.page.component';
import { inject } from '@angular/core';
import { AuthStateService } from './data_access/auth.state.service';
import { nonAuthGuard } from './utils/non-auth.guard';

export const FirstLoginGuard: CanMatchFn = () => {
  const user = inject(AuthStateService).$value().user;
  const router = inject(Router);

  console.log('first login guards');

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
