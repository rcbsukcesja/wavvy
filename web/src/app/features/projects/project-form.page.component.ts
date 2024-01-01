import { Component, DestroyRef, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
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
import { COMMA, ENTER, P } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipEditedEvent, MatChipsModule } from '@angular/material/chips';
import { BehaviorSubject, map } from 'rxjs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomValidators } from 'src/app/shared/custom.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type ProjectForm = FormGroup<{
  status: FormControl<ProjectStatus>;
  name: FormControl<string>;
  description: FormControl<string>;
  startTime: FormControl<Date>;
  startTimeHour: FormControl<string>;
  setEndDate: FormControl<boolean>;
  setEndTimeHour: FormControl<boolean>;
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
        <div class="flex-1">
          <label>Czy data zakończenia jest inna?</label>
          <mat-checkbox class="example-margin" formControlName="setEndDate"></mat-checkbox>
        </div>
        <div class="flex-1">
          <label>Czy chcesz podać godzinę zakończenia?</label>
          <mat-checkbox class="example-margin" formControlName="setEndTimeHour"></mat-checkbox>
        </div>
      </div>

      <br />

      <div class="flex gap-4">
        <mat-form-field *ngIf="form.controls.setEndDate.value" class="flex-1">
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
        <mat-form-field *ngIf="form.controls.setEndTimeHour.value" class="flex-1">
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
        <mat-hint [class.text-red-500]="form.controls.link.touched && form.controls.link.errors"
          >Pamiętaj, że prawidłowy link zaczyna się od przedrostka http lub https</mat-hint
        >
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
          >Podaj przynajmniej jeden tag. By dodać tag po jego wpisaniu naciśnij enter</mat-hint
        >
      </mat-form-field>
      <br />

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

  private destroy$ = inject(DestroyRef);

  private builder = inject(NonNullableFormBuilder);

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

  blockAfterEndDate = (current: Date | null) => {
    if (!current || !this.form.controls.endTime.value || !this.form.controls.setEndDate.value) {
      return true;
    }

    const endTime = new Date(this.form.controls.endTime.value);
    const end = new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate()).getTime();

    return end >= new Date(current.getFullYear(), current.getMonth(), current.getDate()).getTime();
  };

  blockBeforeStartDate = (current: Date | null) => {
    if (!current || !this.form.controls.startTime.value) {
      return true;
    }

    const startTime = new Date(this.form.controls.startTime.value);
    const start = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate()).getTime();

    return start <= new Date(current.getFullYear(), current.getMonth(), current.getDate()).getTime();
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

    function getTimeinHHMMformat(date: Date) {
      const hours = date.getHours();
      const minutes = date.getMinutes();

      return `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}`;
    }

    if (this.project) {
      startTimeHour = getTimeinHHMMformat(new Date(this.project.startTime));
      endTimeHour = getTimeinHHMMformat(new Date(this.project.endTime));
    }

    this.tags = this.project?.tags || [];

    let setEndDateValue = false;
    let setEndTimeValue = false;

    if (this.project) {
      const startDate = new Date(this.project.startTime);
      const endDate = new Date(this.project.endTime);

      setEndDateValue = startDate.getTime() !== endDate.getTime();

      const startH = startDate.getHours();
      const endH = endDate.getHours();
      const startM = startDate.getMinutes();
      const endM = endDate.getMinutes();

      setEndTimeValue = (startH === endH && startM !== endM) || startH !== endH;
    }

    this.form = this.builder.group({
      setEndDate: this.builder.control(setEndDateValue),
      setEndTimeHour: this.builder.control(setEndTimeValue),
      status: this.builder.control<ProjectStatus>(this.project?.status || PROJECT_STATUS.IDEA),
      tags: this.builder.control(this.tags, [Validators.required, Validators.minLength(1)]),
      name: this.builder.control(this.project?.name || '', [Validators.required, CustomValidators.maxLength]),
      description: this.builder.control(this.project?.description || '', [Validators.required]),
      endTime: this.builder.control(this.project ? new Date(this.project.endTime) : new Date(), []),
      endTimeHour: this.builder.control(endTimeHour || '', []),
      startTime: this.builder.control(this.project ? new Date(this.project.startTime) : new Date(), [
        Validators.required,
      ]),
      startTimeHour: this.builder.control(startTimeHour || '18:00', [Validators.required]),
      link: this.builder.control(this.project?.links[0] || '', [CustomValidators.link]),
      possibleVolunteer: this.builder.control(this.project?.possibleVolunteer || false),
      budget: this.builder.control(this.project?.budget || 0),
      city: this.builder.control(this.project?.address?.city || 'Kołobrzeg', [CustomValidators.maxLength]),
      street: this.builder.control(this.project?.address?.street || '', [CustomValidators.maxLength]),
      zipCode: this.builder.control(this.project?.address?.zipCode || '78-100', [CustomValidators.maxLength]),
      cooperationMessage: this.builder.control(this.project?.cooperationMessage || ''),
    });

    this.form.controls.startTimeHour.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroy$),
        map(value => value.split(':'))
      )
      .subscribe(([endH, endM]) => {
        const { value } = this.form.controls.startTime;

        this.form.controls.startTime.patchValue(new Date(value.setHours(+endH, +endM)));
      });

    this.form.controls.endTimeHour.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroy$),
        map(value => value.split(':'))
      )
      .subscribe(([endH, endM]) => {
        const { value } = this.form.controls.endTime;

        this.form.controls.endTime.patchValue(new Date(value.setHours(+endH, +endM)));
      });

    this.form.controls.setEndDate.valueChanges.pipe(takeUntilDestroyed(this.destroy$)).subscribe(value => {
      if (value) {
        this.form.controls.endTime.patchValue(new Date(this.form.controls.startTime.value));
      }
    });
  }

  private prepareDates(formValue: ReturnType<typeof this.form.getRawValue>) {
    const startTime = formValue.startTime as unknown as Date;
    const [startH, startM] = formValue.startTimeHour.split(':');
    startTime.setHours(+startH, +startM);

    let endTime: Date;

    // ten sam dzien, brak godziny konca
    if (!formValue.setEndDate && !formValue.setEndTimeHour) {
      endTime = formValue.startTime;

      return { startTime, endTime };
    }

    // ten sam dzien, godzina konca ustalona
    if (!formValue.setEndDate && formValue.setEndTimeHour) {
      endTime = structuredClone(formValue.startTime);
      const [endH, endM] = formValue.endTimeHour.split(':');

      endTime.setHours(+endH, +endM);

      return { startTime, endTime };
    }

    // inny dzien, brak godziny konca
    if (formValue.setEndDate && !formValue.setEndTimeHour) {
      endTime = formValue.endTime;

      return { startTime, endTime };
    }

    // inny idzien, godzina konca ustalona
    if (formValue.setEndDate && formValue.setEndTimeHour) {
      endTime = formValue.endTime;
      const [endH, endM] = formValue.endTimeHour.split(':');

      endTime.setHours(+endH, +endM);

      return { startTime, endTime };
    }

    endTime = formValue.endTime;

    return { startTime, endTime };
  }

  addProject() {
    this.form.markAllAsTouched();

    const formValue = this.form.getRawValue();

    if (this.form.invalid) {
      return;
    }

    const { endTime, startTime } = this.prepareDates(formValue);

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
        country: 'Polska',
      },
    };

    console.log(payload);
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
