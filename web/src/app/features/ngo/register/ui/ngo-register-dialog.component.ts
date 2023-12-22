import { Component, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-ng-register-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    NgClass,
  ],
  template: ` <h1 mat-dialog-title>
      {{ dialogData.element.name }}
    </h1>
    <div mat-dialog-content>
      <p [ngClass]="validREGON ? 'text-green-500' : 'text-red-500'">
        Prawidłowy numer REGON <span *ngIf="!dialogData.isCompany">lub jego brak</span>
      </p>
      <p [ngClass]="validNIP ? 'text-green-500' : 'text-red-500'">
        Prawidłowy NIP <span *ngIf="!dialogData.isCompany">lub jego brak</span>
      </p>
      <p [ngClass]="validKRS ? 'text-green-500' : 'text-red-500'">Prawidłowy numer KRS lub jego brak</p>
      <br />
      <p>
        Zatwierdzona organizacja będzie widoczna publicznie. Zawszę będziesz mógł ją tymczasowo zablokować korzystając z
        tego samego panelu
      </p>

      <footer class="flex justify-between">
        <button mat-raised-button [disabled]="!canConfirm" [mat-dialog-close]="true">Zatwierdź organizacje</button>
        <button [mat-dialog-close]="false" mat-raised-button>Anuluj</button>
      </footer>
    </div>`,
})
export class NgoRegisterDialogComponent {
  dialogRef = inject<MatDialogRef<NgoRegisterDialogComponent>>(MatDialogRef);
  dialogData = inject<{ element: { name: string; krs?: string; regon?: string; nip?: string }; isCompany?: boolean }>(
    MAT_DIALOG_DATA
  );

  get validREGON() {
    const { regon } = this.dialogData.element;

    return this.dialogData.isCompany
      ? regon?.trim().length === 10 || regon?.trim().length === 14
      : !regon || regon.trim().length === 10 || regon.trim().length === 1;
  }

  get validNIP() {
    const { nip } = this.dialogData.element;

    return this.dialogData.isCompany ? nip?.trim().length === 10 : !nip || nip.trim().length === 10;
  }

  get validKRS() {
    const { krs } = this.dialogData.element;

    return !krs || krs.trim().length === 10;
  }

  get canConfirm() {
    return this.validNIP && this.validKRS && this.validREGON;
  }

  MAX_LENGTH = 300;

  form = inject(NonNullableFormBuilder).group({
    reason: ['', [Validators.maxLength(this.MAX_LENGTH), Validators.minLength(10)]],
  });
}
