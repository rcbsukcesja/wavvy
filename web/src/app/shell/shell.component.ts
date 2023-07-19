import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { HasRolePipe } from '../auth/utils/has-role.pipe';
import { UserRoles } from '../core/user-roles.enum';
import { AuthService } from '../auth/data_access/auth.service';

export interface MenuItem {
  link: string;
  displayValue: string;
  icon?: string;
  roles: UserRoles[];
}

@Component({
  selector: 'app-shell',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false">
        <mat-toolbar></mat-toolbar>
        <mat-nav-list>
          <a *ngFor="let menuItem of menuItems | hasRole" mat-list-item [routerLink]="menuItem.link">
            <div class="flex text-sm" [routerLinkActive]="'font-semibold'">
              <mat-icon *ngIf="menuItem.icon" class="mr-2">{{ menuItem.icon }}</mat-icon> {{ menuItem.displayValue }}
            </div></a
          >
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
            *ngIf="isHandset$ | async">
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
          <div class="flex justify-between items-center w-full">
            <div class="flex flex-col">
              <div class="flex items-center">
                <mat-icon aria-label="Side nav toggle icon">waves</mat-icon>
                <span class="ml-2">Wavvy</span>
              </div>
              <span class="text-xs ml-2 text-blue-300">na fali pomocy</span>
            </div>
            <div class="flex justify-between items-start">
              <a routerLink="/messages" class="block"
                ><mat-icon class="!w-9 !h-9 text-3xl"> local_post_office</mat-icon>
              </a>
              <button class="ml-4" mat-button (click)="logout()">Wyloguj</button>
            </div>
          </div>
        </mat-toolbar>
        <main class="p-4">
          <router-outlet />
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      span.ml-2 {
        letter-spacing: 5px;
      }

      .sidenav-container {
        height: 100%;
      }

      .sidenav {
        width: 200px;
      }

      .sidenav .mat-toolbar {
        background: inherit;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
      }
    `,
  ],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    CommonModule,
    RouterOutlet,
    HasRolePipe,
    RouterModule,
    MatIconModule,
  ],
})
export default class ShellComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
  menuItems: MenuItem[] = [
    { icon: '', link: '/ngos', displayValue: 'Lista NGO', roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER', 'CITIZEN'] },
    { icon: '', link: '/offers', displayValue: 'Lista ofert', roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER', 'CITIZEN'] },
    {
      icon: '',
      link: '/companies',
      displayValue: 'Lista MŚP',
      roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER', 'CITIZEN'],
    },
    {
      icon: '',
      link: '/projects',
      displayValue: 'Lista projektów',
      roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER', 'CITIZEN'],
    },

    {
      icon: '',
      link: '/manage/offers',
      displayValue: 'Zarządzaj ofertami',
      roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER'],
    },
    {
      icon: '',
      link: '/manage/projects',
      displayValue: 'Zarządzaj projektami',
      roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER', 'CITIZEN'],
    },
    {
      icon: '',
      link: '/manage/ngo-profile',
      displayValue: 'Moja organizacja',
      roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER', 'CITIZEN'],
    },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );
}
