import { ActivatedRouteSnapshot, CanMatchFn, Router, Routes } from '@angular/router';
import { authGuard } from './auth/utils/auth.guard';
import { inject } from '@angular/core';
import { ProjectsApiService } from './features/projects/data-access/projects.api.service';
import { BusinessAreaApiService } from './shared/bussiness-area.api.service';
import { tap } from 'rxjs';
import { AuthStateService } from './auth/data_access/auth.state.service';
import { roleGuard } from './auth/utils/role.guard';
import { USER_ROLES } from './core/user-roles.enum';

export const NgoProfileCompletedGuard: CanMatchFn = () => {
  const user = inject(AuthStateService).$value().user;
  const router = inject(Router);

  console.log('NgoProfileCompletedGuard');

  if (user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MANAGER) {
    return true;
  }

  if (user && !user.profileCompleted) {
    router.navigateByUrl('/manage/ngo-profile');

    return false;
  }

  return true;
};

export const NonFirstLoginGuard: CanMatchFn = () => {
  const user = inject(AuthStateService).$value().user;
  const router = inject(Router);

  console.log('non first login guard', user);

  if (user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MANAGER) {
    return true;
  }

  if (user?.firstLogin) {
    router.navigateByUrl('/auth/first-login');

    return false;
  }

  return true;
};

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
      },
      {
        path: '',
        canMatch: [NonFirstLoginGuard],
        loadComponent: () => import('./shell/shell.component'),
        children: [
          {
            path: 'ngos',
            canMatch: [NgoProfileCompletedGuard],
            loadComponent: () => import('./features/ngo/ngo-list.page.component'),
          },
          {
            path: 'ngos/:id',
            canMatch: [NgoProfileCompletedGuard],
            loadComponent: () => import('./features/ngo/ngo-details.page.component'),
            resolve: {
              bussinessAreas: () => {
                return inject(BusinessAreaApiService).getAll();
              },
            },
          },
          {
            path: 'manage/offers',
            loadComponent: () => import('./features/offers/manage-offers.page.component'),
            canMatch: [authGuard, NgoProfileCompletedGuard],
          },
          {
            path: 'manage/projects',
            loadComponent: () => import('./features/projects/manage-projects.page.component'),
            canMatch: [authGuard, NgoProfileCompletedGuard],
          },

          {
            path: 'manage/register',
            canMatch: [NgoProfileCompletedGuard],
            loadComponent: () => import('./features/ngo/register/ngo-register.page.component'),
          },
          {
            path: 'manage/projects/form',
            loadComponent: () => import('./features/projects/project-form.page.component'),
            canMatch: [authGuard, NgoProfileCompletedGuard],
            resolve: {
              bussinessAreas: () => {
                return inject(BusinessAreaApiService).getAll();
              },
            },
          },
          {
            path: 'manage/projects/form/:id',
            loadComponent: () => import('./features/projects/project-form.page.component'),
            canMatch: [authGuard, NgoProfileCompletedGuard],
            resolve: {
              project: (route: ActivatedRouteSnapshot) => {
                const service = inject(ProjectsApiService);

                return service.getById(route.params['id']);
              },
              bussinessAreas: () => {
                return inject(BusinessAreaApiService).getAll();
              },
            },
          },
          {
            path: 'manage/ngo-profile',
            loadComponent: () => import('./features/ngo/ngo-profile.page.component'),
            canMatch: [authGuard, roleGuard],
            data: {
              roles: [USER_ROLES.NGO_USER],
            },
            resolve: {
              bussinessAreas: () => {
                return inject(BusinessAreaApiService).getAll().pipe(tap(console.log));
              },
            },
          },
          {
            path: 'offers',
            canMatch: [authGuard, NgoProfileCompletedGuard],
            loadComponent: () => import('./features/offers/offers-list.page.component'),
          },
          {
            path: 'messages',
            canMatch: [authGuard, NgoProfileCompletedGuard],
            loadComponent: () => import('./features/messages/messages-list.page.component'),
          },
          {
            path: 'companies',
            canMatch: [authGuard, NgoProfileCompletedGuard],
            loadComponent: () => import('./features/companies/companies-list.page.component'),
          },
          {
            path: 'projects',
            canMatch: [NgoProfileCompletedGuard],
            loadComponent: () => import('./features/projects/projects-list.page.component'),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'ngos',
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
