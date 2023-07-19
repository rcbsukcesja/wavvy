import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MessagesApiService } from './data-access/messages.api.service';
import { MessagesStateService } from './data-access/messages.state.service';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';

@Component({
  selector: 'app-messages.page',
  standalone: true,
  imports: [CommonModule, ListShellComponent, DatePipe],
  template: `
    <ng-container *ngIf="state() as state">
      <app-list-shell *ngIf="state.loadListCallState === 'LOADED'" listName="Wiadomości" [list]="state.list">
        <ng-template #item let-message>
          <div class="mb-4"><strong>Tytuł: </strong>{{ message.title }}</div>
          <div class="mb-4"><strong>Treść: </strong>{{ message.content }}</div>
          <div><strong>Wysłano: </strong>{{ message.createdAt | date : 'long' }}</div>
        </ng-template>
      </app-list-shell>
      <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MessagesListPageComponent implements OnInit {
  service = inject(MessagesApiService);
  state = inject(MessagesStateService).$value;

  ngOnInit(): void {
    this.service.getAll();
  }
}
