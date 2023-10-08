import { NgIf, DatePipe, SlicePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { filter, map } from 'rxjs';
import { AddOfferFormComponent } from '../../offers/ui/add-offer-form.component';
import { NgoRegisterFormApiService } from './data-access/ngo-register.api.service';
import { NgoRegisterFormStateService } from './data-access/ngo-register.state.service';
import { NgoRegisterForm } from './model/ngo-register-form.model';
import { NgoRegisterFormStatusComponent } from './ui/ngo-register-form-status.component';
import { NgoRegisterDialogComponent } from './ui/ngo-register-dialog.component';

@Component({
  selector: 'app-manage-offers-page',
  standalone: true,
  imports: [
    MatTableModule,
    AddOfferFormComponent,
    MatIconModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    DatePipe,
    SlicePipe,
    NgoRegisterFormStatusComponent,
  ],
  template: `
    <header>
      <h2>Rejestracja organizacji</h2>
    </header>
    <!-- <button mat-raised-button color="primary" (click)="openOfferForm()">Dodaj</button> -->

    <table *ngIf="dataSource() as data" mat-table [dataSource]="data" class="mat-elevation-z8">
      <ng-container matColumnDef="position">
        <th mat-header-cell *matHeaderCellDef>Lp</th>
        <td mat-cell *matCellDef="let element">{{ element.position }}</td>
      </ng-container>

      <ng-container matColumnDef="fullName">
        <th mat-header-cell *matHeaderCellDef>Imię i nazwisko</th>
        <td mat-cell *matCellDef="let element">{{ element.fullName }}</td>
      </ng-container>

      <ng-container matColumnDef="phone">
        <th mat-header-cell *matHeaderCellDef>Telefon</th>
        <td mat-cell *matCellDef="let element">{{ element.phone }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td class="py-4" mat-cell *matCellDef="let element">{{ element.email }}</td>
      </ng-container>

      <ng-container matColumnDef="organisation">
        <th mat-header-cell *matHeaderCellDef>Nazwa organizacji</th>
        <td mat-cell *matCellDef="let element">{{ element.organisation }}</td>
      </ng-container>

      <ng-container matColumnDef="NIP">
        <th mat-header-cell *matHeaderCellDef>NIP</th>
        <td mat-cell *matCellDef="let element">{{ element.NIP }}</td>
      </ng-container>

      <ng-container matColumnDef="KRS">
        <th mat-header-cell *matHeaderCellDef>KRS</th>
        <td mat-cell *matCellDef="let element">{{ element.KRS || '-' }}</td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let element"><app-ngo-register-form-status [status]="element.status" /></td>
      </ng-container>

      <ng-container matColumnDef="createdAt">
        <th mat-header-cell *matHeaderCellDef>Data wysłania</th>
        <td mat-cell *matCellDef="let element">{{ element.endDate | date }}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <button *ngIf="element.status === 'PENDING'" (click)="openChangeStatus(element)">
            <mat-icon>edit</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
})
export default class RegisterNgoPageComponent implements OnInit {
  service = inject(NgoRegisterFormApiService);
  stateService = inject(NgoRegisterFormStateService);
  displayedColumns: string[] = [
    'fullName',
    'phone',
    'email',
    'organisation',
    'NIP',
    'KRS',
    'createdAt',
    'status',
    'actions',
  ];

  dataSource = toSignal(
    this.stateService.value$.pipe(
      map(data =>
        data.list.map((offer, index) => ({
          position: index + 1,
          ...offer,
        }))
      )
    )
  );

  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.service.getAll();
  }

  openChangeStatus(form: NgoRegisterForm) {
    this.dialog
      .open(NgoRegisterDialogComponent, {
        width: '500px',
        data: {
          form,
        },
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((formValue: string | true) => {
        if (typeof formValue === 'string') {
          this.service.update(form.id, { reason: formValue, status: 'REJECTED' });
        } else {
          this.service.update(form.id, { status: 'ACCEPTED' });
        }
      });
  }
}
