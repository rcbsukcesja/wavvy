import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `
    <h1 mat-dialog-title>Usuwanie</h1>
    <div mat-dialog-content>Czy na pewno chcesz usunąć ten element? Nie możesz cofnąć tej czynności</div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Nie</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Tak</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class RemoveDialogComponent {
  dialogRef = inject<MatDialogRef<RemoveDialogComponent>>(MatDialogRef);
}
