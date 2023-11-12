import { Pipe, PipeTransform, inject } from '@angular/core';
import { AuthStateService } from '../data_access/auth.state.service';
import { WithUserRoles } from 'src/app/core/user-roles.enum';

@Pipe({
  name: 'hasRole',
  standalone: true,
})
export class HasRolePipe implements PipeTransform {
  role = inject(AuthStateService).$value().user?.role;

  transform<T extends WithUserRoles>(menuItems: T[]): T[] {
    return menuItems.filter(menuItem => menuItem.roles.length === 0 || menuItem.roles.includes(this.role!));
  }
}
