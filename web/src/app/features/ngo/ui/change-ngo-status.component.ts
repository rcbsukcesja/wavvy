import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgoStatus } from '../model/ngo.model';

export type ChangeStatusDialogData = {
  disabled: boolean;
};

@Component({
  template: `
    <h1 mat-dialog-title>Zmień status</h1>
    <div mat-dialog-content>
      <p>Uwaga! Zablokowane organizacje oraz ich projekty nie są wyświetlane na publicznych listach</p>
      <input id="active" class="mr-2" [formControl]="control" form type="radio" [value]="false" />
      <label for="active" class="mr-4">Aktywny</label>
      <input id="disabled" class="mr-2" [formControl]="control" type="radio" [value]="true" />
      <label for="disabled">Zablokowany</label>
    </div>

    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Zamknij</button>
      <button [disabled]="dialogData.disabled === control.value" mat-button (click)="changeStatus()">
        Zaktualizuj
      </button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, ReactiveFormsModule],
})
export class ChangeNgoStatusDialogComponent {
  dialogRef = inject<MatDialogRef<ChangeNgoStatusDialogComponent, boolean>>(MatDialogRef);
  dialogData = inject<ChangeStatusDialogData>(MAT_DIALOG_DATA);

  control = new FormControl(this.dialogData.disabled, { nonNullable: true });

  changeStatus() {
    this.dialogRef.close(this.control.value);
  }
}
