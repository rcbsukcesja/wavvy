import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
import { take, tap } from 'rxjs';
import { ListDialogComponent } from 'src/app/shared/ui/common-list-dialog.component';
import { LegalStatusPipe } from './utils/legal-status.pipe';
import { ContactDialogComponent } from 'src/app/shared/ui/common-contact-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngo-list-page',
  standalone: true,
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
  ],
  template: `
    <ng-container *ngIf="state() as state">
      <app-list-shell
        *ngIf="state.loadListCallState === 'LOADED'"
        listName="Organizacje pozarządowe"
        [list]="state.list">
        <ng-template #item let-ngo>
          <div class="mb-4 h-10">
            <p class="font-semibold text-lg">{{ ngo.name }}</p>
          </div>
          <div class="mb-4 relative h-80">
            <div class="absolute right-0 top-0 w-8 h-8 m-2 cursor-pointer">
              <img src="assets/images/blik-logo.jpeg" alt="My Image" />
            </div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img [src]="ngo.logo" />
            </div>
            <div class="absolute bottom-0 left-0 w-full h-10 p-4 bg-green-500 text-white flex items-center">
              {{ ngo.legalStatus | legalStatus }}
            </div>
          </div>
          <div class="mb-4">
            <p>{{ (ngo.description | slice : 0 : 160) + '...' }}</p>
            <div class="flex justify-end">
              <button mat-button color="accent" (click)="goTo(ngo.id)">Szczegóły</button>
            </div>
          </div>
          <mat-divider />
          <div class="flex justify-between mt-4">
            <div class="cursor-pointer" (click)="openMessageModal(ngo.id, ngo.name)">
              <mat-icon>forward_to_inbox</mat-icon>
            </div>
            <div class="cursor-pointer" (click)="openResourcesModal(ngo.resources)">
              <mat-icon>build</mat-icon>
            </div>
            <div class="cursor-pointer" (click)="openCategoriessModal(ngo.businnessAreas)">
              <mat-icon>assignment</mat-icon>
            </div>
            <div class="cursor-pointer" (click)="openContactModal(ngo.address, ngo.phone, ngo.email, ngo.website)">
              <mat-icon> contact_mail</mat-icon>
            </div>
          </div>
        </ng-template>
      </app-list-shell>
      <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NgoListPageComponent implements OnInit {
  snackbar = inject(MatSnackBar);
  messagesService = inject(MessagesApiService);
  router = inject(Router);

  service = inject(NGOsApiService);
  state = inject(NGOsStateService).$value;
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.service.getAll();
  }

  goTo(id: string) {
    this.router.navigateByUrl(`/ngos/${id}`);
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

  openResourcesModal(items: string[]) {
    this.dialog.open(ListDialogComponent, {
      width: '450px',
      data: {
        items,
        title: 'Zasoby organizacji',
      },
    });
  }

  openCategoriessModal(items: { id: string; name: string }[]) {
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
