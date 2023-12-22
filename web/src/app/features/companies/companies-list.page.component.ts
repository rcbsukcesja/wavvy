import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesApiService } from './data-access/companies.api.service';
import { CompaniesStateService } from './data-access/companies.state.service';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessagesApiService } from '../messages/data-access/messages.api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogFormValue } from 'src/app/shared/ui/common-message-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { ID } from 'src/app/core/types/id.type';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonFilters, CommonFiltersComponent } from 'src/app/shared/ui/common-filters.component';
import PaginationComponent from 'src/app/shared/ui/pagination.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { CompanyCardComponent } from './ui/company-card.component';
import { INITIAL_PAGINATION_STATE } from '../projects/data-access/projects.state.service';
import { LoadingComponent } from 'src/app/shared/ui/loading.component';

@Component({
  selector: 'app-companies.page',
  standalone: true,
  imports: [
    CommonFiltersComponent,
    PaginationComponent,
    MatTooltipModule,
    CommonModule,
    ListShellComponent,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    CompanyCardComponent,
    LoadingComponent,
  ],
  template: `
  <div class="flex flex-col min-h-[calc(100vh-152px)]">
    <ng-container *ngIf="state() as state">
      <app-common-filters [hideSort]="true" (filtersChanged)="onFiltersChanged($event)" />

      <app-list-shell class="flex flex-col grow" *ngIf="state.loadListCallState === 'LOADED'" listName="MŚP" [list]="state.list">
        <ng-template #item let-company>
          <app-company-card [company]="company" (message)="sendMessage($event, company.id)" />
        </ng-template>
      </app-list-shell>
      @if (state.loadListCallState === 'LOADING') {
      <app-loader text="Ładowanie firm..."></app-loader>
      }
    </ng-container>
    </div>
    @if (state(); as state) {
    <app-pagination [totalElements]="state.totalElements" (paginationChange)="handlePageEvent($event)" />
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CompaniesListPageComponent implements OnInit {
  @Input() companyId?: string;
  snackbar = inject(MatSnackBar);
  messagesService = inject(MessagesApiService);
  dialog = inject(MatDialog);

  service = inject(CompaniesApiService);
  state = inject(CompaniesStateService).$value;

  ngOnInit(): void {
    this.filters$$.next({ ...this.filters$$.value, id: this.companyId });
    this.filters$$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(filters => {
      this.service.getAll(filters);
    });
  }

  private destroyRef = inject(DestroyRef);

  private filters$$ = new BehaviorSubject<CommonFilters & PaginationFilters & { id?: string }>({
    pageIndex: 0,
    pageSize: INITIAL_PAGINATION_STATE.size,
    search: '',
    sort: 'desc',
  });

  onFiltersChanged(filters: CommonFilters) {
    this.filters$$.next({
      ...this.filters$$.value,
      ...filters,
    });
  }

  handlePageEvent(e: { pageSize: number; pageIndex: number }) {
    this.filters$$.next({
      ...this.filters$$.value,
      pageIndex: e.pageIndex,
      pageSize: e.pageSize,
    });
  }

  sendMessage(message: MessageDialogFormValue, organizationId: ID) {
    this.snackbar.open('Wiadomość została wysłana!', '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
    this.messagesService.send({ ...message, organizationId });
  }
}
