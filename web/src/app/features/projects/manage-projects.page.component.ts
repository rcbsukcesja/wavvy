import { DatePipe, JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { map, filter, BehaviorSubject, switchMap, take } from 'rxjs';
import { RemoveDialogComponent } from 'src/app/shared/ui/common-remove-dialog.component';
import { ProjectsApiService } from './data-access/projects.api.service';
import { Project } from './model/project.model';
import { INITIAL_PAGINATION_STATE, ProjectsStateService } from './data-access/projects.state.service';
import { Router } from '@angular/router';
import { ProjectStatusPipe } from './utils/project-status.pipe';
import { NGOsStateService } from '../ngo/data-access/ngos.state.service';
import PaginationComponent from 'src/app/shared/ui/pagination.component';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { CommonFilters, CommonFiltersComponent } from 'src/app/shared/ui/common-filters.component';
import { UserRoles, USER_ROLES } from 'src/app/core/user-roles.enum';
import {
  ChangeStatusDialogComponent,
  ChangeStatusDialogData,
  DisableFormValue,
} from '../ngo/ui/change-ngo-status.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ID } from 'src/app/core/types/id.type';
import { PlaceholderDialogComponent } from 'src/app/shared/ui/dialogs/placeholder-dialog.component';
import { ProjectCardComponent } from './ui/project-card.component';
import { LoadingComponent } from 'src/app/shared/ui/loading.component';
import { CenterDirective } from 'src/app/shared/center-directive.directive';
import { InfoDialogComponent, InfoDialogData } from 'src/app/shared/ui/dialogs/info-dialog.component';

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
    NgClass,
    MatTooltipModule,
    JsonPipe,
    LoadingComponent,
    CenterDirective,
  ],
  template: `
    <div appCenterDirective>
      <header>
        <h2>Zarządzaj projektami</h2>
      </header>
      <button
        [disabled]="profileState().profile?.disabled"
        *ngIf="role !== ADMIN_ROLE"
        class="mb-4"
        mat-raised-button
        color="primary"
        (click)="goToProjectForm()">
        Dodaj nowy projekt
      </button>
      <br />
      <app-common-filters (filtersChanged)="onFiltersChanged($event)" />

      @if (role === NGO_ROLE) {
        <p class="text-sm border p-2">
          Klikając w ikonę <mat-icon class="align-middle">image</mat-icon> możesz dodać obrazek do wybranego projektu.
          Akceptowalne rozszerzenia pliku to <strong>jpg, jpeg lub png</strong>. Dodatkowo obrazek może mieć
          <strong>maksymalny rozmiar 1 MB</strong>
        </p>
      }
      <ng-container *ngIf="dataSource() as data">
        @if (data.loadListCallState === 'LOADING') {
          <app-loader text="Ładowanie projektów..."></app-loader>
        } @else {
          <div class="min-w-full overflow-x-auto">
            <table mat-table [dataSource]="data.list" class="mat-elevation-z8">
              <ng-container matColumnDef="position">
                <th mat-header-cell *matHeaderCellDef>Lp</th>
                <td mat-cell *matCellDef="let element">{{ element.position + data.positionModifier }}</td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Etap</th>
                <td mat-cell *matCellDef="let element">
                  <div class="flex items-center">
                    {{ element.status | projectStatus }}
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="disabledStatus">
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
                    <button [matTooltip]="'Pokaż projekt'" (click)="showProjectOnList(element)">
                      <mat-icon>preview</mat-icon>
                    </button>
                    <button
                      *ngIf="role !== ADMIN_ROLE"
                      [matTooltip]="'Edytuj projekt'"
                      (click)="goToProjectForm(element)">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <ng-container *ngIf="role !== ADMIN_ROLE">
                      <input #input type="file" class="w-0 absolute" (change)="handleChange($event, element.id)" />
                      <button
                        [matTooltip]="'Nie dodałeś logo projektu, przez co korzysta od z domyślnego placeholdera'"
                        [matTooltipDisabled]="!!element.imageLink"
                        (click)="input.click()"
                        [ngClass]="!!element.imageLink ? 'text-green-500' : 'text-red-500'">
                        <mat-icon>image</mat-icon>
                      </button>
                    </ng-container>
                    <button [matTooltip]="'Zmień status'" *ngIf="role === ADMIN_ROLE" (click)="changeStatus(element)">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button [matTooltip]="'Usuń projekt'" *ngIf="role !== ADMIN_ROLE" (click)="remove(element)">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>
          </div>

          @if (!data.list.length) {
            <p class="!mt-4">Nie stworzyłeś jeszcze żadnego projektu</p>
          }
        }
      </ng-container>
    </div>
    @if (dataSource(); as data) {
      <app-pagination [totalElements]="data.totalElements" (paginationChange)="handlePageEvent($event)" />
    }
  `,
})
export default class ManageProjectsPageComponent implements OnInit {
  @Input() role?: UserRoles;

  private router = inject(Router);
  service = inject(ProjectsApiService);
  ngoService = inject(NGOsStateService);
  stateService = inject(ProjectsStateService);

  displayedColumns: string[] = [
    'position',
    'name',
    'startTime',
    'endTime',
    'budget',
    'status',
    'disabledStatus',
    'tags',
    'actions',
  ];

  profileState = this.ngoService.$value;

  $ngoId = computed(() => this.profileState().profile?.id);

  ADMIN_ROLE = USER_ROLES.ADMIN;
  NGO_ROLE = USER_ROLES.NGO_USER;

  private filters$$ = new BehaviorSubject<PaginationFilters & CommonFilters>({
    pageIndex: 0,
    pageSize: INITIAL_PAGINATION_STATE.size,
    search: '',
    sort: 'desc',
  });

  handleChange(e: Event, projectId: ID) {
    const input = e.target as HTMLInputElement;
    if (!input.files) {
      alert('Nie załadowano zdjęcia');

      return;
    }

    const logoFile = input.files[0];

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!validTypes.includes(logoFile.type)) {
      this.dialog.open<InfoDialogComponent, InfoDialogData>(InfoDialogComponent, {
        data: {
          message: 'Obrazek może mieć rozszerzenie png, jpg lub jpeg. Sprawdź, jakiego typu obrazek chcesz dodać',
          title: 'Błąd rozszerzenia dodawanego obrazka',
        },
      });

      return;
    }

    if (logoFile.size > 1 * 1024 * 1024) {
      this.dialog.open<InfoDialogComponent, InfoDialogData>(InfoDialogComponent, {
        data: {
          message:
            'Obrazek może mieć maksymalnie rozmiar 1 MB. Sprawdź rozmiar swojego obrazka, może konieczna będzie kompresja',
          title: 'Błąd rozmiaru dodawanego obrazka',
        },
      });

      return;
    }

    this.service.uploadProjectImage(input.files[0], projectId);
  }

  showProjectOnList(project: Project) {
    this.dialog.open(PlaceholderDialogComponent, {
      width: '500px',
      data: {
        component: ProjectCardComponent,
        inputs: {
          project,
          showBudget: true,
          currentUserId: this.$ngoId(),
          canSendMessage: false,
        },
      },
    });
  }

  changeStatus(project: Project) {
    this.dialog
      .open(ChangeStatusDialogComponent, {
        width: '500px',
        data: {
          disabled: project.disabled,
        } as ChangeStatusDialogData,
      })
      .afterClosed()
      .pipe(take(1), filter(Boolean))
      .subscribe((state: DisableFormValue) => {
        if (state === undefined) {
          return;
        }

        this.service.update(project.id, { disabled: state.disabled, reason: state.reason }, this.filters$$.value);
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
        this.service.delete(project.id);
      });
  }

  ngOnInit() {
    this.filters$$.subscribe(filters => {
      if (this.role === USER_ROLES.ADMIN) {
        this.service.getAll(filters);
      } else {
        this.service.getAllMine(filters);
      }
    });
  }

  goToProjectForm(project?: Project) {
    if (this.profileState().profile?.disabled) {
      return;
    }
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
