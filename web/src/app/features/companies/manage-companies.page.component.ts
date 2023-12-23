import { NgIf, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, take, switchMap, map, filter } from 'rxjs';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { CommonFiltersComponent, CommonFilters } from 'src/app/shared/ui/common-filters.component';
import { RemoveDialogComponent } from 'src/app/shared/ui/common-remove-dialog.component';
import PaginationComponent from 'src/app/shared/ui/pagination.component';
import { ChangeStatusDialogComponent, ChangeStatusDialogData } from '../ngo/ui/change-ngo-status.component';
import { NgoStatusPipe } from '../ngo/utils/ngo-status.pipe';
import { Project } from '../projects/model/project.model';
import { CompaniesApiService } from './data-access/companies.api.service';
import { CompaniesStateService } from './data-access/companies.state.service';
import { Company } from './model/company.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgoRegisterDialogComponent } from '../ngo/register/ui/ngo-register-dialog.component';
import { PlaceholderDialogComponent } from 'src/app/shared/ui/dialogs/placeholder-dialog.component';
import { CompanyCardComponent } from './ui/company-card.component';
import { INITIAL_PAGINATION_STATE } from '../projects/data-access/projects.state.service';
import { LoadingComponent } from 'src/app/shared/ui/loading.component';
import { CenterDirective } from 'src/app/shared/center-directive.directive';

@Component({
  selector: 'app-manage-companies-page',
  standalone: true,
  template: `
  <div appCenterDirective>
    <header>
      <h2>Zarządzaj firmami</h2>
    </header>
    <app-common-filters (filtersChanged)="onFiltersChanged($event)" />
    <ng-container *ngIf="dataSource() as data">
    <div class="min-w-full overflow-x-auto">
      <table *ngIf="data.loadListCallState === 'LOADED'" mat-table [dataSource]="data.list" class="mat-elevation-z8">
        <ng-container matColumnDef="position">
          <th mat-header-cell *matHeaderCellDef>Lp</th>
          <td mat-cell *matCellDef="let element">{{ element.position + data.positionModifier }}</td>
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
            <div class="flex items-center justify-center">
              <div
                class="rounded-full h-4 w-4 ml-1 shrink-0"
                [matTooltip]="'Powód blokady: ' + element.reason"
                [matTooltipDisabled]="!element.disabled"
                [ngClass]="element.disabled ? 'bg-red-500' : 'bg-green-500'"></div>
            </div>
          </td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nazwa</th>
          <td mat-cell *matCellDef="let element">{{ element.name }}</td>
        </ng-container>

        <ng-container matColumnDef="confirmed">
          <th mat-header-cell *matHeaderCellDef>
            <mat-icon [matTooltip]="'Status potwierdzenia firmy'">verified</mat-icon>
          </th>
          <td mat-cell *matCellDef="let element">
            @if (element.confirmed) {
            <mat-icon class="bg-green-500 rounded-full text-white">check</mat-icon>
            } @else {
            <mat-icon>hourglass_empty</mat-icon>
            }
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element">
            <div class="flex gap-4">
              <button [matTooltip]="'Pokaż firmę'" (click)="showCompanyOnList(element)">
                <mat-icon>preview</mat-icon>
              </button>
              <button [matTooltip]="'Zatwierdź firmę'" (click)="openConfirmationDialog(element)">
                <mat-icon [class.text-gray-300]="element.confirmed">check</mat-icon>
              </button>
              <button (click)="edit(element)"><mat-icon>edit</mat-icon></button>
            </div>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
          </div>
      @if (data.loadListCallState === 'LOADING') {
      <app-loader text="Ładowanie firm..."></app-loader>
      }
    </ng-container>
    </div>
    @if (dataSource(); as state) {
    <app-pagination [totalElements]="state.totalElements" (paginationChange)="handlePageEvent($event)" />
    }
  `,
  imports: [
    LoadingComponent,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    DatePipe,
    PaginationComponent,
    CommonFiltersComponent,
    NgoStatusPipe,
    NgClass,
    MatTooltipModule,
    CenterDirective
  ],
})
export default class ManageCompaniesPageComponent implements OnInit {
  private filters$$ = new BehaviorSubject<PaginationFilters & CommonFilters>({
    pageIndex: 0,
    pageSize: INITIAL_PAGINATION_STATE.size,
    search: '',
    sort: 'desc',
  });

  private router = inject(Router);
  service = inject(CompaniesApiService);
  stateService = inject(CompaniesStateService);
  displayedColumns: string[] = [
    'position',
    'name',
    'phone',
    'email',
    // 'description',
    // 'startTime',
    // 'endTime',
    // 'budget',
    'confirmed',

    'status',
    // 'visibility',
    // 'tags',
    'actions',
  ];

  openConfirmationDialog(element: Company) {
    this.dialog
      .open(NgoRegisterDialogComponent, {
        width: '500px',
        data: {
          element,
          isCompany: true,
        },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (!confirmed) {
          return;
        }

        this.service.confirm(element.id);
      });
  }

  showCompanyOnList(company: Company) {
    this.dialog.open(PlaceholderDialogComponent, {
      width: '500px',
      data: {
        component: CompanyCardComponent,
        inputs: {
          company,
          canSendMessage: false,
        },
      },
    });
    // this.router.navigateByUrl(`/companies?companyId=${id}`);
  }

  edit(company: Company) {
    this.dialog
      .open(ChangeStatusDialogComponent, {
        width: '500px',
        data: {
          disabled: company.disabled,
        } as ChangeStatusDialogData,
      })
      .afterClosed()
      .pipe(
        take(1),
        filter(Boolean),
        switchMap(status => {
          return this.service.update(company.id, status);
        })
      )
      .subscribe(() => {
        this.service.getAll(this.filters$$.value);
      });
  }

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
