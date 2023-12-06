import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';
import { NGOsApiService } from './data-access/ngos.api.service';
import { NGOsStateService } from './data-access/ngos.state.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessagesApiService } from '../messages/data-access/messages.api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent, MessageDialogFormValue } from 'src/app/shared/ui/common-message-dialog.component';
import { BehaviorSubject, take, tap } from 'rxjs';
import { ListDialogComponent } from 'src/app/shared/ui/common-list-dialog.component';
import { LegalStatusPipe } from './utils/legal-status.pipe';
import { ContactDialogComponent } from 'src/app/shared/ui/common-contact-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ID } from 'src/app/core/types/id.type';
import { AuthStateService } from 'src/app/auth/data_access/auth.state.service';
import { CommonFilters, CommonFiltersComponent } from 'src/app/shared/ui/common-filters.component';
import PaginationComponent from 'src/app/shared/ui/pagination.component';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BusinessArea } from './model/ngo.model';
import { INITIAL_PAGINATION_STATE } from '../projects/data-access/projects.state.service';
import { LoadingComponent } from '../../shared/ui/loading.component';

@Component({
  selector: 'app-ngo-list-page',
  standalone: true,
  template: `
    <ng-container *ngIf="state() as state">
      <app-common-filters [hideSort]="true" (filtersChanged)="onFiltersChanged($event)" />

      <app-list-shell
        *ngIf="state.loadListCallState === 'LOADED'"
        listName="Organizacje pozarządowe"
        [list]="state.list">
        <ng-template #item let-ngo>
          <div class="mb-4 h-10">
            <p class="font-semibold text-lg">{{ ngo.name }}</p>
          </div>
          <div
            class="mb-4 relative h-80 bg-no-repeat bg-cover bg-center"
            [style.background-image]="'url(' + (ngo.logoUrl || '/assets/images/placeholder.jpg') + ')'"></div>
          <div class="bottom-0 left-0 w-full h-10 p-4 bg-material-blue text-white flex items-center">
            {{ ngo.legalStatus | legalStatus }}
          </div>
          <div class="mb-4">
            <p>
              @if(ngo.description) {
              {{ (ngo.description | slice : 0 : 160) + '...' }}
              } @else { Brak opisu }
            </p>
            <div class="flex justify-end">
              <button
                (click)="goTo(ngo.id)"
                class="ml-auto block -mt-1 mb-2 bg-black text-white px-2 py-1 rounded-md hover:bg-opacity-70 transition">
                Szczegóły
              </button>
            </div>
          </div>
          <div class="mb-2">
            @for (tag of ngo.tags; track tag) {
            <span>#{{ tag }} </span>
            }
          </div>
          <mat-divider />
          <div class="flex justify-between mt-4">
            @if ($isAuth()) {
            <div
              matTooltip="Wyślij wiadomość do organizacji"
              class="cursor-pointer"
              (click)="openMessageModal(ngo.id, ngo.name)">
              <mat-icon>forward_to_inbox</mat-icon>
            </div>
            }
            <!--  -->
            @if (ngo.resources?.length) {
            <div
              matTooltip="Wyświetl zasoby organizacji"
              class="cursor-pointer"
              (click)="openResourcesModal(ngo.resources)">
              <mat-icon [ngClass]="{ ' bg-yellow-400 rounded-full': resourcesContainsSearchTerm(ngo.resources) }"
                >build</mat-icon
              >
            </div>
            }
            <!--  -->
            @if (ngo.businnessAreas?.length) {
            <div
              matTooltip="Wyświetl obszary działań organizacji"
              class="cursor-pointer"
              (click)="openCategoriessModal(ngo.businnessAreas)">
              <mat-icon>assignment</mat-icon>
            </div>
            }
            <div
              matTooltip="Wyświetl kontakt do organizacji"
              class="cursor-pointer"
              (click)="openContactModal(ngo.address, ngo.phone, ngo.email, ngo.website)">
              <mat-icon> contact_mail</mat-icon>
            </div>
          </div>
        </ng-template>
      </app-list-shell>
      <app-loader *ngIf="state.loadListCallState === 'LOADING'" text="Ładowanie NGOs..."></app-loader>
      <app-pagination [totalElements]="state.totalElements" (paginationChange)="handlePageEvent($event)" />
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ListShellComponent,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    SlicePipe,
    LegalStatusPipe,
    MatButtonModule,
    CommonFiltersComponent,
    PaginationComponent,
    MatTooltipModule,
    LoadingComponent,
  ],
})
export default class NgoListPageComponent implements OnInit {
  @Input({ required: true }) bussinessAreas!: BusinessArea[];
  @Input() ngoId?: string;

  snackbar = inject(MatSnackBar);
  messagesService = inject(MessagesApiService);
  $authState = inject(AuthStateService).$value;
  router = inject(Router);

  service = inject(NGOsApiService);
  state = inject(NGOsStateService).$value;
  dialog = inject(MatDialog);

  public $isAuth = computed(() => this.$authState().status === 'AUTHENTICATED');

  ngOnInit(): void {
    this.filters$$.next({ ...this.filters$$.value, id: this.ngoId });

    this.filters$$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(filters => {
      this.service.getAll(filters);
    });
  }

  private destroyRef = inject(DestroyRef);

  private filters$$ = new BehaviorSubject<CommonFilters & PaginationFilters & { id?: string }>({
    pageIndex: 0,
    pageSize: INITIAL_PAGINATION_STATE.size,
    search: '',
    sort: 'desc',
  });

  resourcesContainsSearchTerm(resources: string[]) {
    const searchTerm = this.filters$$.value.search.toLowerCase();

    if (!searchTerm) return false;

    return resources.some(resource => resource.toLowerCase().includes(searchTerm));
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

  goTo(id: ID) {
    this.router.navigateByUrl(`/ngos/${id}`);
  }

  openMessageModal(id: ID, name: string) {
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

  openResourcesModal(items: string[]) {
    this.dialog.open(ListDialogComponent, {
      width: '450px',
      data: {
        items,
        title: 'Zasoby organizacji',
      },
    });
  }

  openCategoriessModal(items: ID[]) {
    this.dialog.open(ListDialogComponent, {
      width: '450px',
      data: {
        items: items.map(id => this.bussinessAreas.find(ba => ba.id === id)?.name),
        title: 'Obszary działania',
      },
    });
  }

  openContactModal(address: string, phone: string, email: string, website: string) {
    this.dialog.open(ContactDialogComponent, {
      width: '650px',
      data: {
        address,
        phone,
        email,
        website,
      },
    });
  }
}
