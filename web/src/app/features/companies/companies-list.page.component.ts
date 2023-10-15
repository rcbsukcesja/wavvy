import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
import { take, tap } from 'rxjs';
import { ListDialogComponent } from 'src/app/shared/ui/common-list-dialog.component';
import { ContactDialogComponent } from 'src/app/shared/ui/common-contact-dialog.component';
import { ID } from 'src/app/core/types/id.type';

@Component({
  selector: 'app-companies.page',
  standalone: true,
  imports: [CommonModule, ListShellComponent, MatDividerModule, MatIconModule, MatSnackBarModule, MatDialogModule],
  template: `
    <ng-container *ngIf="state() as state">
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
            <div class="cursor-pointer" (click)="openResourcesModal(company.resources)">
              <mat-icon>build</mat-icon>
            </div>
            <div class="cursor-pointer" (click)="openCategoriessModal(company.businnessAreas)">
              <mat-icon>assignment</mat-icon>
            </div>
            <div
              class="cursor-pointer"
              (click)="openContactModal(company.address, company.phone, company.email, company.website)">
              <mat-icon> contact_mail</mat-icon>
            </div>
          </div>
        </ng-template>
      </app-list-shell>
      <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CompaniesListPageComponent implements OnInit {
  snackbar = inject(MatSnackBar);
  messagesService = inject(MessagesApiService);
  dialog = inject(MatDialog);

  service = inject(CompaniesApiService);
  state = inject(CompaniesStateService).$value;

  ngOnInit(): void {
    this.service.getAll();
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
