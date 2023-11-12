import { Component, inject } from '@angular/core';
import { AuthService } from './data_access/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, delay, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthStateService } from './data_access/auth.state.service';

@Component({
  selector: 'app-first-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="flex flex-col items-center w-screen h-screen px-4">
      <header class="text-center mb-4 mt-16">
        <p class="text-2xl font-semibold">Witaj w Wavvy!</p>
        <span>Na początek zmień swoje tymczasowe hasło...</span>
      </header>

      <form [formGroup]="form" (ngSubmit)="updatePassword()" class="flex flex-col gap-2 w-full max-w-lg">
        <mat-form-field>
          <mat-label>Stare hasło</mat-label>
          <input formControlName="old" matInput />
          <mat-hint>Hasło, którym się zalogowałeś</mat-hint>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Nowe hasło</mat-label>
          <input formControlName="new" matInput />
          <mat-hint>Minimum 8 znaków, wielka litera i liczba</mat-hint>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Powtórz nowe hasło</mat-label>
          <input (paste)="$event.preventDefault()" formControlName="repeatNew" matInput />
        </mat-form-field>

        <button [disabled]="loading" class="mt-4" mat-raised-button color="primary">
          <ng-container *ngIf="!loading; else spinner">Aktualizuj hasło</ng-container>
          <ng-template #spinner><mat-spinner [diameter]="16" /></ng-template>
        </button>

        <button
          type="button"
          (click)="logout()"
          [disabled]="logoutLoading"
          class="mt-4"
          mat-raised-button
          color="secondary">
          <ng-container *ngIf="!logoutLoading; else spinner">Wyloguj się</ng-container>
          <ng-template #spinner><mat-spinner [diameter]="16" /></ng-template>
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export default class FirstLoginPageComponent {
  authService = inject(AuthService);

  authState = inject(AuthStateService);

  fb = inject(NonNullableFormBuilder);

  snack = inject(MatSnackBar);
  loading = false;
  logoutLoading = false;

  sameAsOtherValue(ctrlName: string): ValidatorFn {
    return (ctrl: AbstractControl) => {
      const expectedValue: string | null = ctrl.parent?.get(ctrlName)?.value;

      return expectedValue === ctrl.value ? null : { sameAsOther: true };
    };
  }

  // TODO: more validators and messages
  form = this.fb.group({
    old: this.fb.control('', [Validators.required]),
    new: this.fb.control('', [Validators.required]),
    repeatNew: this.fb.control('', [Validators.required, this.sameAsOtherValue('new')]),
  });

  ngOnInit() {}

  logout() {
    this.authService.logout(() => {
      this.logoutLoading = false;
    });
  }

  updatePassword() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .handleFirstLogin(this.form.getRawValue(), this.authState.$value().user!.id)
      .pipe(delay(1500))
      .subscribe({
        next: () => {
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.snack.open('Błąd', '', {
            duration: 2000,
          });
        },
      });
  }
}
