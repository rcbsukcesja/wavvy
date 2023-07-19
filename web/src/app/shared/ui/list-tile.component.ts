import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-tile',
  standalone: true,
  imports: [CommonModule],
  template: ` <div class="p-4 shadow-md"><ng-content /></div> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTileComponent {}
