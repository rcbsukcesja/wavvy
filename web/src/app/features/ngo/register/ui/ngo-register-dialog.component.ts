import { Component, inject } from '@angular/core';
import { NgoRegisterForm } from '../model/ngo-register-form.model';
import { CommonModule } from '@angular/common';
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
  ],
  template: ` <h1 mat-dialog-title>
      {{ dialogData.element.name }}
    </h1>
    <div mat-dialog-content>
      <p>
        Zatwierdzona organizacja będzie widoczna publicznie. Zawszę będziesz mógł ją tymczasowo zablokować korzystając z
        tego samego panelu
      </p>

      <!-- <form [formGroup]="form">
        <mat-form-field class="w-full">
          <mat-label>Powód odrzucenia, min. 10 znaków</mat-label>
          <textarea formControlName="reason" matInput #textarea></textarea>
          <mat-hint class="w-full flex justify-end">
            <span [class.text-red-500]="textarea.value.length > MAX_LENGTH">
              {{ textarea.value.length }}/{{ MAX_LENGTH }}
            </span></mat-hint
          >
        </mat-form-field>
      </form> -->

      <footer class="flex justify-between">
        <button mat-raised-button [mat-dialog-close]="true">Zatwierdź organizacje</button>
        <button [mat-dialog-close]="false" mat-raised-button>Anuluj</button>
      </footer>
    </div>`,
})
export class NgoRegisterDialogComponent {
  dialogRef = inject<MatDialogRef<NgoRegisterDialogComponent>>(MatDialogRef);
  dialogData = inject<{ element: { name: string } }>(MAT_DIALOG_DATA);

  MAX_LENGTH = 300;

  form = inject(NonNullableFormBuilder).group({
    reason: ['', [Validators.maxLength(this.MAX_LENGTH), Validators.minLength(10)]],
  });
}
