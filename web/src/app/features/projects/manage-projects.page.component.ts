import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { map, filter, BehaviorSubject, switchMap, take } from 'rxjs';
import { RemoveDialogComponent } from 'src/app/shared/ui/common-remove-dialog.component';
import { ProjectsApiService } from './data-access/projects.api.service';
import { Project } from './model/project.model';
import { ProjectsStateService } from './data-access/projects.state.service';
import { Router } from '@angular/router';
import { ProjectStatusPipe } from './utils/project-status.pipe';
import { NGOsStateService } from '../ngo/data-access/ngos.state.service';
import PaginationComponent from 'src/app/shared/ui/pagination.component';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { CommonFilters, CommonFiltersComponent } from 'src/app/shared/ui/common-filters.component';
import { UserRoles, USER_ROLES } from 'src/app/core/user-roles.enum';
import { ChangeNgoStatusDialogComponent, ChangeStatusDialogData } from '../ngo/ui/change-ngo-status.component';

@Component({
  selector: 'app-manage-projects-page',
  standalone: true,
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
  ],
  template: `
    <header>
      <h2>Zarządzaj projektami</h2>
    </header>
    <button *ngIf="role !== ADMIN_ROLE" class="mb-4" mat-raised-button color="primary" (click)="goToProjectForm()">
      Dodaj
    </button>
    <br />
    <app-common-filters (filtersChanged)="onFiltersChanged($event)" />
    <ng-container *ngIf="dataSource() as data">
      <table mat-table [dataSource]="data.list" class="mat-elevation-z8">
        <ng-container matColumnDef="position">
          <th mat-header-cell *matHeaderCellDef>Lp</th>
          <td mat-cell *matCellDef="let element">{{ element.position }}</td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let element">{{ element.status | projectStatus }}</td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nazwa</th>
          <td mat-cell *matCellDef="let element">{{ element.name }}</td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Opis</th>
          <td mat-cell *matCellDef="let element">
            <p class="line-clamp-4">{{ element.description }}</p>
          </td>
        </ng-container>

        <ng-container matColumnDef="startTime">
          <th mat-header-cell *matHeaderCellDef>Data rozpoczęcia</th>
          <td mat-cell *matCellDef="let element">{{ element.startTime | date }}</td>
        </ng-container>

        <ng-container matColumnDef="endTime">
          <th mat-header-cell *matHeaderCellDef>Data zakończenia</th>
          <td mat-cell *matCellDef="let element">{{ element.endTime | date }}</td>
        </ng-container>

        <ng-container matColumnDef="budget">
          <th mat-header-cell *matHeaderCellDef>Budżet (PLN)</th>
          <td mat-cell *matCellDef="let element">{{ element.budget }}</td>
        </ng-container>

        <ng-container matColumnDef="tags">
          <th mat-header-cell *matHeaderCellDef>Tagi</th>
          <td mat-cell *matCellDef="let element">{{ element.tags.join(', ') }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element">
            <div class="flex gap-4">
              <button *ngIf="role !== ADMIN_ROLE" (click)="goToProjectForm(element)"><mat-icon>edit</mat-icon></button>
              <button *ngIf="role === ADMIN_ROLE" (click)="changeStatus(element)"><mat-icon>edit</mat-icon></button>
              <button *ngIf="role !== ADMIN_ROLE" (click)="remove(element)"><mat-icon>delete</mat-icon></button>
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
})
export default class ManageProjectsPageComponent implements OnInit {
  @Input() role?: UserRoles;

  ADMIN_ROLE = USER_ROLES.ADMIN;

  private filters$$ = new BehaviorSubject<PaginationFilters & CommonFilters>({
    pageIndex: 0,
    pageSize: 5,
    search: '',
    sort: 'desc',
  });

  changeStatus(project: Project) {
    this.dialog
      .open(ChangeNgoStatusDialogComponent, {
        width: '500px',
        data: {
          status: project.disabled ? 'DISABLED' : 'ACTIVE',
        } as ChangeStatusDialogData,
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe(status => {
        this.service.update(project.id, { disabled: status === 'DISABLED' }, this.filters$$.value);
      });
  }

  private router = inject(Router);
  service = inject(ProjectsApiService);
  ngoService = inject(NGOsStateService);
  stateService = inject(ProjectsStateService);
  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'startTime',
    'endTime',
    'budget',
    'status',
    'tags',
    'actions',
  ];

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
        this.service.delete(project.id);
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
