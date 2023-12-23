import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ID } from 'src/app/core/types/id.type';
import { tap, take } from 'rxjs';
import { MessageDialogComponent, MessageDialogFormValue } from 'src/app/shared/ui/common-message-dialog.component';
import { DescriptionDialogComponent, IsOwnProjectPipe, SameDayPipe } from '../projects-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ProjectStatusPipe } from '../utils/project-status.pipe';
import { Project } from '../model/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div
        class="relative h-80 bg-cover"
        [style.background-image]="'url(' + (project.imageLink || '/assets/images/placeholder.jpg') + ')'">
        @if (project.disabled && currentUserId === project.organizer.id) {
        <div class="absolute left-2 top-2 text-red-600 " [matTooltip]="'Powód blokady: ' + project.reason">
          <mat-icon>warning</mat-icon>
        </div>
        }
        <div class="absolute bg-black text-white right-0  text-xs px-1 py-2 flex items-center">
          <mat-icon class="mr-2">schedule</mat-icon> <span>{{ project.startTime | date }}</span>
          @if (!(project.startTime | sameDay: project.endTime)) {
          <span class="pl-1">- {{ project.endTime | date }}</span>
          } @else {
          <span class="pl-1">| {{ project.startTime | date : 'HH:mm' }}</span>
          }
        </div>
      </div>
      <div class="bottom-0 left-0 w-full h-10 p-4 bg-material-blue text-white flex items-center">
        <a [routerLink]="'/ngos/' + project.organizer.id">{{ project.organizer.name }}</a>
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
      <p *ngIf="project.links[0]" class="text-ellipsis overflow-hidden">
        <span class="font-semibold">Więcej informacji: </span>
        <a class="underline" [href]="project.links[0]" target="_blank">{{ project.links[0] }}</a>
      </p>
      <div class="mb-2">
        <span *ngFor="let tag of project.tags; let last = last">#{{ tag }} </span>
      </div>
      <mat-divider />
      <div class="flex justify-between mt-4 items-center">
        <div *ngIf="project.budget && showBudget" class="flex flex-col items-center">
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
        <div class="flex flex-col cursor-pointer" (click)="openMessageModal(project.organizer.id, project.name)">
          <mat-icon
            [matTooltip]="
              !(project.organizer.id | isOwnProject)
                ? 'Wyślij wiadomość do organizacji prowadzącą projekt'
                : 'To twoja własna organizacja, nie ma co wysyłać wiadomości do siebie 😉'
            "
            [class.text-gray-400]="project.organizer.id | isOwnProject"
            >forward_to_inbox</mat-icon
          >
        </div>
      </div>
    </div>
  `,
  imports: [
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    RouterLink,
    DatePipe,
    ProjectStatusPipe,
    NgIf,
    NgFor,
    IsOwnProjectPipe,
    SameDayPipe,
  ],
})
export class ProjectCardComponent {
  dialog = inject(MatDialog);

  @Input({ required: true }) project!: Project;
  @Input() canSendMessage = true;
  @Input() currentUserId?: ID;
  @Input() showBudget = false;
  @Output() message = new EventEmitter<MessageDialogFormValue>();

  private pipe = new IsOwnProjectPipe();

  openDescriptionDialog(name: string, description: string) {
    this.dialog.open(DescriptionDialogComponent, {
      data: { name, description },
    });
  }

  openMessageModal(organizerId: string, name: string) {
    if (this.pipe.transform(organizerId)) {
      return;
    }

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
            this.message.emit(value);
          }
        }),
        take(1)
      )
      .subscribe();
  }
}
