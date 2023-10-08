import { Injectable, Signal, computed, inject } from '@angular/core';
import { MenuItem } from './shell.component';
import { AuthStateService } from '../auth/data_access/auth.state.service';

@Injectable({ providedIn: 'root' })
export class ShellService {
  private $authState = inject(AuthStateService).$value;

  private ngoProfileMenuItem: MenuItem = {
    icon: '',
    link: '/manage/ngo-profile',
    displayValue: 'Moja organizacja',
    roles: ['NGO_USER', 'COMPANY_USER'],
  };

  $menu: Signal<MenuItem[]> = computed(() => {
    const authState = this.$authState();

    if (authState.user && !authState.user.profileCompleted) {
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
      roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER'],
    },
    {
      icon: '',
      link: '/companies',
      displayValue: 'Lista MŚP',
      roles: ['NGO_USER', 'COMPANY_USER'],
    },

    {
      icon: '',
      link: '/manage/register',
      displayValue: 'Rejestracja',
      roles: ['ADMIN'],
    },
    {
      icon: '',
      link: '/manage/offers',
      displayValue: 'Zarządzaj ofertami',
      roles: ['ADMIN'],
    },

    {
      icon: '',
      link: '/manage/projects',
      displayValue: 'Zarządzaj projektami',
      roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER'],
    },
    this.ngoProfileMenuItem,
  ];
}
