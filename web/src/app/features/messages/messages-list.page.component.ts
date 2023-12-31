import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MessagesApiService } from './data-access/messages.api.service';
import { MessagesStateService } from './data-access/messages.state.service';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';
import { CommonFilters, CommonFiltersComponent } from 'src/app/shared/ui/common-filters.component';
import PaginationComponent from 'src/app/shared/ui/pagination.component';
import { BehaviorSubject } from 'rxjs';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { INITIAL_PAGINATION_STATE } from '../projects/data-access/projects.state.service';
import { LoadingComponent } from 'src/app/shared/ui/loading.component';
import { CenterDirective } from 'src/app/shared/center-directive.directive';

@Component({
  selector: 'app-messages.page',
  standalone: true,
  imports: [CommonModule, ListShellComponent, DatePipe, CommonFiltersComponent, PaginationComponent, LoadingComponent, CenterDirective],
  template: `
    <div appCenterDirective>
    <ng-container *ngIf="state() as state">
      <app-common-filters (filtersChanged)="onFiltersChanged($event)" />
      <app-list-shell class="flex flex-col grow" *ngIf="state.loadListCallState === 'LOADED'" listName="Wiadomości" [list]="state.list">
        <ng-template #item let-message>
          <div class="mb-4"><strong>Tytuł: </strong>{{ message.title }}</div>
          <div class="mb-4"><strong>Treść: </strong>{{ message.message }}</div>
          <div class="mb-4"><strong>Nadawca: </strong>{{ message.name }}</div>
          <div class="mb-4"><strong>Kontakt: </strong>{{ message.contact }}</div>
          <div><strong>Wysłano: </strong>{{ message.createdAt | date : 'short' }}</div>
        </ng-template>
      </app-list-shell>

      @if (state.loadListCallState === 'LOADING') {
      <app-loader text="Ładowanie wiadomości..."></app-loader>
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
export default class MessagesListPageComponent implements OnInit {
  service = inject(MessagesApiService);
  state = inject(MessagesStateService).$value;

  private destroyRef = inject(DestroyRef);
  private filters$$ = new BehaviorSubject<CommonFilters & PaginationFilters & { id?: string }>({
    pageIndex: 0,
    pageSize: INITIAL_PAGINATION_STATE.size,
    search: '',
    sort: 'desc',
  });

  ngOnInit(): void {
    this.filters$$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(filters => {
      this.service.getAll(filters);
    });
  }

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
}
