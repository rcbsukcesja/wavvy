import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgoRegisterForm } from '../model/ngo-register-form.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-ngo-register-form-status',
  template: ` <div class="rounded-full h-4 w-4 mx-auto" [ngClass]="status ? 'rejected' : 'accepted'"></div> `,
  styles: [
    `
      .pending {
        @apply bg-yellow-500;
      }

      .rejected {
        @apply bg-red-500;
      }

      .accepted {
        @apply bg-green-500;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgoRegisterFormStatusComponent {
  @Input({ required: true }) status!: boolean;
}
