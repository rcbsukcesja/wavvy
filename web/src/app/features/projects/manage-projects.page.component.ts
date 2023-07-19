import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { map, filter } from 'rxjs';
import { RemoveDialogComponent } from 'src/app/shared/ui/common-remove-dialog.component';
import { ProjectsApiService } from './data-access/projects.api.service';
import { Project } from './model/project.model';
import { ProjectsStateService } from './data-access/projects.state.service';
import { Router } from '@angular/router';
import { ProjectStatusPipe } from './utils/project-status.pipe';

@Component({
  selector: 'app-manage-projects-page',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatDialogModule, NgIf, MatButtonModule, DatePipe, ProjectStatusPipe],
  template: `
    <header>
      <h2>Zarządzaj projektami</h2>
    </header>
    <button mat-raised-button color="primary" (click)="goToProjectForm()">Dodaj</button>

    <table *ngIf="dataSource() as data" mat-table [dataSource]="data" class="mat-elevation-z8">
      <ng-container matColumnDef="position">
        <th mat-header-cell *matHeaderCellDef>Lp</th>
        <td mat-cell *matCellDef="let element">{{ element.position }}</td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let element">{{ element.status.name | projectStatus }}</td>
      </ng-container>

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Nazwa</th>
        <td mat-cell *matCellDef="let element">{{ element.name }}</td>
      </ng-container>

      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef>Opis</th>
        <td mat-cell *matCellDef="let element">{{ element.description }}</td>
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
          <button (click)="goToProjectForm(element)"><mat-icon>edit</mat-icon></button>
          <button (click)="remove(element)"><mat-icon>delete</mat-icon></button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
})
export default class ManageProjectsPageComponent implements OnInit {
  private router = inject(Router);
  service = inject(ProjectsApiService);
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
      map(data =>
        data.list.map((offer, index) => ({
          position: index + 1,
          ...offer,
        }))
      )
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
    this.service.getAll();
  }

  goToProjectForm(project?: Project) {
    this.router.navigateByUrl(`/manage/projects/form${project ? `/${project.id}` : ''}`);
  }
}
