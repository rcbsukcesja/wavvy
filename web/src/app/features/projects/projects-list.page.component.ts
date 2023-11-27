import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsApiService } from './data-access/projects.api.service';
import { INITIAL_PAGINATION_STATE, ProjectsStateService } from './data-access/projects.state.service';
import ProjectsListComponent from './projects-list.component';
import { CommonFilters, CommonFiltersComponent } from 'src/app/shared/ui/common-filters.component';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import PaginationComponent from 'src/app/shared/ui/pagination.component';

@Component({
  selector: 'app-projects.page',
  standalone: true,
  template: `
    <ng-container *ngIf="state() as state">
      <app-common-filters (filtersChanged)="onFiltersChanged($event)" />
      <app-projects-list *ngIf="state.loadListCallState === 'LOADED'" [projects]="state.list" />
      <app-pagination [totalElements]="state.totalElements" (paginationChange)="handlePageEvent($event)" />
      <p *ngIf="state.loadListCallState === 'LOADING'">Ładowanie...</p>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ProjectsListComponent, CommonFiltersComponent, PaginationComponent],
})
export default class ProjectsListPageComponent implements OnInit {
  @Input() projectId?: string;

  private destroyRef = inject(DestroyRef);
  private filters$$ = new BehaviorSubject<CommonFilters & PaginationFilters & { id?: string }>({
    pageIndex: 0,
    pageSize: INITIAL_PAGINATION_STATE.size,
    search: '',
    sort: 'desc',
  });

  service = inject(ProjectsApiService);
  state = inject(ProjectsStateService).$value;

  ngOnInit(): void {
    this.filters$$.next({ ...this.filters$$.value, id: this.projectId });
    this.filters$$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(filters => {
      this.service.getAll(filters);
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
