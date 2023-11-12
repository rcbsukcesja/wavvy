import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

export type CommonFilters = {
  sort: 'asc' | 'desc';
  search: string;
};

export const DEFAULT_SORT = 'desc';

@Component({
  selector: 'app-common-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section #filters class="mb-4">
      <div class="ml-auto flex gap-4">
        @if (!hideSort) {
        <span> Sortuj:</span>
        <button (click)="sortBy = 'desc'; emitFiltersChanged()" [class.font-bold]="sortBy === 'desc'">
          od najnowszych
        </button>
        <button (click)="sortBy = 'asc'; emitFiltersChanged()" [class.font-bold]="sortBy === 'asc'">
          od najstarszych
        </button>
        }

        <input [formControl]="searchCtrl" class="bg-transparent border-b border-b-black " placeholder="Wyszukaj" />
      </div>
    </section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonFiltersComponent {
  @Input() sortBy: CommonFilters['sort'] = DEFAULT_SORT;
  @Input() hideSort = false;
  @Output() filtersChanged = new EventEmitter<CommonFilters>();

  searchCtrl = new FormControl('', { nonNullable: true });

  constructor() {
    this.searchCtrl.valueChanges.pipe(takeUntilDestroyed(), debounceTime(250), distinctUntilChanged()).subscribe(() => {
      this.emitFiltersChanged();
    });
  }

  emitFiltersChanged() {
    this.filtersChanged.emit({ sort: this.sortBy, search: this.searchCtrl.value });
  }
}
