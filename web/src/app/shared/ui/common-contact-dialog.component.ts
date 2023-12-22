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
      <table>
                        <tbody class="[&>*]:h-12">
                        <tr>
                          <th><div class="flex justify-center items-center"><mat-icon> place</mat-icon></div></th>
                          <th class="text-left">Adres: </th>
                          <th class="text-left font-normal pl-2">{{ data.address?.street }},  {{ data.address?.zipCode }}  {{ data.address?.city }}</th>
                        </tr>

                        <tr>
                          <th><div class="flex justify-center items-center"><mat-icon> phone</mat-icon></div></th>
                          <th class="text-left">Telefon: </th>
                          <th class="text-left font-normal pl-2">{{ data.phone }}</th>
                         </tr>

                         <tr>
                          <th><div class="flex justify-center items-center"><mat-icon> mail</mat-icon></div></th>
                          <th class="text-left">E-mail: </th>
                          <th class="text-left font-normal pl-2">{{ data.email }}</th>
                         </tr>

                         <tr>
                          <th><div class="flex justify-center items-center"><mat-icon> language</mat-icon></div></th>
                          <th class="text-left">Strona internetowa: </th>
                          <th class="text-left font-normal pl-2"><a [href]="data.website" target="_blank">{{ data.website }}</a></th>
                         </tr>
                        </tbody>
                      </table>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDividerModule, NgFor, MatIconModule],
})
export class ContactDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject<MatDialogRef<ContactDialogComponent>>(MatDialogRef);
}
