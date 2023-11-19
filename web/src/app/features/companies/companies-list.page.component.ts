import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesApiService } from './data-access/companies.api.service';
import { CompaniesStateService } from './data-access/companies.state.service';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessagesApiService } from '../messages/data-access/messages.api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent, MessageDialogFormValue } from 'src/app/shared/ui/common-message-dialog.component';
import { BehaviorSubject, take, tap } from 'rxjs';
import { ListDialogComponent } from 'src/app/shared/ui/common-list-dialog.component';
import { ContactDialogComponent } from 'src/app/shared/ui/common-contact-dialog.component';
import { ID } from 'src/app/core/types/id.type';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonFilters, CommonFiltersComponent } from 'src/app/shared/ui/common-filters.component';
import PaginationComponent from 'src/app/shared/ui/pagination.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationFilters } from 'src/app/core/types/pagination.type';

@Component({
  selector: 'app-companies.page',
  standalone: true,
  imports: [
    CommonFiltersComponent,
    PaginationComponent,
    MatTooltipModule,
    CommonModule,
    ListShellComponent,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  template: `
    <ng-container *ngIf="state() as state">
      <app-common-filters [hideSort]="true" (filtersChanged)="onFiltersChanged($event)" />

      <app-list-shell *ngIf="state.loadListCallState === 'LOADED'" listName="MŚP" [list]="state.list">
        <ng-template #item let-company>
          <div class="mb-4 h-10">
            <p class="font-semibold text-lg">{{ company.name }}</p>
          </div>
          <div class="mb-4">
            <p>{{ company.description }}</p>
          </div>
          <mat-divider />
          <div class="flex justify-between mt-4">
            <div class="cursor-pointer" (click)="openMessageModal(company.id, company.name)">
              <mat-icon>forward_to_inbox</mat-icon>
            </div>
            @if (company.resources?.length) {
            <div class="cursor-pointer" (click)="openResourcesModal(company.resources)">
              <mat-icon>build</mat-icon>
            </div>
            }
            <!--  -->
            @if (company.businnessAreas?.length) {
            <div class="cursor-pointer" (click)="openCategoriessModal(company.businnessAreas)">
              <mat-icon>assignment</mat-icon>
            </div>
            }

            <div
              class="cursor-pointer"
              (click)="openContactModal(company.address, company.phone, company.email, company.website)">
              <mat-icon> contact_mail</mat-icon>
            </div>
          </div>
        </ng-template>
      </app-list-shell>
      <p *ngIf="state.loadListCallState === 'LOADING'">Ładowanie...</p>
      <app-pagination [totalElements]="state.totalElements" (paginationChange)="handlePageEvent($event)" />
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CompaniesListPageComponent implements OnInit {
  @Input() companyId?: string;
  snackbar = inject(MatSnackBar);
  messagesService = inject(MessagesApiService);
  dialog = inject(MatDialog);

  service = inject(CompaniesApiService);
  state = inject(CompaniesStateService).$value;

  ngOnInit(): void {
    this.filters$$.next({ ...this.filters$$.value, id: this.companyId });
    this.filters$$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(filters => {
      this.service.getAll(filters);
    });
  }

  private destroyRef = inject(DestroyRef);

  private filters$$ = new BehaviorSubject<CommonFilters & PaginationFilters & { id?: string }>({
    pageIndex: 0,
    pageSize: 5,
    search: '',
    sort: 'desc',
  });

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

  openMessageModal(id: ID, name: string) {
    this.dialog
      .open(MessageDialogComponent, {
        width: '500px',
        data: {
          name,
          connector: 'do przedsiębiorstwa:',
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

  openResourcesModal(items: string[]) {
    this.dialog.open(ListDialogComponent, {
      width: '450px',
      data: {
        items,
        title: 'Zasoby organizacji',
      },
    });
  }

  openCategoriessModal(items: { id: ID; name: string }[]) {
    this.dialog.open(ListDialogComponent, {
      width: '450px',
      data: {
        items: items.map(item => item.name),
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
