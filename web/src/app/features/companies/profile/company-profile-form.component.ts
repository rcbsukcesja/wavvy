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
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BehaviorSubject } from 'rxjs';
import { NGO, BusinessArea } from '../../ngo/model/ngo.model';
import { Company } from '../model/company.model';
import { CustomValidators } from 'src/app/shared/custom.validator';
import { MatTooltipModule } from '@angular/material/tooltip';

export type CompanyProfileFormModel = FormGroup<{
  name: FormControl<string>;
  logo: FormControl<File | null>;
  krs: FormControl<string>;
  nip: FormControl<string>;
  regon: FormControl<string>;
  street: FormControl<string>;
  zipcode: FormControl<string>;
  city: FormControl<string>;
  description: FormControl<string>;
  email: FormControl<string>;
  website: FormControl<string>;
  phone: FormControl<string>;
  businnessAreas: FormControl<string[]>;
  resources: FormArray<FormControl<string>>;
}>;

@Component({
  selector: 'app-company-profile-form',
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
    MatTooltipModule,
  ],
  styles: [``],
  template: `
    <section *ngIf="logo$ | async as logo" class="max-w-3xl">
      <h2>{{ profile.name }}</h2>
      <div class="w-1/5 mb-4">
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
            <input formControlName="regon" matInput />
            <mat-hint *ngIf="!form.controls.regon.disabled">REGON składa się z 9 cyfr</mat-hint>
          </mat-form-field>
          <br />
        </div>
        <div class="flex flex-col md:flex-row  md:gap-4">
          <mat-form-field class="md:w-1/2">
            <mat-label>KRS</mat-label>
            <input formControlName="krs" matInput />
            <mat-hint *ngIf="!form.controls.krs.disabled">KRS składa się z 10 cyfr</mat-hint>
          </mat-form-field>
          <br />
          <mat-form-field class="md:w-1/2">
            <mat-label>NIP</mat-label>
            <input formControlName="nip" matInput />
            <mat-hint *ngIf="!form.controls.nip.disabled">NIP składa się z 10 cyfr</mat-hint>
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
        <!--
        <div class="flex flex-col md:gap-4">
          <mat-form-field>
            <mat-label>Adres</mat-label>
            <input formControlName="address" matInput />
          </mat-form-field>
        </div> -->

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
        <div class="mb-4">
          <br />
          <mat-form-field class="w-full">
            <mat-label>Strona internetowa</mat-label>
            <input formControlName="website" matInput />
            <mat-icon matSuffix matTooltip="Pamiętaj, że prawidłowy link zaczyna się od przedrostka http lub https"
              >info</mat-icon
            >
            <mat-hint *ngIf="form.controls.website.errors && form.controls.website.touched" [class.text-red-500]=""
              >Podaj prawidłowy adres strony</mat-hint
            >
          </mat-form-field>
          <br />
        </div>
        <div class="flex flex-col md:flex-row  md:gap-4">
          <mat-form-field class="md:w-1/2">
            <mat-label>Obszary działania</mat-label>
            <mat-select formControlName="businnessAreas" multiple>
              <mat-select-trigger>
                {{ getBusinessAreaLabel(form.controls.businnessAreas.value[0]) }}
                <span *ngIf="(form.controls.businnessAreas.value.length || 0) > 1">
                  (+{{ (form.controls.businnessAreas.value.length || 0) - 1 }}
                  {{ form.controls.businnessAreas.value.length === 2 ? 'other' : 'others' }})
                </span>
              </mat-select-trigger>
              <mat-option *ngFor="let area of bussinessAreas" [value]="area.id">{{ area.name }}</mat-option>
            </mat-select>
            <mat-hint>Minimum jeden obszar działania</mat-hint>
          </mat-form-field>
          <br />
          <div class="md:w-1/2 flex items-center">
            <div class="w-full flex flex-col">
              <label [class.text-red-500]="logo$.value.error" for="logo">Logo</label>
              <input [class.text-red-500]="logo$.value.error" id="logo" formControlName="logo" #logoInput type="file" />
              <p class="text-xs !mt-4 !mb-0">
                By zapisać wybrane logo, kliknij ikonę dyskietki.
                <mat-icon
                  class="align-sub text-base !w-4 !h-4 leading-none"
                  matSuffix
                  matTooltip="Akceptowalne rozszerzenia pliku to jpg, jpeg lub png. Dodatkowo logo może mieć maksymalny rozmiar 1 MB"
                  >info</mat-icon
                >
              </p>
            </div>
            <button [disabled]="logo$.value.error" type="button" (click)="upload()">
              <mat-icon [class.text-gray-500]="logo$.value.error">save</mat-icon>
            </button>
          </div>

          <br />
        </div>
        <br />
        <div class="flex flex-col md:gap-4">
          <mat-form-field class="h-32">
            <mat-label>Opis organizacji</mat-label>
            <textarea formControlName="description" matInput></textarea>
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
              <button (click)="addResource(newResource.value); newResource.value = ''" type="button">Dodaj</button>
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
export class CompanyProfileFirstCompletionComponent implements OnInit {
  @Input({ required: true }) profile!: NGO;
  @Input({ required: true }) bussinessAreas!: BusinessArea[];
  @Output() save = new EventEmitter<Required<typeof this.form.value>>();
  @Output() saveLogo = new EventEmitter<File>();
  @ViewChild('logoInput') logoInput!: ElementRef<HTMLInputElement>;

  private builder = inject(NonNullableFormBuilder);

  addOnBlur = true;
  companyProfile: Company | null = null;
  separatorKeysCodes = [ENTER, COMMA] as const;

  form!: CompanyProfileFormModel;

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

    this.form = this.builder.group({
      name: this.builder.control({ value: this.profile.name, disabled: true }),
      logo: this.builder.control<File | null>(null),
      krs: this.builder.control({ value: this.profile.krs, disabled: this.profile.confirmed }, [
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      nip: this.builder.control({ value: this.profile.nip, disabled: this.profile.confirmed }, [
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      regon: this.builder.control({ value: this.profile.regon, disabled: this.profile.confirmed }, [
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      description: this.builder.control(this.profile.description || '', [Validators.required]),
      street: this.builder.control(this.profile.address?.street || '', [Validators.required]),
      city: this.builder.control(this.profile.address?.city || '', [Validators.required]),
      zipcode: this.builder.control(this.profile.address?.zipCode || '', [Validators.required]),
      email: this.builder.control(this.profile.email || '', [Validators.required]),
      website: this.builder.control(this.profile.website || '', [
        Validators.required,
        CustomValidators.maxLength,
        CustomValidators.link,
      ]),
      phone: this.builder.control(this.profile.phone || '', [Validators.required]),
      businnessAreas: this.builder.control<string[]>(
        this.profile.businessAreas.map(ba => ba.id),
        [Validators.minLength(1), Validators.required]
      ),
      resources: this.builder.array<FormControl<string>>([]),
    });

    if (this.profile.resources?.length) {
      this.profile.resources.forEach(resource => {
        this.addResource(resource);
      });
    }

    this.form.controls.logo.valueChanges.subscribe(val => {
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

  getBusinessAreaLabel(id?: string) {
    return this.bussinessAreas.find(ba => ba.id === id)?.name || 'Nieznany';
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.logo$.next({
        ...this.logo$.value,
        error: !Boolean(this.logo$.value.url),
      });

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
    this.form.controls.resources.push(this.builder.control({ value: resourceName, disabled: true }));
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
