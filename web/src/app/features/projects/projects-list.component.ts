import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent, MessageDialogFormValue } from 'src/app/shared/ui/common-message-dialog.component';
import { tap, take } from 'rxjs';
import { MessagesApiService } from '../messages/data-access/messages.api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProjectStatusPipe } from './utils/project-status.pipe';
import { Project } from './model/project.model';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [
    CommonModule,
    ListShellComponent,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    DatePipe,
    ProjectStatusPipe,
  ],
  template: `
    <app-list-shell listName="Projekty" [list]="projects">
      <div #filters class="mb-2">
        <div class="ml-auto">
          <label> Sortuj:</label>
          <select>
            <option>od najnowszych</option>
            <option>od najstarszych</option>
          </select>
        </div>
      </div>
      <ng-template #item let-project>
        <div class="">
          <div>
            <mat-icon class="text-red-600 ml-auto">favorite</mat-icon>
          </div>
          <div class="relative">
            <div class="absolute bg-black text-white right-0 text-sm px-1 py-2">{{ project.startTime | date }}</div>
            <img [src]="project.imageLink" />
            <div class="absolute bottom-0 left-0 w-full h-10 p-4 bg-green-500 text-white flex items-center">
              {{ project.ngo }}
            </div>
          </div>
          <div class="rounded-md w-fit px-2 mt-4 mb-2 bg-green-400 text-green-900">
            {{ project.status?.name | projectStatus }}
          </div>
          <p class="font-semibold text-lg">{{ project.name }}</p>
          <div class="mb-2">
            <span *ngFor="let tag of project.tags; let last = last">#{{ tag }} </span>
          </div>
          <mat-divider />
          <div class="flex justify-between mt-4 items-center">
            <div *ngIf="project.budget" class="flex flex-col items-center">
              <span class="text-xs"> Budżet</span><mat-icon>paid</mat-icon>
              <span class="text-xs">{{ project.budget }}</span>
            </div>
            <div *ngIf="project.possibleVolunteer" class="flex flex-col items-center">
              <span class="text-xs"> Szukamy</span>

              <mat-icon>accessibility new</mat-icon>
              <span class="text-xs">wolontariuszy</span>
            </div>
            <div *ngIf="project.cooperationMessage" class="flex flex-col">
              <mat-icon [matTooltip]="project.cooperationMessage">spatial_audio_off</mat-icon>
            </div>
            <div class="flex flex-col" (click)="openMessageModal(project.id, project.name)">
              <mat-icon>forward_to_inbox</mat-icon>
            </div>
          </div>
        </div>
      </ng-template>
    </app-list-shell>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsListComponent {
  @Input() projects!: Project[];
  snackbar = inject(MatSnackBar);
  messagesService = inject(MessagesApiService);
  dialog = inject(MatDialog);

  openMessageModal(id: string, name: string) {
    this.dialog
      .open(MessageDialogComponent, {
        width: '500px',
        data: {
          name,
          connector: 'odnośnie projektu',
        },
      })
      .afterClosed()
      .pipe(
        tap((value: MessageDialogFormValue) => {
          if (value) {
            this.snackbar.open('Wiadomość została wysłana!', '', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
            });
            this.messagesService.send({ ...value, receiverId: id, receiverType: 'ngo' });
          }
        }),
        take(1)
      )
      .subscribe();
  }
}
