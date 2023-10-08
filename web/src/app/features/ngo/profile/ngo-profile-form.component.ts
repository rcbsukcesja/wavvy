import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BusinessArea, NGO } from '../model/ngo.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';

export type NgoProfileFormModel = FormGroup<{
  name: FormControl<string>;
  logo: FormControl<string>;
  KRS: FormControl<string>;
  NIP: FormControl<string>;
  description: FormControl<string>;
  address: FormControl<string>;
  email: FormControl<string>;
  website: FormControl<string>;
  phone: FormControl<string>;
  tags: FormControl<string[]>;
  creationDate: FormControl<string>;
  businnessAreas: FormControl<{ id: number; name: string }[]>;
  resources: FormArray<FormControl<string>>;
}>;

@Component({
  selector: 'app-ngo-profile-form',
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
    MatDatepickerModule,
  ],
  template: `
    <section>
      <h2>{{ profile.name }}</h2>
      <div class="w-1/5 mb-4">
        <img [src]="profile.logo" />
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="flex flex-col md:flex-row md:gap-4">
          <mat-form-field class="md:w-1/2">
            <mat-label>Nazwa</mat-label>
            <input formControlName="name" matInput />
          </mat-form-field>
          <br />
          <mat-form-field class="md:w-1/2">
            <mat-label>Data utworzenia</mat-label>
            <input matInput formControlName="creationDate" [matDatepicker]="picker" placeholder="Wybierz datę" />
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <br />
        </div>
        <div class="flex flex-col md:flex-row  md:gap-4">
          <mat-form-field class="md:w-1/2">
            <mat-label>KRS</mat-label>
            <input formControlName="KRS" matInput />
          </mat-form-field>
          <br />
          <mat-form-field class="md:w-1/2">
            <mat-label>NIP</mat-label>
            <input formControlName="NIP" matInput />
          </mat-form-field>
          <br />
        </div>
        <div class="flex flex-col md:flex-row  md:gap-4">
          <mat-form-field class="md:w-1/2">
            <mat-label>Telefon</mat-label>
            <input formControlName="phone" matInput />
          </mat-form-field>
          <br />

          <mat-form-field class="md:w-1/2">
            <mat-label>Email</mat-label>
            <input formControlName="email" matInput />
          </mat-form-field>
          <br />
        </div>
        <div class="flex flex-col md:flex-row  md:gap-4">
          <mat-form-field class="md:w-1/2">
            <mat-label>Adres</mat-label>
            <textarea formControlName="address" matInput></textarea>
          </mat-form-field>
          <br />
          <mat-form-field class="md:w-1/2">
            <mat-label>Strona internetowa</mat-label>
            <input formControlName="website" matInput />
          </mat-form-field>
          <br />
        </div>
        <div class="flex flex-col md:flex-row  md:gap-4">
          <mat-form-field class="md:w-1/2">
            <mat-label>Obszary działania</mat-label>
            <mat-select formControlName="businnessAreas" multiple>
              <mat-select-trigger>
                {{ form.controls.businnessAreas.value[0].name || '' }}
                <span *ngIf="(form.controls.businnessAreas.value.length || 0) > 1">
                  (+{{ (form.controls.businnessAreas.value.length || 0) - 1 }}
                  {{ form.controls.businnessAreas.value.length === 2 ? 'other' : 'others' }})
                </span>
              </mat-select-trigger>
              <mat-option *ngFor="let area of bussinessAreas" [value]="area">{{ area.name }}</mat-option>
            </mat-select>
          </mat-form-field>
          <br />

          <mat-form-field class="md:w-1/2">
            <mat-label>Logo</mat-label>
            <input formControlName="logo" matInput />
          </mat-form-field>
          <br />
        </div>
        <div class="flex flex-col md:flex-row  md:gap-4">
          <mat-form-field class="md:w-1/2 md:pr-2">
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

          <mat-form-field class="md:w-1/2 md:pl-2">
            <mat-label>Opis</mat-label>
            <textarea formControlName="description" matInput></textarea>
          </mat-form-field>
          <br />
          <mat-form-field class="md:w-1/2 md:pl-2">
            <mat-label>Zasoby</mat-label>
            <input matInput />
            <button type="button">Dodaj</button>
          </mat-form-field>
        </div>

        <div class="flex justify-center">
          <button mat-raised-button color="primary">Zapisz</button>
        </div>
      </form>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgoProfileFirstCompletionComponent implements OnInit {
  @Input({ required: true }) profile!: NGO;
  @Input({ required: true }) bussinessAreas!: BusinessArea[];
  @Input() firstCompletion = false;
  @Output() save = new EventEmitter<Required<typeof this.form.value>>();

  private builder = inject(NonNullableFormBuilder);

  addOnBlur = true;
  ngoProfile: NGO | null = null;
  separatorKeysCodes = [ENTER, COMMA] as const;

  form!: NgoProfileFormModel;

  tags: string[] = [];

  ngOnInit(): void {
    this.form = this.builder.group({
      name: this.builder.control({ value: this.profile.name, disabled: true }),
      logo: this.builder.control(this.profile.logo || ''),
      KRS: this.builder.control({ value: this.profile.KRS, disabled: true }),
      NIP: this.builder.control({ value: this.profile.NIP, disabled: true }),
      description: this.builder.control(this.profile.description || ''),
      address: this.builder.control({ value: this.profile.address || '', disabled: true }),
      email: this.builder.control(this.profile.email || ''),
      website: this.builder.control(this.profile.website || ''),
      phone: this.builder.control(this.profile.phone || ''),
      tags: this.builder.control(this.profile.tags || ['']),
      creationDate: this.builder.control(this.profile.creationDate || ''),
      businnessAreas: this.builder.control<{ id: number; name: string }[]>(
        this.bussinessAreas.filter(area => this.profile.businnessAreas?.includes(area.id) || [])
      ),
      resources: this.builder.array<FormControl<string>>([]),
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.save.emit(this.form.getRawValue());
    console.log(this.form.value);
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
