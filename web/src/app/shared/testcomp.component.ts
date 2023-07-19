import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { useStore } from '../core/use-store.hook';
import { booksListActions } from '../features/books/state/books-list.actions';
import { selectBooksListCallState } from '../features/books/state/books-list.selectors';

@Component({
  selector: 'app-testcomp',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="flex">
      {{ $callState() }}
      <div>
        <button mat-button (click)="loadBooks()">Load books</button>
      </div>
    </div>
  `,
})
export class TestcompComponent {
  private store = useStore();

  $callState = this.store.selectSignal(selectBooksListCallState);

  loadBooks() {
    this.store.dispatch(booksListActions.loadList());
  }
}
