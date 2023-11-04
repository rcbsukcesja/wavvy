import { ChangeDetectionStrategy, Component, computed, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGOsApiService } from './data-access/ngos.api.service';
import { NGOsStateService } from './data-access/ngos.state.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BusinessArea } from './model/ngo.model';
import { MatDividerModule } from '@angular/material/divider';
import { AuthStateService } from 'src/app/auth/data_access/auth.state.service';
import { NgoProfileFirstCompletionComponent } from './profile/ngo-profile-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ID } from 'src/app/core/types/id.type';

@Component({
  selector: 'app-ngo-profile-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
    MatDividerModule,
    NgoProfileFirstCompletionComponent,
    MatProgressSpinnerModule,
  ],
  template: `
    <ng-container *ngIf="state() as state">
      <p *ngIf="state.loadProfileCallState === 'LOADING'">
        <mat-spinner [diameter]="16" />
      </p>
      <app-ngo-profile-form
        *ngIf="state.loadProfileCallState === 'LOADED'"
        (save)="save($event, state.profile!.id)"
        (saveLogo)="saveLogo($event)"
        [bussinessAreas]="bussinessAreas"
        [firstCompletion]="!!$firstCompletion()"
        [profile]="state.profile!" />
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NgoProfilePageComponent implements OnInit {
  @Input() bussinessAreas!: BusinessArea[];
  private service = inject(NGOsApiService);
  private $authState = inject(AuthStateService).$value;

  $firstCompletion = computed(() => {
    const user = this.$authState().user;

    return user && !user.profileCompleted;
  });

  state = inject(NGOsStateService).$value;

  ngOnInit(): void {
    if (!this.state().profile) {
      this.service.getProfile();
    }
  }

  saveLogo(logo: File) {
    this.service.updateLogo(logo);
  }

  save(
    formValue: {
      name: string;
      KRS: string;
      NIP: string;
      description: string;
      address: string;
      email: string;
      website: string;
      phone: string;
      tags: string[];
      creationDate: string;
      businnessAreas: { id: ID; name: string }[];
      resources: string[];
    },
    id: ID
  ) {
    this.service
      .updateProfile(
        {
          ...formValue,
          businnessAreas: formValue.businnessAreas.map(area => area.id),
        },
        id
      )
      .subscribe();
  }
}
