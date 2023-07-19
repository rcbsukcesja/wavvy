import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { authGuard } from './auth/utils/auth.guard';
import { nonAuthGuard } from './auth/utils/non-auth.guard';
import { inject } from '@angular/core';
import { ProjectsApiService } from './features/projects/data-access/projects.api.service';
import { BusinessAreaApiService } from './shared/bussiness-area.api.service';
import { tap } from 'rxjs';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadComponent: () => import('./auth/auth.page.component'),
        canMatch: [nonAuthGuard],
      },
      {
        path: '',
        loadComponent: () => import('./shell/shell.component'),

        canMatch: [authGuard],
        children: [
          {
            path: 'ngos',
            loadComponent: () => import('./features/ngo/ngo-list.page.component'),
          },
          {
            path: 'ngos/:id',
            loadComponent: () => import('./features/ngo/ngo-details.page.component'),
          },
          {
            path: 'manage/offers',
            loadComponent: () => import('./features/offers/manage-offers.page.component'),
          },
          {
            path: 'manage/projects',
            loadComponent: () => import('./features/projects/manage-projects.page.component'),
          },
          {
            path: 'manage/projects/form',
            loadComponent: () => import('./features/projects/project-form.page.component'),
            resolve: {
              bussinessAreas: () => {
                return inject(BusinessAreaApiService).getAll().pipe(tap(console.log));
              },
            },
          },
          {
            path: 'manage/projects/form/:id',
            loadComponent: () => import('./features/projects/project-form.page.component'),
            resolve: {
              project: (route: ActivatedRouteSnapshot) => {
                const service = inject(ProjectsApiService);

                return service.getById(route.params['id']);
              },
              bussinessAreas: () => {
                return inject(BusinessAreaApiService).getAll().pipe(tap(console.log));
              },
            },
          },
          {
            path: 'manage/ngo-profile',
            loadComponent: () => import('./features/ngo/ngo-profile.page.component'),
            resolve: {
              bussinessAreas: () => {
                return inject(BusinessAreaApiService).getAll().pipe(tap(console.log));
              },
            },
          },
          {
            path: 'offers',
            loadComponent: () => import('./features/offers/offers-list.page.component'),
          },
          {
            path: 'messages',
            loadComponent: () => import('./features/messages/messages-list.page.component'),
          },
          {
            path: 'companies',
            loadComponent: () => import('./features/companies/companies-list.page.component'),
          },
          {
            path: 'projects',
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
