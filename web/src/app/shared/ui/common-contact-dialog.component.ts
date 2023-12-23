import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  template: `
    <h1 mat-dialog-title>Dane kontaktowe</h1>
    <div mat-dialog-content>
      <mat-divider />
      @if(isAsideHidden$ | async){
        <div>
          <div class="flex items-center h-8 font-bold">
            <mat-icon class="mr-2"> place</mat-icon>
            Adres:
          </div>
          {{ data.address?.street }},  {{ data.address?.zipCode }}  {{ data.address?.city }}
        </div>

        <div>
          <div class="flex items-center h-8 font-bold">
          <mat-icon class="mr-2"> phone</mat-icon>
            Telefon:
          </div>
          <p>{{ data.phone }}</p>
        </div>

        <div>
          <div class="flex items-center h-8 font-bold">
          <mat-icon class="mr-2"> mail</mat-icon>
            E-mail:
          </div>
          <p>{{ data.email }}</p>
        </div>

        <div>
          <div class="flex items-center h-8 font-bold">
          <mat-icon class="mr-2"> language</mat-icon>
            Strona internetowa:
          </div>
          <a class="break-words line-clamp-3 outline-none" [href]="data.website" target="_blank">huahuahauhauahuahauhauahuahauhauhauahuahauhauahuahuahauhauhauhauhauhauahauahuahauhauhauhauhauhauahauahuahauhauhauhauhauhauahauahuahauhauhauhauhauhauahauhuauhauahuahuah</a>
        </div>
      } @else {
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
      }
      
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDividerModule, NgFor, MatIconModule, AsyncPipe],
})
export class ContactDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject<MatDialogRef<ContactDialogComponent>>(MatDialogRef);
  private breakpointObserver = inject(BreakpointObserver);
  
  isAsideHidden$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
    map(result => result.matches),
    shareReplay()
  );
}
