import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-tile',
  standalone: true,
  imports: [CommonModule],
  template: ` <div class="p-4 shadow-md rounded-lg"><ng-content /></div> `,
  styles: ['div { min-width: 340px; max-width: 500px}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTileComponent {}
