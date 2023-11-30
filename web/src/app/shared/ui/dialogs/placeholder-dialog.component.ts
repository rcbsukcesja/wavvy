import { CommonModule, NgComponentOutlet } from '@angular/common';
import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Component, Type, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';

export type PlaceholderDialogData<C, T extends Record<any, any>> = {
  component: Type<C>;
  inputs: T;
};

@Component({
  template: `
    <h1 mat-dialog-title>Podgląd</h1>
    <div mat-dialog-content class="text-black">
      <ng-container *ngComponentOutlet="dialogData.component; inputs: dialogData.inputs" />
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Zamknij</button>
      <!-- <button mat-button (click)="retry()">Powtórz!</button> -->
    </div>
  `,
  styles: `
    :host {
      --mdc-dialog-supporting-text-color: var(--mat-tree-node-text-color);
    }
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, NgComponentOutlet],
})
export class PlaceholderDialogComponent<C, T extends Record<any, any>> {
  dialogRef = inject(MatDialogRef);
  dialogData = inject<PlaceholderDialogData<C, T>>(MAT_DIALOG_DATA);
}
