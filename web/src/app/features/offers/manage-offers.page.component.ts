import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AddOfferFormComponent } from './ui/add-offer-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OffersApiService } from './data-access/offers.api.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, NgIf, SlicePipe } from '@angular/common';
import { BehaviorSubject, filter, map } from 'rxjs';
import { Offer } from './model/offer.model';
import { OfferFormDialogComponent } from './ui/offer-form-dialog.component';
import { RemoveDialogComponent } from 'src/app/shared/ui/common-remove-dialog.component';
import { OffersStateService } from './data-access/offers.state.service';
import PaginationComponent from 'src/app/shared/ui/pagination.component';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { CommonFilters, CommonFiltersComponent } from 'src/app/shared/ui/common-filters.component';
import { INITIAL_PAGINATION_STATE } from '../projects/data-access/projects.state.service';
import { LoadingComponent } from 'src/app/shared/ui/loading.component';
import { CenterDirective } from 'src/app/shared/center-directive.directive';

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
    PaginationComponent,
    CommonFiltersComponent,
    LoadingComponent,
    CenterDirective
  ],
  template: `
  <div appCenterDirective>
    <header>
      <h2>Zarządzaj ofertami</h2>
    </header>
    <button mat-raised-button color="primary" class="mb-4" (click)="openOfferForm()">Dodaj</button>
    <app-common-filters (filtersChanged)="onFiltersChanged($event)" />

    <ng-container *ngIf="dataSource() as data">
    <div class="min-w-full overflow-x-auto">
      <table *ngIf="data.loadListCallState === 'LOADED'" mat-table [dataSource]="data.list" class="mat-elevation-z8">
        <ng-container matColumnDef="position">
          <th mat-header-cell *matHeaderCellDef>Lp</th>
          <td mat-cell *matCellDef="let element">{{ element.position + data.positionModifier }}</td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nazwa</th>
          <td mat-cell *matCellDef="let element">{{ element.name }}</td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Opis</th>
          <td class="py-4" mat-cell *matCellDef="let element">{{ element.description | slice: 0 : 100 }}...</td>
        </ng-container>

        <ng-container matColumnDef="targetAudience">
          <th mat-header-cell *matHeaderCellDef>Grupa docelowa</th>
          <td mat-cell *matCellDef="let element">{{ element.targetAudience }}</td>
        </ng-container>

        <ng-container matColumnDef="budget">
          <th mat-header-cell *matHeaderCellDef>Budżet (PLN)</th>
          <td mat-cell *matCellDef="let element">{{ element.budget }}</td>
        </ng-container>

        <ng-container matColumnDef="fundingLevel">
          <th mat-header-cell *matHeaderCellDef>Poziom finansowania</th>
          <td mat-cell *matCellDef="let element">{{ element.fundingLevel }}%</td>
        </ng-container>

        <ng-container matColumnDef="startDate">
          <th mat-header-cell *matHeaderCellDef>Data od</th>
          <td mat-cell *matCellDef="let element">{{ element.startDate | date }}</td>
        </ng-container>

        <ng-container matColumnDef="endDate">
          <th mat-header-cell *matHeaderCellDef>Data do</th>
          <td mat-cell *matCellDef="let element">{{ element.endDate | date }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element">
            <div class="flex gap-4">
              <button (click)="openOfferForm(element)"><mat-icon>edit</mat-icon></button>
              <button (click)="remove(element)"><mat-icon>delete</mat-icon></button>
            </div>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
      </div>
      @if (data.loadListCallState === 'LOADING') {
        <app-loader text="Ładowanie ofert..."></app-loader>
      }

    </ng-container>
    </div>
    @if (dataSource(); as state) {
      <app-pagination [totalElements]="state.totalElements" (paginationChange)="handlePageEvent($event)" />
    }
  `,
})
export default class ManageOffersPageComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  private filters$$ = new BehaviorSubject<PaginationFilters & CommonFilters>({
    pageIndex: 0,
    pageSize: INITIAL_PAGINATION_STATE.size,
    search: '',
    sort: 'desc',
  });

  service = inject(OffersApiService);
  stateService = inject(OffersStateService);
  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'targetAudience',
    'budget',
    'fundingLevel',
    'startDate',
    'endDate',
    'actions',
  ];

  dataSource = toSignal(
    this.stateService.value$.pipe(
      map(({ list, totalElements, loadListCallState }) => {
        return {
          loadListCallState,
          list: list.map((offer, index) => ({
            position: index + 1,
            ...offer,
          })),
          totalElements,
          positionModifier: this.filters$$.value.pageIndex * this.filters$$.value.pageSize,
        };
      })
    )
  );

  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.filters$$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(filters => {
      this.service.getAll(filters);
    });
  }

  remove(offer: Offer) {
    this.dialog
      .open(RemoveDialogComponent, {
        width: '250px',
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.service.delete(offer.id);
      });
  }

  openOfferForm(offer?: Offer) {
    this.dialog
      .open(OfferFormDialogComponent, {
        width: '500px',
        data: {
          offer: offer || null,
        },
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(formValue => {
        if (offer) {
          this.service.update(offer.id, formValue);
        } else {
          this.service.add(formValue);
        }
      });
  }

  handlePageEvent(e: { pageSize: number; pageIndex: number }) {
    this.filters$$.next({
      ...this.filters$$.value,
      pageIndex: e.pageIndex,
      pageSize: e.pageSize,
    });
  }

  onFiltersChanged(filters: CommonFilters) {
    this.filters$$.next({
      ...this.filters$$.value,
      ...filters,
    });
  }
}
