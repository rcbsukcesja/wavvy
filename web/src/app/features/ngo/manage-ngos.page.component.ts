import { NgIf, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, map, filter, take, switchMap, EMPTY } from 'rxjs';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { CommonFiltersComponent, CommonFilters } from 'src/app/shared/ui/common-filters.component';
import { RemoveDialogComponent } from 'src/app/shared/ui/common-remove-dialog.component';
import PaginationComponent from 'src/app/shared/ui/pagination.component';
import { Project } from '../projects/model/project.model';
import { ProjectStatusPipe } from '../projects/utils/project-status.pipe';
import { NGOsStateService } from './data-access/ngos.state.service';
import { NGOsApiService } from './data-access/ngos.api.service';
import { NgoStatusPipe } from './utils/ngo-status.pipe';
import { ChangeNgoStatusDialogComponent, ChangeStatusDialogData } from './ui/change-ngo-status.component';
import { NGO } from './model/ngo.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-manage-ngos-page',
  standalone: true,
  template: `
    <header>
      <h2>Zarządzaj NGO</h2>
    </header>
    <!-- <button class="mb-4" mat-raised-button color="primary" (click)="goToProjectForm()">Dodaj</button> -->
    <app-common-filters (filtersChanged)="onFiltersChanged($event)" />
    <ng-container *ngIf="dataSource() as data">
      <table mat-table [dataSource]="data.list" class="mat-elevation-z8">
        <ng-container matColumnDef="position">
          <th mat-header-cell *matHeaderCellDef>Lp</th>
          <td mat-cell *matCellDef="let element">{{ element.position }}</td>
        </ng-container>

        <ng-container matColumnDef="phone">
          <th mat-header-cell *matHeaderCellDef>Telefon</th>
          <td mat-cell *matCellDef="let element">{{ element.phone }}</td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let element">{{ element.email }}</td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let element">
            <div
              class="rounded-full h-4 w-4 mx-auto"
              [matTooltip]="'Skontaktuj się z miastem by dowiedzieć się o powodzie'"
              [matTooltipDisabled]="!element.disabled"
              [ngClass]="element.disabled ? 'bg-red-500' : 'bg-green-500'"></div>
          </td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nazwa</th>
          <td mat-cell *matCellDef="let element">{{ element.name }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element">
            <div class="flex gap-4">
              <button (click)="edit(element)"><mat-icon>edit</mat-icon></button>
              <!-- <button (click)="goToProjectForm(element)"><mat-icon>edit</mat-icon></button> -->
              <!-- <button (click)="remove(element)"><mat-icon>delete</mat-icon></button> -->
            </div>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
      <br />
      <app-pagination [totalElements]="data.totalElements" (paginationChange)="handlePageEvent($event)" />
    </ng-container>
  `,
  imports: [
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    DatePipe,
    ProjectStatusPipe,
    PaginationComponent,
    CommonFiltersComponent,
    NgoStatusPipe,
    NgClass,
    MatTooltipModule,
  ],
})
export default class ManageNGOsPageComponent implements OnInit {
  private filters$$ = new BehaviorSubject<PaginationFilters & CommonFilters>({
    pageIndex: 0,
    pageSize: 5,
    search: '',
    sort: 'desc',
  });

  private router = inject(Router);
  service = inject(NGOsApiService);
  stateService = inject(NGOsStateService);
  displayedColumns: string[] = [
    'position',
    'name',
    'phone',
    'email',
    // 'description',
    // 'startTime',
    // 'endTime',
    // 'budget',
    'status',
    // 'visibility',
    // 'tags',
    'actions',
  ];

  edit(ngo: NGO) {
    this.dialog
      .open(ChangeNgoStatusDialogComponent, {
        width: '500px',
        data: {
          disabled: ngo.disabled,
        } as ChangeStatusDialogData,
      })
      .afterClosed()
      .pipe(
        take(1),
        switchMap(status => {
          if (status === undefined) {
            return EMPTY;
          }

          return this.service.updateProfile({ disabled: status }, ngo.id);
        })
      )
      .subscribe(() => {
        this.service.getAll(this.filters$$.value);
      });
  }

  dataSource = toSignal(
    this.stateService.value$.pipe(
      map(({ list, totalElements }) => {
        return {
          list: list.map((offer, index) => ({
            position: index + 1,
            ...offer,
          })),
          totalElements,
        };
      })
    )
  );

  dialog = inject(MatDialog);

  remove(project: Project) {
    this.dialog
      .open(RemoveDialogComponent, {
        width: '250px',
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        // this.service.delete(project.id);
      });
  }

  ngOnInit() {
    this.filters$$.subscribe(filters => {
      this.service.getAll(filters);
    });
  }

  goToProjectForm(project?: Project) {
    this.router.navigateByUrl(`/manage/projects/form${project ? `/${project.id}` : ''}`);
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
