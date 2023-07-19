import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Offer } from '../model/offer.model';
import { AddOfferFormComponent } from './add-offer-form.component';

@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, AddOfferFormComponent, MatIconModule, CommonModule],
  template: `
    <h1 mat-dialog-title>
      <span>{{ dialogData.offer ? 'Edycja' : 'Dodawanie' }} oferty</span>
      <button mat-outline-button [mat-dialog-close]="false"><mat-icon class="align-middle">close</mat-icon></button>
    </h1>
    <div mat-dialog-content>
      <app-add-offer-form [formValue]="dialogData.offer" (add)="dialogRef.close($event)" />
    </div>
  `,
})
export class OfferFormDialogComponent {
  dialogRef = inject<MatDialogRef<OfferFormDialogComponent>>(MatDialogRef);
  dialogData = inject<{ offer: Offer }>(MAT_DIALOG_DATA);
}
