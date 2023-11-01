import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type CommonFilters = {
  sort: 'asc' | 'desc';
};

export const DEFAULT_SORT = 'desc';

@Component({
  selector: 'app-common-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section #filters class="mb-4">
      <div class="ml-auto flex gap-4">
        <span> Sortuj:</span>
        <button (click)="sortBy = 'desc'; emitFiltersChanged()" [class.font-bold]="sortBy === 'desc'">
          od najnowszych
        </button>
        <button (click)="sortBy = 'asc'; emitFiltersChanged()" [class.font-bold]="sortBy === 'asc'">
          od najstarszych
        </button>
      </div>
    </section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonFiltersComponent {
  @Input() sortBy: CommonFilters['sort'] = DEFAULT_SORT;
  @Output() filtersChanged = new EventEmitter<CommonFilters>();

  emitFiltersChanged() {
    this.filtersChanged.emit({ sort: this.sortBy });
  }
}
