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
import { CompanyProfileFirstCompletionComponent } from '../companies/profile/company-profile-form.component';
import { USER_ROLES } from 'src/app/core/user-roles.enum';
import { CompaniesApiService } from '../companies/data-access/companies.api.service';

@Component({
  selector: 'app-organization-profile-page',
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
    CompanyProfileFirstCompletionComponent,
  ],
  template: `
    <ng-container *ngIf="state() as state">
      @switch (state.loadProfileCallState) {
        @case ('LOADING') {
          <p>
            <mat-spinner [diameter]="16" />
          </p>
        }
        @case ('LOADED') {
          @if (!state.profile?.confirmed) {
            <div class="bg-red-300 px-4 py-2 rounded-md w-fit relative mb-4">
              <mat-icon class="absolute -top-2 -left-2">warning</mat-icon>
              <p class="!m-0">Twoja organizacja nie jest jeszcze zatwierdzona</p>
            </div>
          } @else {
            <p class="border p-2">
              Gratulacje! Twoja organizacja została potwierdzona i możesz teraz w pełni korzystać z Wavvy. Ze względów
              bezpieczeństwa, nie możesz zmieniać nazwy swojej organizacji oraz numerów NIP, KRS oraz REGON
            </p>
          }
          @if ($authState().user?.role === USER_ROLES.NGO_USER) {
            <app-ngo-profile-form
              (save)="save($event, state.profile!.id)"
              (saveLogo)="saveLogo($event, state.profile!.id)"
              [bussinessAreas]="bussinessAreas"
              [profile]="state.profile!" />
          } @else {
            <app-company-profile-form
              (save)="saveCompany($event, state.profile!.id)"
              (saveLogo)="saveLogo($event, state.profile!.id)"
              [bussinessAreas]="bussinessAreas"
              [profile]="state.profile!" />
          }
        }
      }
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrganizationProfilePageComponent implements OnInit {
  @Input() bussinessAreas!: BusinessArea[];
  private service = inject(NGOsApiService);

  public $authState = inject(AuthStateService).$value;

  USER_ROLES = USER_ROLES;

  state = inject(NGOsStateService).$value;

  ngOnInit(): void {
    if (!this.state().profile) {
      this.service.getProfile();
    }
  }

  saveLogo(logo: File, id: string) {
    this.service.updateLogo(logo, id);
  }

  save(
    formValue: {
      name: string;
      krs: string;
      nip: string;
      description: string;
      street: string;
      zipcode: string;
      city: string;
      email: string;
      website: string;
      phone: string;
      tags: string[];
      foundedAt: string;
      businnessAreas: string[];
      resources: string[];
      logo: File | null;
    },
    id: string
  ) {
    const { logo, street, city, zipcode, businnessAreas, ...payload } = formValue;

    this.service
      .updateProfile(
        {
          ...payload,
          address: {
            street,
            city,
            zipCode: zipcode,
            country: 'Polska',
          },
          businessAreaIds: formValue.businnessAreas,
        },
        id
      )
      .subscribe();
  }

  saveCompany(
    formValue: {
      name: string;
      krs: string;
      nip: string;
      description: string;
      street: string;
      zipcode: string;
      city: string;
      email: string;
      website: string;
      phone: string;
      businnessAreas: string[];
      resources: string[];
      logo: File | null;
    },
    id: string
  ) {
    const { logo, street, city, zipcode, businnessAreas, ...payload } = formValue;

    this.service
      .updateProfile(
        {
          ...payload,
          address: {
            street,
            city,
            zipCode: zipcode,
            country: 'Polska',
          },
          businessAreaIds: formValue.businnessAreas,
        },
        id
      )
      .subscribe();
  }
}
