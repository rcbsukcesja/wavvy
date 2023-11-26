import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Injectable,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { INITIAL_PAGINATION_STATE } from 'src/app/features/projects/data-access/projects.state.service';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = `Pierwsza strona`;
  itemsPerPageLabel = `Wyświetl:`;
  lastPageLabel = `Ostatnia strona`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Następna strona';
  previousPageLabel = 'Poprzednia strona';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Strona 1 z 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Strona ${page + 1} z ${amountPages}`;
  }
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  template: `
    <mat-paginator
      #paginator
      class="demo-paginator"
      (page)="handlePageEvent($event)"
      [length]="totalElements"
      [pageSize]="pageSize"
      [disabled]="disabled"
      [showFirstLastButtons]="showFirstLastButtons"
      [pageSizeOptions]="showPageSizeOptions ? pageSizeOptions : []"
      [pageIndex]="pageIndex"
      aria-label="Select page">
    </mat-paginator>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatPaginatorModule],
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export default class PaginationComponent {
  @Input({ required: true }) totalElements!: number;
  @Output() paginationChange = new EventEmitter<{
    pageSize: number;
    pageIndex: number;
  }>();

  pageSize = INITIAL_PAGINATION_STATE.size;
  pageIndex = INITIAL_PAGINATION_STATE.number;
  pageSizeOptions = [6, 12, 24];

  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  handlePageEvent({ pageIndex, pageSize }: PageEvent) {
    this.paginationChange.emit({
      pageSize: pageSize,
      pageIndex: pageIndex,
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
