import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsApiService } from './data-access/projects.api.service';
import { ProjectsStateService } from './data-access/projects.state.service';
import ProjectsListComponent from './projects-list.component';

@Component({
  selector: 'app-projects.page',
  standalone: true,
  imports: [CommonModule, ProjectsListComponent],
  template: `
    <ng-container *ngIf="state() as state">
      <app-projects-list *ngIf="state.loadListCallState === 'LOADED'" [projects]="state.list" />

      <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsListPageComponent implements OnInit {
  service = inject(ProjectsApiService);
  state = inject(ProjectsStateService).$value;

  ngOnInit(): void {
    this.service.getAll();
  }
}
