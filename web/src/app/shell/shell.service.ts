import { Injectable, Signal, computed, inject } from '@angular/core';
import { MenuItem } from './shell.component';
import { AuthStateService } from '../auth/data_access/auth.state.service';
import { USER_ROLES, UserRoles } from '../core/user-roles.enum';

@Injectable({ providedIn: 'root' })
export class ShellService {
  private $authState = inject(AuthStateService).$value;

  private ngoProfileMenuItem: MenuItem = {
    icon: '',
    link: '/manage/ngo-profile',
    displayValue: 'Moja organizacja',
    roles: [USER_ROLES.NGO_USER, USER_ROLES.COMPANY_USER],
  };

  $menu: Signal<MenuItem[]> = computed(() => {
    const authState = this.$authState();

    if (
      authState.user &&
      ([USER_ROLES.COMPANY_USER, USER_ROLES.NGO_USER] as UserRoles[]).includes(authState.user.role) &&
      !authState.user.profileCompleted
    ) {
      return [this.ngoProfileMenuItem];
    }

    if (authState.status === 'AUTHENTICATED') {
      return [...this.publicMenu, ...this.authMenu.filter(item => item.roles.includes(authState.user.role))];
    } else {
      return [...this.publicMenu];
    }
  });

  private publicMenu: MenuItem[] = [
    { icon: '', link: '/ngos', displayValue: 'Lista NGO', roles: [] },
    {
      icon: '',
      link: '/projects',
      displayValue: 'Lista projektów',
      roles: [],
    },
  ];

  private authMenu: MenuItem[] = [
    {
      icon: '',
      link: '/offers',
      displayValue: 'Lista ofert',
      roles: [USER_ROLES.NGO_USER, USER_ROLES.ADMIN, USER_ROLES.COMPANY_USER],
    },
    {
      icon: '',
      link: '/companies',
      displayValue: 'Lista MŚP',
      roles: [USER_ROLES.NGO_USER, USER_ROLES.COMPANY_USER],
    },

    {
      icon: '',
      link: '/manage/register',
      displayValue: 'Rejestracja',
      roles: [USER_ROLES.ADMIN],
    },
    {
      icon: '',
      link: '/manage/offers',
      displayValue: 'Zarządzaj ofertami',
      roles: [USER_ROLES.ADMIN],
    },

    {
      icon: '',
      link: '/manage/projects',
      displayValue: 'Zarządzaj projektami',
      roles: [USER_ROLES.NGO_USER, USER_ROLES.ADMIN, USER_ROLES.COMPANY_USER],
    },
    this.ngoProfileMenuItem,
  ];
}
