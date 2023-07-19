import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { NGOsApiService } from './data-access/ngos.api.service';
import { NGOsStateService } from './data-access/ngos.state.service';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { BusinessArea, NGO } from './model/ngo.model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-ngo-list-page',
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
  ],
  template: `
    <ng-container *ngIf="state() as state">
      <section *ngIf="state.loadProfileCallState === 'LOADED'">
        <h2>{{ state.profile?.name }}</h2>
        <div class="w-1/5 mb-4">
          <img [src]="state.profile?.logo" />
        </div>
        <form [formGroup]="form" (ngSubmit)="save()">
          <div class="flex gap-4">
            <mat-form-field class="w-1/2">
              <mat-label>Nazwa</mat-label>
              <input formControlName="name" matInput [disabled]="true" />
            </mat-form-field>
            <br />
            <mat-form-field class="w-1/2">
              <mat-label>Data utworzenia</mat-label>
              <input formControlName="creationDate" matInput />
            </mat-form-field>
            <br />
          </div>
          <div class="flex gap-4">
            <mat-form-field class="w-1/2">
              <mat-label>KRS</mat-label>
              <input formControlName="KRS" matInput [disabled]="true" />
            </mat-form-field>
            <br />
            <mat-form-field class="w-1/2">
              <mat-label>NIP</mat-label>
              <input formControlName="NIP" matInput />
            </mat-form-field>
            <br />
          </div>
          <div class="flex gap-4">
            <mat-form-field class="w-1/2">
              <mat-label>Telefon</mat-label>
              <input formControlName="phone" matInput />
            </mat-form-field>
            <br />

            <mat-form-field class="w-1/2">
              <mat-label>Email</mat-label>
              <input formControlName="email" matInput />
            </mat-form-field>
            <br />
          </div>
          <div class="flex gap-4">
            <mat-form-field class="w-1/2">
              <mat-label>Adres</mat-label>
              <textarea formControlName="address" matInput [disabled]="true"></textarea>
            </mat-form-field>
            <br />
            <mat-form-field class="w-1/2">
              <mat-label>Strona internetowa</mat-label>
              <input formControlName="website" matInput />
            </mat-form-field>
            <br />
          </div>
          <div class="flex gap-4">
            <mat-form-field class="w-1/2">
              <mat-label>Kategorie</mat-label>
              <mat-select formControlName="businnessAreas" multiple>
                <mat-select-trigger>
                  {{ form.controls.businnessAreas.value[0]?.name || '' }}
                  <span *ngIf="(form.controls.businnessAreas.value.length || 0) > 1">
                    (+{{ (form.controls.businnessAreas.value.length || 0) - 1 }}
                    {{ form.controls.businnessAreas.value.length === 2 ? 'other' : 'others' }})
                  </span>
                </mat-select-trigger>
                <mat-option *ngFor="let area of bussinessAreas" [value]="area">{{ area.name }}</mat-option>
              </mat-select>
            </mat-form-field>
            <br />

            <mat-form-field class="w-1/2">
              <mat-label>Logo</mat-label>
              <input formControlName="logo" matInput />
            </mat-form-field>
            <br />
          </div>
          <div class="flex gap-4">
            <mat-form-field class="w-1/2 pr-2">
              <mat-label>Tagi</mat-label>
              <mat-chip-grid formControlName="tags" #chipGrid aria-label="Enter tags">
                <mat-chip-row
                  *ngFor="let tag of tags"
                  (removed)="remove(tag)"
                  [editable]="true"
                  (edited)="edit(tag, $event)">
                  {{ tag }}
                  <button matChipRemove>
                    <mat-icon>cancel</mat-icon>
                  </button>
                </mat-chip-row>
                <input
                  placeholder="Nowy tag"
                  [matChipInputFor]="chipGrid"
                  [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                  [matChipInputAddOnBlur]="addOnBlur"
                  (matChipInputTokenEnd)="add($event)" />
              </mat-chip-grid>
            </mat-form-field>

            <mat-form-field class="w-1/2 pl-2">
              <mat-label>Opis</mat-label>
              <textarea formControlName="description" matInput [disabled]="true"></textarea>
            </mat-form-field>
            <br />
          </div>

          <br />
          <mat-divider />
          <br />
          <div formArrayName="owners">
            <div class="flex items-center mb-4">
              <h2 class="font-bold !m-0">Członkowie</h2>
              <mat-icon class="cursor-pointer ml-3 text-green-700" (click)="addUser()">add_circle</mat-icon>
            </div>
            <div *ngFor="let user of form.controls.owners.controls; let i = index" [formGroupName]="i">
              <div class="flex gap-4 items-center">
                <mat-form-field>
                  <mat-label>Nazwa użytkownika</mat-label>
                  <input formControlName="username" matInput />
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Imię</mat-label>
                  <input formControlName="firstName" matInput />
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Nazwisko</mat-label>
                  <input formControlName="lastName" matInput />
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Email</mat-label>
                  <input formControlName="email" matInput />
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Typ</mat-label>
                  <input formControlName="userType" matInput />
                </mat-form-field>
                <mat-icon class="cursor-pointer ml-3 text-red-700 mb-5" (click)="removeUser(i)">remove_circle</mat-icon>
              </div>
            </div>
          </div>

          <div class="flex justify-center">
            <button mat-raised-button color="primary">Zapisz</button>
          </div>
        </form>
      </section>
      <p *ngIf="state.loadProfileCallState === 'LOADING'">LOADING...</p>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NgoProfilePageComponent implements OnInit {
  @Input() bussinessAreas!: BusinessArea[];
  private builder = inject(NonNullableFormBuilder);
  private service = inject(NGOsApiService);
  state = inject(NGOsStateService).$value;
  stateObs = inject(NGOsStateService)
    .value$.pipe(
      tap(({ profile }) => {
        if (!profile) return;
        this.ngoProfile = profile;
        const {
          name,
          address,
          description,
          email,
          website,
          phone,
          tags,
          creationDate,
          KRS,
          NIP,
          businnessAreas,
          logo,
          owners,
        } = profile;
        this.form.patchValue({
          name,
          address,
          description,
          email,
          website,
          phone,
          KRS,
          NIP,
          tags,
          creationDate,
          businnessAreas,
          logo,
        });

        for (let i = 0; i <= this.form.controls.owners.length; i++) {
          this.form.controls.owners.removeAt(0);
        }

        for (const owner of owners) {
          this.form.controls.owners.push(
            this.builder.group({
              username: owner.username,
              firstName: owner.firstName,
              lastName: owner.lastName,
              email: owner.email,
              userType: owner.userType,
            })
          );
        }

        this.tags = tags;
      })
    )
    .subscribe();

  addOnBlur = true;
  ngoProfile: NGO | null = null;
  separatorKeysCodes = [ENTER, COMMA] as const;

  form = this.builder.group({
    name: this.builder.control(''),
    logo: this.builder.control(''),
    KRS: this.builder.control(''),
    NIP: this.builder.control(''),
    description: this.builder.control(''),
    address: this.builder.control(''),
    email: this.builder.control(''),
    website: this.builder.control(''),
    phone: this.builder.control(''),
    tags: this.builder.control(['']),
    creationDate: this.builder.control(''),
    businnessAreas: this.builder.control<{ id: number; name: string }[]>([]),
    owners: this.builder.array([this.initUser()]),
  });

  tags: string[] = [];

  ngOnInit(): void {
    this.service.getProfile();
    this.form.controls.name.disable();
    this.form.controls.creationDate.disable();
    this.form.controls.KRS.disable();
    this.form.controls.NIP.disable();
  }

  save() {
    this.service.updateProfile({
      ...this.ngoProfile,
      ...this.form.value,
    });
  }

  initUser(): FormGroup {
    return this.builder.group({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      userType: '',
    });
  }

  addUser() {
    this.form.controls.owners.push(this.initUser());
  }

  removeUser(i: number) {
    const control = this.form.controls.owners;
    control.removeAt(i);
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
