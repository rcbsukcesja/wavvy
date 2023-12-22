import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ListTileComponent } from './list-tile.component';
import { ID } from 'src/app/core/types/id.type';
import { LoadingComponent } from './loading.component';

@Component({
  selector: 'app-list-shell',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule, ListTileComponent, LoadingComponent],
  template: `
    <header>
      <p class="text-2xl font-semibold">{{ listName }}</p>
      <ng-content [select]="'app-common-filters'" />
    </header>
    <section class="flex justify-center items-center grow">
    <div class="flex flex-wrap flex items-center justify-center">
        @for (item of list; track item.id) {
        <app-list-tile class="px-4 pb-4 max-w-[500px] md:max-w-[400px] xl:max-w-[550px]">
          <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }" />
        </app-list-tile>
        } @empty { 
          <p class="text-4xl text-center">Niestety nie ma tutaj nic 💔</p>
        }

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
