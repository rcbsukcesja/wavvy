import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService, LoginFormValue } from './data_access/auth.service';
import { LoginFormComponent } from './ui/login-form.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [LoginFormComponent, MatIconModule],
  template: `
    <div class="flex flex-col items-center justify-center w-screen h-screen">
      <div class="flex flex-col mb-4">
        <div class="flex items-center text-4xl">
          <mat-icon aria-label="Side nav toggle icon">waves</mat-icon>
          <span class="ml-2 tracking-widest">Wavvy</span>
        </div>
        <span class="text-xl ml-2 text-blue-300">na fali pomocy</span>
      </div>
      <app-login-form (login)="login($event)" />
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthPageComponent {
  authService = inject(AuthService);

  login(loginFormValue: LoginFormValue) {
    this.authService.login(loginFormValue);
  }
}
