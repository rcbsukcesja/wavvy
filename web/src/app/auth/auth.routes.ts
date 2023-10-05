import { Routes } from '@angular/router';
import AuthPageComponent from './auth.page.component';
import JoinPageComponent from './join.page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthPageComponent,
  },
  {
    path: 'join',
    component: JoinPageComponent,
  },
];

export default routes;
