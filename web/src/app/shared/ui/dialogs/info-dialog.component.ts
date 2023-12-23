import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export type InfoDialogData = { title: string; message: string };

@Component({
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>

    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Ok, rozumiem!</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class InfoDialogComponent {
  data = inject<InfoDialogData>(MAT_DIALOG_DATA);
}
