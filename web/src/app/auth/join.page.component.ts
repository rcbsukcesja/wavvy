import { Component, inject } from '@angular/core';
import { AuthService } from './data_access/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, delay, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-join-page',
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
        <p class="text-2xl font-semibold">Dołącz do Wavvy!</p>
        <span>Aktualnie Wavvy dostępne jest wyłącznie dla Kołobrzega</span>
      </header>

      <ng-template #info>
        <section class="mt-16 flex flex-col items-center">
          <p class="text-center mb-4 font-semibold">
            Brawo! Niezwłocznie postaramy skontaktować się z Tobą w celu utworzenia Ci konta
          </p>

          <div class="flex flex-col mb-4">
            <div class="flex items-center text-4xl">
              <mat-icon aria-label="Side nav toggle icon">waves</mat-icon>
              <span class="ml-2 tracking-widest">Wavvy</span>
            </div>
            <span class="text-xl ml-2 text-blue-300">na fali pomocy</span>
          </div>
        </section>
      </ng-template>

      <ng-container *ngIf="!formRegistered; else info">
        <form [formGroup]="form" (ngSubmit)="register()" class="flex flex-col gap-2 w-full max-w-lg">
          <mat-form-field>
            <mat-label>Imię i nazwisko</mat-label>
            <input formControlName="fullName" matInput />
            <mat-hint>Imię i nazwisko reprezentanta</mat-hint>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Adres e-mail</mat-label>
            <input formControlName="email" matInput />
            <mat-hint>Adres email będzie twoim loginem</mat-hint>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Telefon</mat-label>
            <input type="tel" formControlName="phone" matInput />
            <mat-hint>Format: 793123456</mat-hint>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Twój NGO</mat-label>
            <input type="tel" formControlName="organisation" matInput />
            <mat-hint>Podaj nazwę NGO, który reprezentujesz</mat-hint>
          </mat-form-field>

          <mat-form-field>
            <mat-label>NIP organizacji</mat-label>
            <input formControlName="NIP" matInput />
            <mat-hint></mat-hint>
          </mat-form-field>

          <mat-form-field>
            <mat-label>KRS organizacji</mat-label>
            <input formControlName="KRS" matInput />
            <mat-hint></mat-hint>
          </mat-form-field>

          <button [disabled]="loading" class="mt-4" mat-raised-button color="primary">
            <ng-container *ngIf="!loading; else spinner">Wyślij zgłoszenie</ng-container>
            <ng-template #spinner><mat-spinner [diameter]="16" /></ng-template>
          </button>
        </form>
      </ng-container>
    </div>
  `,
  styles: [],
})
export default class JoinPageComponent {
  authService = inject(AuthService);

  fb = inject(NonNullableFormBuilder);

  snack = inject(MatSnackBar);

  formRegistered = false;
  loading = false;

  form = this.fb.group({
    fullName: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required]),
    phone: this.fb.control('', [Validators.required]),
    organisation: this.fb.control('', [Validators.required]),
    KRS: this.fb.control(''),
    NIP: this.fb.control('', [Validators.required]),
  });

  register() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .register(this.form.getRawValue())
      .pipe(delay(1500))
      .subscribe({
        next: () => {
          this.formRegistered = true;
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
