import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      <mat-divider />
      <ul class="flex flex-col gap-2 mt-4">
        <li *ngFor="let item of data.items">- {{ item }}</li>
      </ul>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDividerModule, NgFor],
})
export class ListDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject<MatDialogRef<ListDialogComponent>>(MatDialogRef);
}
