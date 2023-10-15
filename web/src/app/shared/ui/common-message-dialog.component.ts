import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface MessageDialogFormValue {
  title: string;
  message: string;
  contact: string;
  name: string;
}

@Component({
  template: `
    <h1 mat-dialog-title>Wyślij wiadomość {{ this.data.connector }} {{ this.data.name }}</h1>
    <div mat-dialog-content>
      <form [formGroup]="form">
        <mat-form-field class="w-full">
          <mat-label>Tytuł</mat-label>
          <input formControlName="title" matInput />
        </mat-form-field>
        <br />
        <mat-form-field class="w-full">
          <mat-label>Treść</mat-label>
          <textarea formControlName="message" matInput></textarea>
        </mat-form-field>
        <br />
        <mat-form-field class="w-full">
          <mat-label>Kontakt</mat-label>
          <textarea formControlName="contact" matInput></textarea>
        </mat-form-field>
        <br />
        <mat-form-field class="w-full">
          <mat-label>Nadawca</mat-label>
          <textarea formControlName="name" matInput></textarea>
        </mat-form-field>
        <br />
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Anuluj</button>
      <button mat-button [mat-dialog-close]="form.value" cdkFocusInitial>Wyślij</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class MessageDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject<MatDialogRef<MessageDialogComponent>>(MatDialogRef);
  private builder = inject(NonNullableFormBuilder);

  form = this.builder.group({
    title: this.builder.control('', [Validators.required]),
    message: this.builder.control('', [Validators.required]),
    contact: this.builder.control('', [Validators.required]),
    name: this.builder.control('', [Validators.required]),
  });
}
