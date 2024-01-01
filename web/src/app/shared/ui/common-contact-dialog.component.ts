import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@Component({
  template: `
   <h1 mat-dialog-title>Dane kontaktowe</h1>
   <mat-divider/>
  <div mat-dialog-content>
    @for(contact of contactInformation; track $index){
      <div class="flex justify-center flex-col md:flex-row md:justify-start md:items-center">
            <div class="flex items-center font-bold">
                <p class="flex justify-center items-center"><mat-icon [fontIcon]="contact.icon"></mat-icon></p>
                <p class="!mx-2">{{ contact.label }}:</p>
            </div>
            @if(contact.linkProperty){
              <p class="break-words"><a class="outline-none" [href]="contact.linkProperty" target="_blank">
                    {{ contact.linkProperty}}
                </a></p>
            } @else {
              <p class="break-words">{{contact.property}}</p>
            }
        </div>
    }
  `,
  standalone: true,
  imports: [MatDialogModule, MatDividerModule, MatIconModule,],
})
export class ContactDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject<MatDialogRef<ContactDialogComponent>>(MatDialogRef);

  contactInformation = [
    { icon: 'place', label: 'Adres', property: `${this.data.address?.street}, ${this.data.address?.zipCode} ${this.data.address?.city}`, linkProperty: null },
    { icon: 'phone', label: 'Telefon', property: this.data.phone, linkProperty: null },
    { icon: 'mail', label: 'E-mail', property: this.data.email, linkProperty: null },
    { icon: 'language', label: 'Strona internetowa', property: this.data.website, linkProperty: this.data.website },
];
}