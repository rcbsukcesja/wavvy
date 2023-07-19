import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersApiService } from './data-access/offers.api.service';
import { OffersStateService } from './data-access/offers.state.service';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-offers.page',
  standalone: true,
  imports: [CommonModule, ListShellComponent, MatIconModule, MatDividerModule, MatTooltipModule],
  template: `
    <ng-container *ngIf="state() as state">
      <app-list-shell *ngIf="state.loadListCallState === 'LOADED'" listName="Oferty" [list]="state.list">
        <ng-template #item let-offer>
          <div class="relative">
            <div class="flex justify-between items-center h-10">
              <div *ngIf="offer.closeDeadline" class="text-red-600 font-bold flex items-center">
                <mat-icon class="mr-2">warning</mat-icon> <span>Wniosek zamyka się wkrótce</span>
              </div>
              <mat-icon class="text-red-600 ml-auto">favorite</mat-icon>
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
            <div class="flex justify-end mt-4">
              <div class="flex flex-col"><mat-icon>forward_to_inbox</mat-icon></div>
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
export default class OffersListPageComponent implements OnInit {
  service = inject(OffersApiService);
  state = inject(OffersStateService).$value;

  ngOnInit(): void {
    this.service.getAll();
  }
}
