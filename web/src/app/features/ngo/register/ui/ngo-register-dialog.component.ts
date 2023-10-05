import { Component, inject } from '@angular/core';
import { NgoRegisterForm } from '../model/ngo-register-form.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-ng-register-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
  template: `
    <h1 mat-dialog-title>
      <span>Wniosek</span>
      <button mat-outline-button [mat-dialog-close]="false"><mat-icon class="align-middle">close</mat-icon></button>
    </h1>
    <div mat-dialog-content>
      {{ dialogData.form.organisation }}
      <!-- <app-add-offer-form [formValue]="dialogData.offer" (add)="dialogRef.close($event)" /> -->
    </div>
  `,
})
export class NgoRegisterDialogComponent {
  dialogRef = inject<MatDialogRef<NgoRegisterDialogComponent>>(MatDialogRef);
  dialogData = inject<{ form: NgoRegisterForm }>(MAT_DIALOG_DATA);
}
