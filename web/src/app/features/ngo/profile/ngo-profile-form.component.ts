import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BusinessArea, NGO } from '../model/ngo.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BehaviorSubject } from 'rxjs';
import { ID } from 'src/app/core/types/id.type';
import { CustomValidators } from 'src/app/shared/custom.validator';
import { MatNativeDateModule } from '@angular/material/core';

export type NgoProfileFormModel = FormGroup<{
  name: FormControl<string>;
  logo: FormControl<File | null>;
  KRS: FormControl<string>;
  NIP: FormControl<string>;
  REGON: FormControl<string>;
  bankAccount: FormControl<string>;
  description: FormControl<string>;
  street: FormControl<string>;
  zipcode: FormControl<string>;
  city: FormControl<string>;
  email: FormControl<string>;
  website: FormControl<string>;
  phone: FormControl<string>;
  tags: FormControl<string[]>;
  foundedAt: FormControl<string>;
  businnessAreas: FormControl<{ id: ID; name: string }[]>;
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
    MatNativeDateModule,
  ],
  styles: [``],
  template: `
    <section *ngIf="logo$ | async as logo" class="max-w-3xl">
      <h2>{{ profile.name }}</h2>
      <div class="w-2/5 mb-4">
        <img *ngIf="logo.url" [src]="logo.url" />
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="flex flex-col md:flex-row md:gap-4">
          <mat-form-field class="md:w-1/2">
            <mat-label>Nazwa</mat-label>
            <input formControlName="name" matInput />
          </mat-form-field>
          <br />
          <mat-form-field class="md:w-1/2">
            <mat-label>REGON</mat-label>
            <input formControlName="REGON" matInput />
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

        <div class="flex flex-col md:gap-4">
          <label>Adres</label>
          <mat-form-field>
            <mat-label>Ulica</mat-label>
            <input formControlName="street" matInput />
          </mat-form-field>
          <div class="flex flex-col md:flex-row  md:gap-4">
            <mat-form-field class="md:w-1/2">
              <mat-label>Kod pocztowy</mat-label>
              <input formControlName="zipcode" matInput />
              <mat-hint>Format 00-000</mat-hint>
            </mat-form-field>
            <br />

            <mat-form-field class="md:w-1/2">
              <mat-label>Miasto</mat-label>
              <input formControlName="city" matInput />
            </mat-form-field>
          </div>
          <hr class="mb-6" />
        </div>

        <div class="flex flex-col md:flex-row  md:gap-4">
          <mat-form-field class="md:w-1/2">
            <mat-label>Telefon</mat-label>
            <input formControlName="phone" matInput />
            <mat-hint>Format 793793793</mat-hint>
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
            <mat-label>Data utworzenia</mat-label>
            <input
              matInput
              formControlName="foundedAt"
              [matDatepicker]="picker"
              placeholder="Wybierz datę"
              [matDatepickerFilter]="filterFutureDates" />
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
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
            <mat-hint>Minimum jeden obszar działania</mat-hint>
          </mat-form-field>
          <br />
          <div class="md:w-1/2 flex items-center">
            <div class="w-full flex flex-col">
              <label [class.text-red-500]="logo$.value.error" for="logo">Logo</label>
              <input [class.text-red-500]="logo$.value.error" id="logo" formControlName="logo" #logoInput type="file" />
            </div>
            <button type="button" (click)="upload()"><mat-icon>save</mat-icon></button>
          </div>

          <br />
        </div>
        <br />
        <div class="flex flex-col md:gap-4">
          <mat-form-field>
            <mat-label>Numer konta bankowego</mat-label>
            <input formControlName="bankAccount" matInput />
            <mat-hint *ngIf="form.controls.bankAccount.value.trim().length > 0" class="text-blue-600"
              >Podając numer konta bankowego oświadczasz jego prawidłowość</mat-hint
            >
          </mat-form-field>

          <mat-form-field>
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
            <mat-hint *ngIf="form.controls.tags as ctrl" [class.text-red-500]="ctrl.invalid && ctrl.touched"
              >Podaj przynajmniej 3 tagi</mat-hint
            >
          </mat-form-field>

          <mat-form-field>
            <mat-label>Opis organizacji</mat-label>
            <textarea class="!h-48" formControlName="description" matInput></textarea>
            <mat-hint *ngIf="form.controls.description as ctrl" [class.text-red-500]="ctrl.invalid && ctrl.touched"
              >Przedstaw swoją organizację, czym się zajmujecie, nad rozwiązaniem jakich problemów pracujecie
              itp</mat-hint
            >
          </mat-form-field>

          <section class="mt-4" formArrayName="resources">
            <p class="font-semibold">Zasoby organizacji</p>
            <div *ngFor="let ctrl of form.controls.resources.controls; let i = index" class="flex">
              <mat-form-field class="w-full">
                <!-- <mat-label>Opis</mat-label> -->
                <input [formControl]="ctrl" matInput />
              </mat-form-field>
              <button *ngIf="ctrl.disabled" (click)="ctrl.enable()"><mat-icon>edit</mat-icon></button>
              <button *ngIf="ctrl.enabled" (click)="ctrl.disable()"><mat-icon>save</mat-icon></button>
              <button *ngIf="ctrl.disabled" (click)="removeResource(i)"><mat-icon>remove</mat-icon></button>
            </div>
            <div class="flex">
              <mat-form-field class="w-full">
                <mat-label>Nowy zasób</mat-label>
                <input matInput #newResource />
                <mat-hint
                  >Masz się czym podzielić z innymi? Czy to sala konferencyjna czy też ekspercka wiedza w wybranym
                  temacie! Daj znać o swoich super mocach 😎</mat-hint
                >
              </mat-form-field>
              <button (click)="addResource(newResource.value)" type="button">Dodaj</button>
            </div>
          </section>
        </div>

        <div class="flex justify-center mt-8 mb-4">
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
  @Input() adminMode = false;
  @Output() save = new EventEmitter<Required<typeof this.form.value>>();
  @Output() saveLogo = new EventEmitter<File>();
  @ViewChild('logoInput') logoInput!: ElementRef<HTMLInputElement>;

  private builder = inject(NonNullableFormBuilder);

  addOnBlur = true;
  ngoProfile: NGO | null = null;
  separatorKeysCodes = [ENTER, COMMA] as const;

  form!: NgoProfileFormModel;

  logo$: BehaviorSubject<{ file: File | null; url: string | null; error: boolean }> = new BehaviorSubject({
    file: null,
    url: null,
    error: false,
  } as { file: File | null; url: string | null; error: boolean });

  tags: string[] = [];

  ngOnInit(): void {
    if (this.profile.logoUrl) {
      this.logo$.next({
        error: false,
        file: null,
        url: this.profile.logoUrl,
      });
    }

    this.profile.confirmed;

    this.form = this.builder.group({
      name: this.builder.control({ value: this.profile.name, disabled: this.profile.confirmed }, [
        Validators.required,
        CustomValidators.maxLength,
      ]),
      logo: this.builder.control<File | null>(null),
      KRS: this.builder.control({ value: this.profile.KRS, disabled: this.profile.confirmed }),
      NIP: this.builder.control({ value: this.profile.NIP, disabled: this.profile.confirmed }),
      REGON: this.builder.control({ value: this.profile.REGON, disabled: this.profile.confirmed }),
      bankAccount: this.builder.control(this.profile.bankAccount || '', [
        Validators.minLength(26),
        Validators.maxLength(26),
      ]),
      description: this.builder.control(this.profile.description || '', [
        Validators.required,
        CustomValidators.longMaxLength,
      ]),
      street: this.builder.control(this.profile.address?.street || '', [
        Validators.required,
        CustomValidators.maxLength,
      ]),
      zipcode: this.builder.control(this.profile.address?.zipCode || '78-100', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      city: this.builder.control(this.profile.address?.city || '', [Validators.required, CustomValidators.maxLength]),
      email: this.builder.control(this.profile.email || '', [Validators.required, CustomValidators.maxLength]),
      website: this.builder.control(this.profile.website || '', [Validators.required, CustomValidators.maxLength]),
      phone: this.builder.control(this.profile.phone || '', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      tags: this.builder.control(this.profile.tags || [], [Validators.required, Validators.minLength(3)]),
      foundedAt: this.builder.control(this.profile.foundedAt || '', [Validators.required]),
      businnessAreas: this.builder.control<{ id: ID; name: string }[]>(
        this.bussinessAreas.filter(area => this.profile.businnessAreas?.includes(area.id) || [])
      ),
      resources: this.builder.array<FormControl<string>>([], [Validators.maxLength(20)]),
    });

    this.tags = this.form.controls.tags.value;

    if (this.profile.resources?.length) {
      this.profile.resources.forEach(resource => {
        this.addResource(resource);
      });
    }

    this.form.controls.logo.valueChanges.subscribe(() => {
      const logoFile = this.logoInput.nativeElement.files?.[0];

      if (logoFile) {
        const validTypes = ['image/png', 'image/jpeg'];
        if (!validTypes.includes(logoFile.type)) {
          this.logo$.next({
            url: this.logo$.value.url,
            file: null,
            error: true,
          });
          return;
        }

        // Check file size (1MB = 1 * 1024 * 1024 bytes)
        if (logoFile.size > 1 * 1024 * 1024) {
          this.logo$.next({
            url: this.logo$.value.url,
            file: null,
            error: true,
          });
          return;
        }

        // Prepare the link
        this.logo$.next({
          url: URL.createObjectURL(logoFile),
          file: logoFile,
          error: false,
        });
      }
    });
  }

  filterFutureDates = (d: Date | null) => {
    if (!d) {
      return true;
    }


    return d.getTime() < new Date().getTime();
  };

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      // this.logo$.next({
      //   ...this.logo$.value,
      //   error: !Boolean(this.logo$.value.url),
      // });

      return;
    }

    this.save.emit(this.form.getRawValue());
  }

  upload() {
    if (!this.logo$.value.file) {
      return;
    }
    this.saveLogo.emit(this.logo$.value.file);
  }

  addResource(resourceName: string) {
    this.form.controls.resources.push(
      this.builder.control({ value: resourceName, disabled: true }, [Validators.required, CustomValidators.maxLength])
    );
  }

  removeResource(resourceIndex: number) {
    this.form.controls.resources.removeAt(resourceIndex);
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
