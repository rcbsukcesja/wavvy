import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersApiService } from './data-access/offers.api.service';
import { OffersStateService } from './data-access/offers.state.service';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthStateService } from 'src/app/auth/data_access/auth.state.service';
import { USER_ROLES } from 'src/app/core/user-roles.enum';
import { CommonFilters, CommonFiltersComponent } from 'src/app/shared/ui/common-filters.component';
import { MessageDialogComponent, MessageDialogFormValue } from 'src/app/shared/ui/common-message-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessagesApiService } from '../messages/data-access/messages.api.service';
import { ID } from 'src/app/core/types/id.type';
import { tap, take, BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationFilters } from 'src/app/core/types/pagination.type';
import PaginationComponent from 'src/app/shared/ui/pagination.component';
import { NGOsStateService } from '../ngo/data-access/ngos.state.service';
import { INITIAL_PAGINATION_STATE } from '../projects/data-access/projects.state.service';

@Component({
  selector: 'app-offers.page',
  standalone: true,
  imports: [
    CommonModule,
    ListShellComponent,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    CommonFiltersComponent,
    MatDialogModule,
    MatSnackBarModule,
    PaginationComponent,
  ],
  template: `
    <ng-container *ngIf="state() as state">
      <app-common-filters (filtersChanged)="onFiltersChanged($event)" />
      <app-list-shell *ngIf="state.loadListCallState === 'LOADED'" listName="Oferty" [list]="state.list">
        <ng-template #item let-offer>
          <div class="relative">
            <div class="flex justify-between items-center h-10">
              <div *ngIf="offer.closeDeadline" class="text-red-600 font-bold flex items-center">
                <mat-icon class="mr-2">warning</mat-icon> <span>Wniosek zamyka się wkrótce</span>
              </div>

              <button *ngIf="showFav" class=" ml-auto" (click)="toggleFav(offer.id)">
                <mat-icon [ngClass]="followed()?.includes(offer.id) ? 'text-red-600' : 'text-black'">favorite</mat-icon>
              </button>
            </div>

            <div class="rounded-md w-fit px-2 mt-4 mb-2 bg-green-400 text-green-900">
              {{ offer.scope === 'public' ? 'Publiczna' : '' }}
            </div>
            <p class="font-semibold text-lg">{{ offer.name }}</p>
            <p>{{ offer.description }}</p>
            <mat-divider />
            <div class="flex flex-col gap-4 my-3">
              <div>
                <strong class="block">Rozpoczęcie naboru wniosków: </strong>
                <span>{{ offer.startDate | date }}</span>
              </div>
              <div>
                <strong class="block">Zakończenie naboru wniosków: </strong>
                <span>{{ offer.endDate | date }}</span>
              </div>
              <div class="flex gap-6">
                <div>
                  <strong class="block">Poziom finansowania: </strong>
                  <span>{{ offer.fundingLevel }}%</span>
                </div>
                <div>
                  <strong class="block">Budżet: </strong>
                  <span>{{ offer.budget }} PLN</span>
                </div>
              </div>
              <div>
                <strong class="block">Grupa docelowa: </strong>
                <span>{{ offer.targetAudience }}</span>
              </div>
            </div>
            <mat-divider />
            <div class="flex justify-between mt-4">
              <button (click)="openMessageModal(offer.name)">
                <mat-icon>forward_to_inbox</mat-icon>
              </button>

              <a class="font-bold" [href]="offer.link" target="_blank"> BIP </a>
            </div>
          </div>
        </ng-template>
      </app-list-shell>
      <app-pagination [totalElements]="state.totalElements" (paginationChange)="handlePageEvent($event)" />
      <p *ngIf="state.loadListCallState === 'LOADING'">Ładowanie...</p>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OffersListPageComponent implements OnInit {
  private dialog = inject(MatDialog);
  private snackbar = inject(MatSnackBar);
  private messagesService = inject(MessagesApiService);

  private destroyRef = inject(DestroyRef);
  private filters$$ = new BehaviorSubject<CommonFilters & PaginationFilters>({
    pageIndex: 0,
    pageSize: INITIAL_PAGINATION_STATE.size,
    search: '',
    sort: 'desc',
  });

  service = inject(OffersApiService);
  state = inject(OffersStateService).$value;

  authState = inject(AuthStateService).$value;

  ngoState = inject(NGOsStateService).$value;

  followed = computed(() => this.ngoState().profile?.followedByUser);

  get showFav() {
    return this.authState().user?.role === USER_ROLES.NGO_USER;
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

  ngOnInit(): void {
    this.filters$$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(filters => {
      this.service.getAll(filters);
    });
  }

  toggleFav(offerId: number) {
    this.service.toggleFav(this.authState().user!, offerId);
  }

  openMessageModal(name: string) {
    this.dialog
      .open(MessageDialogComponent, {
        width: '500px',
        data: {
          name,
          connector: 'odnośnie oferty',
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
            this.messagesService.sendToCity({ ...value });
          }
        }),
        take(1)
      )
      .subscribe();
  }
}
