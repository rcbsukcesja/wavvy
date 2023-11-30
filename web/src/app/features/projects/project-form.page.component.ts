import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { PROJECT_STATUS, Project, ProjectStatus, projectStatusMap } from './model/project.model';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { BusinessArea } from '../ngo/model/ngo.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProjectsApiService } from './data-access/projects.api.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipEditedEvent, MatChipsModule } from '@angular/material/chips';
import { BehaviorSubject } from 'rxjs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomValidators } from 'src/app/shared/custom.validator';

export type ProjectForm = FormGroup<{
  // image: FormControl<File | null>;
  status: FormControl<ProjectStatus>;
  name: FormControl<string>;
  description: FormControl<string>;
  startTime: FormControl<Date>;
  startTimeHour: FormControl<string>;
  endTime: FormControl<Date>;
  endTimeHour: FormControl<string>;
  budget: FormControl<number>;
  tags: FormControl<string[]>;
  link: FormControl<string>;
  cooperationMessage: FormControl<string>;
  possibleVolunteer: FormControl<boolean>;
  city: FormControl<string>;
  zipCode: FormControl<string>;
  street: FormControl<string>;
}>;

@Component({
  selector: 'app-project-form-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    CommonModule,
    MatChipsModule,
    MatTooltipModule,
    MatNativeDateModule,
  ],
  styles: [
    `
      :host {
        display: block;
        @apply max-w-3xl;
      }
    `,
  ],
  template: `
    <h2>{{ project ? 'Edytowanie projektu' : 'Dodawanie projektu' }}</h2>
    @if (project?.imageLink; as link) {
      <section class="flex w-1/4 mb-4">
        <img [src]="link" />
      </section>
    }

    <form [formGroup]="form" (ngSubmit)="addProject()" class="flex flex-col">
      <mat-form-field>
        <mat-label>Nazwa</mat-label>
        <input formControlName="name" matInput />
        <!-- <mat-icon matSuffix>sentiment_very_satisfied</mat-icon> -->
        <mat-hint>Dodaj nazwę</mat-hint>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Opis</mat-label>
        <textarea formControlName="description" matInput></textarea>
        <!-- <mat-icon matSuffix>sentiment_very_satisfied</mat-icon> -->
        <mat-hint>Dodaj opis</mat-hint>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Wiadomość do współpracy!</mat-label>
        <textarea formControlName="cooperationMessage" matInput></textarea>
        <!-- <mat-icon matSuffix>sentiment_very_satisfied</mat-icon> -->
        <mat-hint class="flex items-center"
          >Daj znać kogo/czego potrzebujesz, ta wiadomość wyświetli się po najechaniu na ikonę
          <mat-icon
            [matTooltip]="form.controls.cooperationMessage.value"
            [matTooltipDisabled]="!form.controls.cooperationMessage.value"
            class="ml-2"
            >spatial_audio_off</mat-icon
          >
          na widoku projektu
        </mat-hint>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Planowany budżet</mat-label>
        <input formControlName="budget" matInput />
        <!-- <mat-icon matSuffix>sentiment_very_satisfied</mat-icon> -->
        <mat-hint
          >Daj znać jakiego budżetu potrzebujesz. Ta informacja będzie widoczna tylko dla zalogowanych
          użytkowników</mat-hint
        >
      </mat-form-field>
      <br />
      <p>Ustaw terminy projektu:</p>
      <div class="flex gap-4">
        <mat-form-field class="flex-1">
          <mat-label>Data rozpoczęcia </mat-label>
          <input
            matInput
            formControlName="startTime"
            [matDatepicker]="datepicker"
            [matDatepickerFilter]="blockAfterEndDate" />
          <mat-hint>Format daty: dd/mm/yyyy z</mat-hint>
          <mat-datepicker-toggle matIconSuffix [for]="datepicker"></mat-datepicker-toggle>
          <mat-datepicker #datepicker> </mat-datepicker>
        </mat-form-field>
        <mat-form-field class="flex-1">
          <mat-label>Godzina rozpoczęcia </mat-label>
          <input formControlName="startTimeHour" placeholder="" matInput type="time" />
          <mat-hint>Podaj godzinę rozpoczęcia</mat-hint>
        </mat-form-field>
      </div>

      <br />
      <div class="flex gap-4">
        <mat-form-field class="flex-1">
          <mat-label>Data zakończenia </mat-label>
          <input
            matInput
            formControlName="endTime"
            [matDatepicker]="datepicker2"
            [matDatepickerFilter]="blockBeforeStartDate" />
          <mat-hint>Format daty: dd/mm/yyyy</mat-hint>
          <mat-datepicker-toggle matIconSuffix [for]="datepicker2"></mat-datepicker-toggle>
          <mat-datepicker #datepicker2> </mat-datepicker>
        </mat-form-field>
        <mat-form-field class="flex-1">
          <mat-label>Godzina zakończenia </mat-label>
          <input formControlName="endTimeHour" matInput type="time" />
          <mat-hint>Podaj godzinę zakończenia</mat-hint>
        </mat-form-field>
      </div>
      <br />
      <p>Adres wydarzenia (opcjonalne):</p>
      <div class="flex gap-4">
        <mat-form-field class="flex-grow">
          <mat-label>Ulica</mat-label>
          <input formControlName="street" matInput />
          <mat-hint></mat-hint>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Miejscowość</mat-label>
          <input formControlName="city" matInput />
          <mat-hint></mat-hint>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Kod pocztowy</mat-label>
          <input formControlName="zipCode" matInput />
          <mat-hint></mat-hint>
        </mat-form-field>
      </div>

      <br />
      <mat-form-field>
        <mat-label>Etap</mat-label>
        <mat-select formControlName="status">
          <mat-option *ngFor="let status of projectStatuses" [value]="status.value">{{ status.label }}</mat-option>
        </mat-select>
      </mat-form-field>
      <br />

      <label>Czy szukasz wolontariuszy do projektu?</label>
      <mat-checkbox class="example-margin" formControlName="possibleVolunteer">Tak</mat-checkbox>

      <br />

      <mat-form-field>
        <mat-label>Link</mat-label>
        <input formControlName="link" matInput />
        <!-- <mat-icon matSuffix>sentiment_very_satisfied</mat-icon> -->
        <mat-hint>Zewnętrzny link do projektu</mat-hint>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Tagi</mat-label>
        <mat-chip-grid formControlName="tags" #chipGrid aria-label="Enter tags">
          <mat-chip-row *ngFor="let tag of tags" (removed)="remove(tag)" [editable]="true" (edited)="edit(tag, $event)">
            {{ tag }}
            <button matChipRemove>
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip-row>
          <input
            placeholder="Nowy tag"
            [matChipInputFor]="chipGrid"
            [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
            [matChipInputAddOnBlur]="true"
            (matChipInputTokenEnd)="add($event)" />
        </mat-chip-grid>
        <mat-hint *ngIf="form.controls.tags as ctrl" [class.text-red-500]="ctrl.invalid && ctrl.touched"
          >Podaj przynajmniej jeden tag</mat-hint
        >
      </mat-form-field>
      <br />
      <!-- <mat-form-field>
        <mat-label>Kategorie</mat-label>
        <mat-select formControlName="categories" multiple>
          <mat-select-trigger>
            {{ form.controls.categories.value[0]?.name || '' }}
            <span *ngIf="(form.controls.categories.value.length || 0) > 1">
              (+{{ (form.controls.categories.value.length || 0) - 1 }}
              {{ form.controls.categories.value.length === 2 ? 'other' : 'others' }})
            </span>
          </mat-select-trigger>
          <mat-option *ngFor="let area of bussinessAreas" [value]="area">{{ area.name }}</mat-option>
        </mat-select>
      </mat-form-field>
      <br /> -->

      <button mat-raised-button color="primary">Zapisz</button>
    </form>
  `,
})
export default class ProjectFormPageComponent implements OnInit {
  @Input() project?: Project;
  @Input() bussinessAreas!: BusinessArea[];

  service = inject(ProjectsApiService);

  logo$: BehaviorSubject<{ file: File | null; url: string | null; error: boolean }> = new BehaviorSubject({
    file: null,
    url: null,
    error: false,
  } as { file: File | null; url: string | null; error: boolean });

  projectStatuses = Object.entries(projectStatusMap).map(([status, label], index) => {
    return {
      id: index + 1,
      value: status,
      label,
    };
  });

  builder = inject(NonNullableFormBuilder);

  form!: ProjectForm;

  separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

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

  blockAfterEndDate = (d: Date | null) => {
    if (!d || !this.form.controls.endTime.value) {
      return true;
    }

    const endTime = new Date(this.form.controls.endTime.value).getTime();
    const current = d.getTime();

    return current < endTime;
  };

  blockBeforeStartDate = (d: Date | null) => {
    if (!d || !this.form.controls.startTime.value) {
      return true;
    }

    const startTime = new Date(this.form.controls.startTime.value).getTime();
    const current = d.getTime();

    return current > startTime;
  };

  @ViewChild('logoInput') logoInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    if (this.project?.imageLink) {
      this.logo$.next({
        error: false,
        file: null,
        url: this.project.imageLink,
      });
    }

    let startTimeHour = '';
    let endTimeHour = '';

    if (this.project) {
      const hours = new Date(this.project.startTime).getHours();
      const minutes = new Date(this.project.startTime).getMinutes();

      startTimeHour = `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}`;

      const h = new Date(this.project.endTime).getHours();
      const m = new Date(this.project.endTime).getMinutes();

      endTimeHour = `${h > 9 ? h : '0' + h}:${m > 9 ? m : '0' + m}`;
    }

    this.tags = this.project?.tags || [];

    this.form = this.builder.group({
      status: this.builder.control<ProjectStatus>(this.project?.status || PROJECT_STATUS.IDEA),
      tags: this.builder.control(this.tags, [Validators.required, Validators.minLength(1)]),
      name: this.builder.control(this.project?.name || '', [Validators.required, CustomValidators.maxLength]),
      description: this.builder.control(this.project?.description || '', [Validators.required]),
      endTime: this.builder.control(this.project ? new Date(this.project.endTime) : new Date(), [Validators.required]),
      endTimeHour: this.builder.control(endTimeHour || '', [Validators.required]),
      startTime: this.builder.control(this.project ? new Date(this.project.startTime) : new Date(), [
        Validators.required,
      ]),
      startTimeHour: this.builder.control(startTimeHour || '18:00', [Validators.required]),
      link: this.builder.control(this.project?.links[0] || ''),
      possibleVolunteer: this.builder.control(this.project?.possibleVolunteer || false),
      budget: this.builder.control(this.project?.budget || 0),
      city: this.builder.control(this.project?.address?.city || '', [CustomValidators.maxLength]),
      street: this.builder.control(this.project?.address?.street || '', [CustomValidators.maxLength]),
      zipCode: this.builder.control(this.project?.address?.zipCode || '', [CustomValidators.maxLength]),
      cooperationMessage: this.builder.control(this.project?.cooperationMessage || ''),
    });
  }

  private prepareDates(formValue: ReturnType<typeof this.form.getRawValue>) {
    const startTime = formValue.startTime as unknown as Date;
    const [startH, startM] = formValue.startTimeHour.split(':');
    startTime.setHours(+startH, +startM);

    const endTime = formValue.endTime as unknown as Date;
    const [endH, endM] = formValue.endTimeHour.split(':');
    endTime.setHours(+endH, +endM);

    return { startTime, endTime };
  }

  addProject() {
    this.form.markAllAsTouched();

    const formValue = this.form.getRawValue();

    if (this.form.invalid) {
      return;
    }

    const { endTime, startTime } = this.prepareDates(formValue);

    console.log(formValue.startTime);
    const payload = {
      description: formValue.description,
      endTime: formatDateToUTC(endTime),
      startTime: formatDateToUTC(startTime),
      links: [formValue.link],
      name: formValue.name,
      possibleVolunteer: formValue.possibleVolunteer,
      tags: formValue.tags,
      cooperationMessage: formValue.cooperationMessage,
      status: formValue.status,
      budget: formValue.budget,
      address: {
        city: formValue.city,
        street: formValue.street,
        zipCode: formValue.zipCode,
      },
    };
    if (this.project) {
      this.service.update(this.project.id, payload);
    } else {
      this.service.add(payload);
    }
  }
}

function formatDateToUTC(date: Date) {
  const pad = (num: number) => (num < 10 ? '0' + num : num);

  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1); // getUTCMonth() zwraca miesiące od 0 do 11
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
}
