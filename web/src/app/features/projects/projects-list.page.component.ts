import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsApiService } from './data-access/projects.api.service';
import { ProjectsStateService } from './data-access/projects.state.service';
import ProjectsListComponent from './projects-list.component';
import { CommonFilters, CommonFiltersComponent } from 'src/app/shared/ui/common-filters.component';

@Component({
  selector: 'app-projects.page',
  standalone: true,
  template: `
    <ng-container *ngIf="state() as state">
      <app-common-filters (filtersChanged)="onFiltersChanged($event)" />
      <app-projects-list *ngIf="state.loadListCallState === 'LOADED'" [projects]="state.list" />

      <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ProjectsListComponent, CommonFiltersComponent],
})
export default class ProjectsListPageComponent implements OnInit {
  service = inject(ProjectsApiService);
  state = inject(ProjectsStateService).$value;

  ngOnInit(): void {
    this.service.getAll();
  }

  onFiltersChanged(filters: CommonFilters) {
    this.service.getAll(filters);
  }
}
