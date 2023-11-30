import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';

export type ErrorDialogData = {
  error: HttpErrorResponse;
  req: HttpRequest<unknown>;
  next: HttpHandlerFn;
};

@Component({
  template: `
    <h1 mat-dialog-title>Błąd</h1>
    <div mat-dialog-content>
      <p>Status: {{ dialogData.error.status }}</p>
      <p></p>
      <p>Status: {{ dialogData.error.message }}</p>
      <p></p>
    </div>

    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Zamknij</button>
      <button mat-button (click)="retry()">Powtórz!</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
})
export class ErrorDialogComponent {
  dialogRef = inject<MatDialogRef<ErrorDialogComponent>>(MatDialogRef);
  dialogData = inject<ErrorDialogData>(MAT_DIALOG_DATA);

  retry() {
    this.dialogData.next(this.dialogData.req).subscribe();
  }
}
