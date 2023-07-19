import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGOsApiService } from './data-access/ngos.api.service';
import { NGOsStateService } from './data-access/ngos.state.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MessagesApiService } from '../messages/data-access/messages.api.service';
import { LegalStatusPipe } from './utils/legal-status.pipe';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageDialogComponent, MessageDialogFormValue } from 'src/app/shared/ui/common-message-dialog.component';
import { take, tap } from 'rxjs';
import { ProjectsApiService } from '../projects/data-access/projects.api.service';
import { ProjectsStateService } from '../projects/data-access/projects.state.service';
import ProjectsListComponent from '../projects/projects-list.component';

@Component({
  selector: 'app-ngo-details-page',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    LegalStatusPipe,
    MatDialogModule,
    MatSnackBarModule,
    MatDividerModule,
    ProjectsListComponent,
  ],
  template: `
    <ng-container *ngIf="state() as state">
      <div *ngIf="state.loadListCallState === 'LOADED' && state.details" class="flex gap-6">
        <aside>
          <div class="mb-4 h-10">
            <p class="font-semibold text-lg">{{ state.details.name }}</p>
          </div>
          <div class="mb-4 relative h-80 w-80">
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img [src]="state.details.logo" />
            </div>
            <div class="absolute bottom-0 left-0 w-full h-10 p-4 bg-green-500 text-white flex items-center">
              {{ state.details.legalStatus | legalStatus }}
            </div>
          </div>
          <div class="flex gap-6 items-center">
            <div
              class="cursor-pointer flex items-center"
              (click)="openMessageModal(state.details.id, state.details.name)">
              <mat-icon>forward_to_inbox</mat-icon>
              <p class="!m-0 !ml-3 inline-block">Napisz do nas</p>
            </div>
            <div class="w-8 h-8 cursor-pointer flex items-center">
              <img src="assets/images/blik-logo.jpeg" alt="My Image" />
              <p class="!m-0 !ml-3 inline-block">Wesprzyj</p>
            </div>
          </div>
        </aside>
        <section class="flex flex-col gap-6">
          <div>
            <h3>Opis organizacji:</h3>
            <p>{{ state.details.description }}</p>
          </div>
          <mat-divider />
          <div>
            <h3>Obszary działania:</h3>
            <ul class="flex flex-col gap-2 mt-4">
              <li *ngFor="let area of state.details.businnessAreas">- {{ area.name }}</li>
            </ul>
          </div>
          <mat-divider />
          <div>
            <h3>Członkowie:</h3>
            <ul class="flex flex-col gap-2 mt-4">
              <p *ngIf="!state.details.owners.length">Brak przypisanych użytkowników</p>
              <ng-container *ngIf="state.details.owners.length">
                <li *ngFor="let owner of state.details.owners">
                  -
                  {{ owner.firstName + ' ' + owner.lastName + ', email: ' + owner.email + ', rola: ' + owner.userType }}
                </li>
              </ng-container>
            </ul>
          </div>
          <mat-divider />
          <div>
            <h3>Zasoby:</h3>
            <ul class="flex flex-col gap-2 mt-4">
              <li *ngFor="let resource of state.details.resources">- {{ resource }}</li>
            </ul>
          </div>
          <mat-divider />
          <div>
            <h3>Dane kontakowe:</h3>
            <ul class="flex gap-6 mt-4">
              <div>
                <li class="flex items-center gap-2 mb-4">
                  <mat-icon> place</mat-icon> <strong>Adres: </strong>{{ state.details.address }}
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon> phone</mat-icon> <strong>Telefon: </strong>{{ state.details.phone }}
                </li>
              </div>
              <div>
                <li class="flex items-center gap-2 mb-4">
                  <mat-icon> mail</mat-icon> <strong>E-mail: </strong>{{ state.details.email }}
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon> language</mat-icon> <strong>Strona internetowa: </strong>{{ state.details.website }}
                </li>
              </div>
            </ul>
          </div>
        </section>
      </div>
      <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
      <div *ngIf="projectsState() as state" class="mt-8">
        <app-projects-list *ngIf="state.loadListByNGOIdCallState === 'LOADED'" [projects]="state.listByNGOId" />

        <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NgoDetailsPageComponent implements OnInit {
  snackbar = inject(MatSnackBar);
  route = inject(ActivatedRoute);
  messagesService = inject(MessagesApiService);

  service = inject(NGOsApiService);
  state = inject(NGOsStateService).$value;
  projectsService = inject(ProjectsApiService);
  projectsState = inject(ProjectsStateService).$value;
  dialog = inject(MatDialog);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.service.getById(id);
    this.projectsService.getByNGOId(id);
  }

  openMessageModal(id: string, name: string) {
    this.dialog
      .open(MessageDialogComponent, {
        width: '500px',
        data: {
          name,
          connector: 'do organizacji:',
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
