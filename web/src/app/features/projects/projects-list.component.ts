import { ChangeDetectionStrategy, Component, computed, inject, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent, MessageDialogFormValue } from 'src/app/shared/ui/common-message-dialog.component';
import { tap, take } from 'rxjs';
import { MessagesApiService } from '../messages/data-access/messages.api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProjectStatusPipe } from './utils/project-status.pipe';
import { Project } from './model/project.model';
import { ID } from 'src/app/core/types/id.type';
import { AuthStateService } from 'src/app/auth/data_access/auth.state.service';
import { RouterLink } from '@angular/router';
import { NGOsStateService } from '../ngo/data-access/ngos.state.service';
import { ProjectCardComponent } from './ui/project-card.component';

@Component({
  standalone: true,
  imports: [MatDividerModule, MatDialogModule],
  template: `
    <h1 mat-dialog-title>{{ data.name }}</h1>
    <div mat-dialog-content>
      <mat-divider />
      {{ data.description }}
    </div>
  `,
})
export class DescriptionDialogComponent {
  data = inject(MAT_DIALOG_DATA);
}

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
    RouterLink,
    MatIconModule,
  ],
  template: `
    <app-list-shell listName="Projekty" [list]="projects">
      <ng-template #item let-project>
        <div class="">
          <div
            class="relative h-80 bg-cover"
            [style.background-image]="'url(' + (project.imageLink || '/assets/images/placeholder.jpg') + ')'">
            @if (project.disabled && $ngoId() === project.ngoId) {
            <div class="absolute left-2 top-2 text-red-600 " [matTooltip]="'Powód blokady: ' + project.reason">
              <mat-icon>warning</mat-icon>
            </div>
            }
            <div class="absolute bg-black text-white right-0  text-xs px-1 py-2 flex items-center">
              <mat-icon class="mr-2">schedule</mat-icon> <span>{{ project.startTime | date }}</span>
              <span *ngIf="project.startTime !== project.endTime" class="pl-1">- {{ project.endTime | date }}</span>
            </div>
          </div>
          <div class="bottom-0 left-0 w-full h-10 p-4 bg-green-500 text-white flex items-center">
            <a [routerLink]="'/ngos/' + project.ngoId">{{ project.ngo }}</a>
          </div>
          <div class="rounded-md w-fit px-2 mt-4 mb-2 bg-green-400 text-green-900">
            {{ project.status | projectStatus }}
          </div>
          <p class="font-semibold text-lg">{{ project.name }}</p>
          <p class="line-clamp-3">{{ project.description }}</p>
          <button
            (click)="openDescriptionDialog(project.name, project.description)"
            class="ml-auto block -mt-1 mb-2 bg-black text-white px-2 py-1 rounded-md hover:bg-opacity-70 transition">
            Pełny opis
          </button>
          <p *ngIf="project.link">
            <span class="font-semibold">Więcej informacji: </span>
            <a class="underline" [href]="project.link" target="_blank">{{ project.link }}</a>
          </p>
          <div class="mb-2">
            <span *ngFor="let tag of project.tags; let last = last">#{{ tag }} </span>
          </div>
          <mat-divider />
          <div class="flex justify-between mt-4 items-center">
            <div *ngIf="project.budget && isAuth()" class="flex flex-col items-center">
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
            <div class="flex flex-col" (click)="openMessageModal(project.ngoId, project.name)">
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
  private authState = inject(AuthStateService).$value;
  private profileState = inject(NGOsStateService).$value;

  $ngoId = computed(() => this.profileState().profile?.id);

  protected isAuth = computed(() => this.authState().status === 'AUTHENTICATED');

  @Input() projects!: Project[];
  snackbar = inject(MatSnackBar);
  messagesService = inject(MessagesApiService);
  dialog = inject(MatDialog);

  openDescriptionDialog(name: string, description: string) {
    this.dialog.open(DescriptionDialogComponent, {
      data: { name, description },
    });
  }

  openMessageModal(id: ID, name: string) {
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
            this.messagesService.send({ ...value, receiverId: id });
          }
        }),
        take(1)
      )
      .subscribe();
  }
}
