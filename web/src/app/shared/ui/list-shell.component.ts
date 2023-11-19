import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ListTileComponent } from './list-tile.component';
import { ID } from 'src/app/core/types/id.type';

@Component({
  selector: 'app-list-shell',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule, ListTileComponent],
  template: `
    <header>
      <p class="text-2xl font-semibold">{{ listName }}</p>
      <ng-content [select]="'app-common-filters'" />
    </header>
    <section>
      <div class="flex flex-wrap flex-col md:flex-row">
        @for (item of list; track item.id) {
        <app-list-tile class="px-4 pb-4 md:w-1/2 xl:w-1/3">
          <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }" />
        </app-list-tile>
        } @empty { Niestety nie ma tutaj nic 💔 }
      </div>
    </section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListShellComponent<T extends { id: ID }> {
  @Input({ required: true }) listName!: string;
  @Input({ required: true }) list!: T[];

  @ContentChild('item') itemTemplate!: TemplateRef<any>;
}
