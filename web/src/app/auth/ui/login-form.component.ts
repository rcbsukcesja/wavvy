import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoginFormValue } from '../data_access/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, CommonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="emitLogin()" class="w-80">
      <mat-form-field class="w-full">
        <mat-label>Login</mat-label>
        <input formControlName="login" matInput />
      </mat-form-field>
      <br />
      <mat-form-field class="w-full">
        <mat-label>Hasło</mat-label>
        <input formControlName="password" matInput type="password" />
      </mat-form-field>
      <br />
      <div class="flex justify-center">
        <button mat-raised-button color="primary">Zaloguj</button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<LoginFormValue>();

  private builder = inject(NonNullableFormBuilder);

  form = this.builder.group({
    login: this.builder.control('ADMIN'),
    password: this.builder.control(''),
  });

  emitLogin() {
    this.login.emit(this.form.getRawValue());
  }
}
