import { Component, Input, computed, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HasRolePipe } from '../auth/utils/has-role.pipe';
import { USER_ROLES, UserRoles } from '../core/user-roles.enum';
import { AuthService } from '../auth/data_access/auth.service';
import { AuthStateService } from '../auth/data_access/auth.state.service';
import { ShellService } from './shell.service';
import { NGOsStateService } from '../features/ngo/data-access/ngos.state.service';
import { CompaniesStateService } from '../features/companies/data-access/companies.state.service';
import { KeycloakService } from 'keycloak-angular';
import { MatTooltipModule } from '@angular/material/tooltip';

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
        <mat-toolbar class="!py-12">
          <div *ngIf="$isAuth()" class="flex flex-col relative">
            <span class="text-xs">
              <span class="font-semibold block">Zalogowano jako:</span>
              <span class="whitespace-pre-wrap">
                <ng-container *ngIf="role === USER_ROLES.ADMIN"> Miasto Kołobrzeg </ng-container>

                <ng-container *ngIf="role === USER_ROLES.NGO_USER">
                  {{ ngoState().profile?.name }}
                </ng-container>

                <ng-container *ngIf="role === USER_ROLES.COMPANY_USER">
                  <!-- TODO SET SERVICE -->
                  {{ ngoState().profile?.name }}
                </ng-container>
              </span>
            </span>
            <br />

            <ng-container *ngIf="role !== USER_ROLES.ADMIN">
              @if (ngoState().profile?.confirmed) {
                <span
                  class="text-xs absolute bottom-0 rounded-md px-2 py-1"
                  [matTooltipDisabled]="!ngoState().profile?.disabled"
                  [matTooltip]="ngoState().profile?.reason || ''"
                  [ngClass]="{
                    'bg-red-500 text-white': ngoState().profile?.disabled,
                    'bg-green-700 text-white': !ngoState().profile?.disabled
                  }">
                  {{ ngoState().profile?.disabled ? 'Zablokowany' : 'Aktywny' }}
                </span>
              } @else {
                <span
                  class="text-xs absolute bottom-0 rounded-md px-2 py-1 bg-slate-500"
                  matTooltip="Musisz najpierw uzupełnić swój profil i zostać zatwierdzony przez miasto">
                  Konto Niezatwierdzone
                </span>
              }
            </ng-container>
          </div>
        </mat-toolbar>
        <mat-nav-list>
          <a *ngFor="let menuItem of $menuItems()" mat-list-item [routerLink]="menuItem.link">
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
            <div class="flex flex-col relative">
              <div class="flex items-center">
                <mat-icon aria-label="Side nav toggle icon">waves</mat-icon>
                <span class="ml-2">Wavvy</span>
              </div>
              <span class="text-xs ml-2 text-blue-300">na fali pomocy</span>
              <p class="absolute right-0 text-sm rotate-6 px-1 rounded-sm bg-blue-900">beta</p>
            </div>

            <div class="flex justify-between items-start">
              <a *ngIf="$showMessageBox()" routerLink="/messages" class="block"
                ><mat-icon class="!w-9 !h-9 text-3xl"> local_post_office</mat-icon>
              </a>
              <button *ngIf="$isAuth()" class="ml-4" mat-button (click)="logout()">Wyloguj</button>
              <button *ngIf="!$isAuth()" class="ml-4" mat-button (click)="login()">Zaloguj</button>
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
    MatTooltipModule,
  ],
})
export default class ShellComponent {
  @Input() role?: UserRoles;

  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthService);
  private shellService = inject(ShellService);
  private keycloak = inject(KeycloakService);

  private $authState = inject(AuthStateService).$value;
  public $isAuth = computed(() => this.$authState().status === 'AUTHENTICATED');
  public $showMessageBox = computed(
    () => this.$isAuth() && (this.ngoState().profile?.confirmed || this.$authState().user?.role === USER_ROLES.ADMIN)
  );

  public ngoState = inject(NGOsStateService).$value;
  public companyState = inject(CompaniesStateService).$value;

  public $menuItems = this.shellService.$menu;

  public USER_ROLES = USER_ROLES;

  logout() {
    this.authService.logout();
  }

  login() {
    this.keycloak.login();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );
}
