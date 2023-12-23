import { ChangeDetectionStrategy, Component, computed, inject, Input, OnInit } from '@angular/core';
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
import { map, Observable, shareReplay, take, tap } from 'rxjs';
import { ProjectsApiService } from '../projects/data-access/projects.api.service';
import { ProjectsStateService } from '../projects/data-access/projects.state.service';
import ProjectsListComponent from '../projects/projects-list.component';
import { BusinessArea } from './model/ngo.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthStateService } from 'src/app/auth/data_access/auth.state.service';

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
      <ng-container *ngIf="isAsideHidden$ | async; else desktopView">
        <div *ngIf="state.loadByIdCallState === 'LOADED' && state.details" class="flex flex-col gap-6">
          <aside class="flex flex-col">
            <div class="mb-4 h-10">
              <p class="font-semibold text-lg">{{ state.details.name }}</p>
            </div>
            <div class="flex flex-wrap justify-around  gap-x-10">
              <div class="flex flex-col ">
                <div class="mb-4 w-80 h-80 flex flex-col justify-center items-center flex-grow">
                  <img [src]="state.details.logoUrl || '/assets/images/placeholder.jpg'" />
                  <div class="h-10 w-full p-4 bg-green-500 text-white flex items-center">
                    {{ state.details.legalStatus | legalStatus }}
                  </div>
                </div>

                <div *ngIf="$isAuth()" class="gap-6 h-10 ">
                  <div
                    class="cursor-pointer flex items-center justify-end h-10 border-b-2 b2 border-solid border-black p-4 fit-content"
                    (click)="openMessageModal(state.details.id, state.details.name)">
                    <mat-icon>forward_to_inbox</mat-icon>
                    <p class="!m-0 !ml-3inline-block">Skontaktuj się z organizacją</p>
                  </div>
                </div>
              </div>
              <div class=" flex flex-col grow justify-self-start">
                <div class="mt-4">
                  <div>
                    <span class="block font-semibold">Tagi organizacji</span>
                    <ng-container *ngFor="let tag of state.details.tags; let last = last">
                      <span [class.pr-1]="!last">#{{ tag }}</span>
                    </ng-container>
                  </div>
                  @if (state.details.bankAccount) {
                    <div class="mt-4">
                      <span class="block font-semibold">Numer konta:</span>
                      {{ state.details.bankAccount }}
                    </div>
                  }
                  @if (state.details.krs) {
                    <div class="mt-4">
                      <span class="block font-semibold">KRS:</span>
                      {{ state.details.krs }}
                    </div>
                  }
                  @if (state.details.regon) {
                    <div class="mt-4">
                      <span class="block font-semibold">REGON:</span>
                      {{ state.details.regon }}
                    </div>
                  }
                  @if (state.details.nip) {
                    <div class="mt-4">
                      <span class="block font-semibold">NIP:</span>
                      {{ state.details.nip }}
                    </div>
                  }
                </div>
              </div>
            </div>
          </aside>
          <section class="flex flex-col gap-6">
            <div>
              <h3 class="!font-semibold">Opis organizacji:</h3>
              <p>{{ state.details.description }}</p>
            </div>
            <mat-divider />
            <div>
              <h3 class="!font-semibold">Obszary działania:</h3>
              <ul class="flex flex-col gap-2 mt-4">
                <li *ngFor="let area of state.details.businessAreas">- {{ area.name }}</li>
              </ul>
            </div>
            <mat-divider />

            <div>
              <h3 class="!font-semibold">Zasoby:</h3>
              <ul class="flex flex-col gap-2 mt-4">
                <li *ngFor="let resource of state.details.resources">- {{ resource }}</li>
              </ul>
            </div>
            <mat-divider />
            <div>
              <h3>Dane kontakowe:</h3>
              <div class="overflow-x-auto min-w-full p-2">
                <table>
                  <tbody class="[&>*]:h-12">
                    <tr>
                      <th>
                        <div class="flex justify-center items-center"><mat-icon> place</mat-icon></div>
                      </th>
                      <th class="text-left">Adres:</th>
                      <th class="text-left font-normal pl-2">
                        {{ state.details.address?.street }}, {{ state.details.address?.zipCode }}
                        {{ state.details.address?.city }}
                      </th>
                    </tr>

                    <tr>
                      <th>
                        <div class="flex justify-center items-center"><mat-icon> phone</mat-icon></div>
                      </th>
                      <th class="text-left">Telefon:</th>
                      <th class="text-left font-normal pl-2">{{ state.details.phone }}</th>
                    </tr>

                    <tr>
                      <th>
                        <div class="flex justify-center items-center"><mat-icon> mail</mat-icon></div>
                      </th>
                      <th class="text-left">E-mail:</th>
                      <th class="text-left font-normal pl-2">{{ state.details.email }}</th>
                    </tr>

                    <tr>
                      <th>
                        <div class="flex justify-center items-center"><mat-icon> language</mat-icon></div>
                      </th>
                      <th class="text-left">Strona internetowa:</th>
                      <th class="text-left font-normal pl-2">
                        <a [href]="state.details.website" target="_blank">{{ state.details.website }}</a>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
        <p *ngIf="state.loadListCallState === 'LOADING'">Ładowanie...</p>
        <div *ngIf="projectsState() as projectState" class="mt-8">
          <app-projects-list
            *ngIf="projectState.loadListCallState === 'LOADED'"
            [projects]="projectState.list.slice(0, 3)" />

          @if (projectState.loadListCallState === 'LOADED' && !projectState.list.length) {
            <p>{{ state.details?.name }} nie prowadzi w tej chwili żadnych projektów</p>
          }

          <p *ngIf="projectState.loadListCallState === 'LOADING'">Ładowanie...</p>
        </div>
      </ng-container>

      <ng-template #desktopView>
        <div *ngIf="state.loadByIdCallState === 'LOADED' && state.details" class="flex gap-6">
          <aside>
            <div class="mb-4 h-10">
              <p class="font-semibold text-lg">{{ state.details.name }}</p>
            </div>
            <div class="mb-4 relative h-80 w-80">
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img [src]="state.details.logoUrl || '/assets/images/placeholder.jpg'" />
              </div>
              <div class="absolute bottom-0 left-0 w-full h-10 p-4 bg-green-500 text-white flex items-center">
                {{ state.details.legalStatus | legalStatus }}
              </div>
            </div>
            <div *ngIf="$isAuth()" class="flex gap-6 items-center">
              <div
                class="cursor-pointer flex items-center"
                (click)="openMessageModal(state.details.id, state.details.name)">
                <mat-icon>forward_to_inbox</mat-icon>
                <p class="!m-0 !ml-3 inline-block">Skontaktuj się z organizacją</p>
              </div>
            </div>
            <div class="mt-4">
              <div>
                <span class="block font-semibold">Tagi organizacji</span>
                <ng-container *ngFor="let tag of state.details.tags; let last = last">
                  <span [class.pr-1]="!last">#{{ tag }}</span>
                </ng-container>
              </div>
              @if (state.details.bankAccount) {
                <div class="mt-4">
                  <span class="block font-semibold">Numer konta:</span>
                  {{ state.details.bankAccount }}
                </div>
              }
              @if (state.details.krs) {
                <div class="mt-4">
                  <span class="block font-semibold">KRS:</span>
                  {{ state.details.krs }}
                </div>
              }
              @if (state.details.regon) {
                <div class="mt-4">
                  <span class="block font-semibold">REGON:</span>
                  {{ state.details.regon }}
                </div>
              }
              @if (state.details.nip) {
                <div class="mt-4">
                  <span class="block font-semibold">NIP:</span>
                  {{ state.details.nip }}
                </div>
              }
            </div>
          </aside>
          <section class="flex flex-col gap-6">
            <div>
              <h3 class="!font-semibold">Opis organizacji:</h3>
              <p>{{ state.details.description }}</p>
            </div>
            <mat-divider />
            <div>
              <h3 class="!font-semibold">Obszary działania:</h3>
              <ul class="flex flex-col gap-2 mt-4">
                <li *ngFor="let area of state.details.businessAreas">- {{ area.name }}</li>
              </ul>
            </div>
            <mat-divider />
            <div>
              <h3 class="!font-semibold">Zasoby:</h3>
              <ul class="flex flex-col gap-2 mt-4">
                <li *ngFor="let resource of state.details.resources">- {{ resource }}</li>
              </ul>
            </div>
            <mat-divider />
            <div>
              <h3>Dane kontakowe:</h3>
              <ul class="flex gap-6 mt-4 flex-wrap">
                <div>
                  <li class="flex items-center gap-2 mb-4">
                    <div><mat-icon> place</mat-icon></div>
                    <strong>Adres: </strong>{{ state.details.address?.street }}, {{ state.details.address?.zipCode }}
                    {{ state.details.address?.city }}
                  </li>
                  <li class="flex items-center gap-2">
                    <div><mat-icon> phone</mat-icon></div>
                    <strong>Telefon: </strong>{{ state.details.phone }}
                  </li>
                </div>
                <div>
                  <li class="flex items-center gap-2 mb-4">
                    <div><mat-icon> mail</mat-icon></div>
                    <strong>E-mail: </strong>{{ state.details.email }}
                  </li>
                  <li class="flex items-center gap-2">
                    <div><mat-icon> language</mat-icon></div>
                    <strong class="whitespace-nowrap">Strona internetowa: </strong
                    ><a [href]="state.details.website" target="_blank"
                      ><span class="break-all">{{ state.details.website }}</span></a
                    >
                  </li>
                </div>
              </ul>
            </div>
          </section>
        </div>
        <p *ngIf="state.loadListCallState === 'LOADING'">Ładowanie...</p>
        <div *ngIf="projectsState() as projectState" class="mt-8">
          <app-projects-list
            *ngIf="projectState.loadListCallState === 'LOADED'"
            [projects]="projectState.list.slice(0, 3)" />
          @if (projectState.loadListCallState === 'LOADED' && !projectState.list.length) {
            <p>{{ state.details?.name }} nie prowadzi w tej chwili żadnych projektów</p>
          }
          <p *ngIf="projectState.loadListCallState === 'LOADING'">Ładowanie...</p>
        </div>
      </ng-template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NgoDetailsPageComponent implements OnInit {
  @Input({ required: true }) bussinessAreas!: BusinessArea[];

  private breakpointObserver = inject(BreakpointObserver);
  private $authState = inject(AuthStateService).$value;
  public $isAuth = computed(() => this.$authState().status === 'AUTHENTICATED');

  snackbar = inject(MatSnackBar);
  route = inject(ActivatedRoute);
  messagesService = inject(MessagesApiService);

  service = inject(NGOsApiService);
  state = inject(NGOsStateService).$value;
  projectsService = inject(ProjectsApiService);
  projectsState = inject(ProjectsStateService).$value;
  dialog = inject(MatDialog);

  isAsideHidden$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.service.getById(id);
  }

  getBusinessArea(id: string) {
    return this.bussinessAreas.find(ba => ba.id === id)?.name;
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
            this.messagesService.send({ ...value, organizationId: id });
          }
        }),
        take(1)
      )
      .subscribe();
  }
}
