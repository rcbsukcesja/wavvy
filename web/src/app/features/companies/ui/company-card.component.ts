import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Company } from '../model/company.model';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ID } from 'src/app/core/types/id.type';
import { ContactDialogComponent } from 'src/app/shared/ui/common-contact-dialog.component';
import { ListDialogComponent } from 'src/app/shared/ui/common-list-dialog.component';
import { tap, take } from 'rxjs';
import { MessageDialogComponent, MessageDialogFormValue } from 'src/app/shared/ui/common-message-dialog.component';

@Component({
  selector: 'app-company-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatDividerModule, MatDialogModule],
  template: `
    <div class="mb-4 h-10">
      <p class="font-semibold text-lg">{{ company.name }}</p>
    </div>
    <div class="mb-4">
      <p>{{ company.description }}</p>
    </div>
    <mat-divider />
    <div class="flex justify-between mt-4">
      @if (canSendMessage) {
      <div class="cursor-pointer" (click)="openMessageModal(company.name)">
        <mat-icon>forward_to_inbox</mat-icon>
      </div>
      }
      <!--  -->
      @if (company.resource?.length) {
      <div class="cursor-pointer" (click)="openResourcesModal(company.resource)">
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
  `,
})
export class CompanyCardComponent {
  dialog = inject(MatDialog);

  @Input({ required: true }) company!: Company;
  @Input() canSendMessage = true;
  @Output() message = new EventEmitter<MessageDialogFormValue>();

  ngOnInit() {
    console.log(this);
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

  openMessageModal(name: string) {
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
            this.message.emit(value);
          }
        }),
        take(1)
      )
      .subscribe();
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
