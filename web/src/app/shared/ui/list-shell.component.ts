import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, inject } from '@angular/core';
import { ListTileComponent } from './list-tile.component';
import { ID } from 'src/app/core/types/id.type';
import { LoadingComponent } from './loading.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-list-shell',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule, ListTileComponent, LoadingComponent],
  template: `
    <header>
      <p class="text-2xl font-semibold">{{ listName }}</p>
      <ng-content [select]="'app-common-filters'" />
    </header>
    <ng-container *ngIf="isAsideHidden$ | async as asideHidden; else desktopView">
      <section
        class="flex justify-center items-center grow"
        [ngClass]="list.length > 0 ? 'md:justify-start' : 'md:justify-center'">
        <div class="flex flex-wrap" [ngClass]="list.length > 1 ? 'justify-center' : 'justify-start'">
          @for (item of list; track item.id) {
            <app-list-tile class="px-4 pb-4 md:w-1/2">
              <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }" />
            </app-list-tile>
          } @empty {
            <p class="text-4xl text-center">Niestety, nie ma aktualnie tutaj nic co możemy Ci wyświetlić 💔</p>
          }
        </div>
      </section>
    </ng-container>
    <ng-template #desktopView>
      <section class="flex grow">
        <div
          class="flex flex-wrap w-full"
          [ngClass]="list.length > 0 ? 'justify-start' : 'justify-center items-center'">
          @for (item of list; track item.id) {
            <app-list-tile class="px-4 pb-4 " [ngClass]="list.length > 1 ? 'lg:w-1/2 2xl:w-1/3' : ''">
              <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }" />
            </app-list-tile>
          } @empty {
            <p class="text-4xl text-center">Niestety, nie ma aktualnie tutaj nic co możemy Ci wyświetlić 💔</p>
          }
        </div>
      </section>
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListShellComponent<T extends { id: ID }> {
  @Input({ required: true }) listName!: string;
  @Input({ required: true }) list!: T[];

  @ContentChild('item') itemTemplate!: TemplateRef<any>;

  private breakpointObserver = inject(BreakpointObserver);

  isAsideHidden$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
    map(result => result.matches),
    shareReplay()
  );
}
