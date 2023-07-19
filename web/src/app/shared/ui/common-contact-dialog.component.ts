import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  template: `
    <h1 mat-dialog-title>Dane kontaktowe</h1>
    <div mat-dialog-content>
      <mat-divider />
      <ul class="flex flex-col gap-4 mt-4">
        <li class="flex items-center gap-2"><mat-icon> place</mat-icon> <strong>Adres: </strong>{{ data.address }}</li>
        <li class="flex items-center gap-2"><mat-icon> phone</mat-icon> <strong>Telefon: </strong>{{ data.phone }}</li>
        <li class="flex items-center gap-2"><mat-icon> mail</mat-icon> <strong>E-mail: </strong>{{ data.email }}</li>
        <li class="flex items-center gap-2">
          <mat-icon> language</mat-icon> <strong>Strona internetowa: </strong>{{ data.website }}
        </li>
      </ul>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDividerModule, NgFor, MatIconModule],
})
export class ContactDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject<MatDialogRef<ContactDialogComponent>>(MatDialogRef);
}
