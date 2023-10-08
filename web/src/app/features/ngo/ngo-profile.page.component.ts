import { ChangeDetectionStrategy, Component, computed, inject, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { NGOsApiService } from './data-access/ngos.api.service';
import { NGOsStateService } from './data-access/ngos.state.service';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { BusinessArea, NGO } from './model/ngo.model';
import { MatDividerModule } from '@angular/material/divider';
import { AuthStateService } from 'src/app/auth/data_access/auth.state.service';
import { NgoProfileFirstCompletionComponent } from './profile/ngo-profile-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
      siema {{ state.loadProfileCallState }}
      <p *ngIf="state.loadProfileCallState === 'LOADING'">
        <mat-spinner [diameter]="16" />
      </p>
      <app-ngo-profile-form
        *ngIf="state.loadProfileCallState === 'LOADED'"
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

  addOnBlur = true;
  ngoProfile: NGO | null = null;
  separatorKeysCodes = [ENTER, COMMA] as const;

  tags: string[] = [];

  ngOnInit(): void {
    this.service.getProfile();
  }

  save(formValue: {
    name: string;
    logo: string;
    KRS: string;
    NIP: string;
    description: string;
    address: string;
    email: string;
    website: string;
    phone: string;
    tags: string[];
    creationDate: string;
    businnessAreas: { id: number; name: string }[];
    resources: string[];
  }) {
    this.service.updateProfile({
      ...this.ngoProfile,
      ...formValue,
      businnessAreas: formValue.businnessAreas.map(area => area.id),
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }
}
