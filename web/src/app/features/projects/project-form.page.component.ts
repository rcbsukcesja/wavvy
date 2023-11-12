import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { PROJECT_STATUS, Project, ProjectStatus, projectStatusMap } from './model/project.model';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { ID } from 'src/app/core/types/id.type';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipEditedEvent, MatChipsModule } from '@angular/material/chips';
import { BehaviorSubject } from 'rxjs';

export type ProjectForm = FormGroup<{
  image: FormControl<File | null>;
  status: FormControl<ProjectStatus>;
  name: FormControl<string>;
  description: FormControl<string>;
  startTime: FormControl<string>;
  endTime: FormControl<string>;
  budget: FormControl<number>;
  tags: FormArray<FormControl<string>>;
  link: FormControl<string>;
  cooperationMessage: FormControl<string>;
  possibleVolunteer: FormControl<boolean>;
  categories: FormControl<BusinessArea[]>;
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
        <mat-hint>Daj znać kogo/czego potrzebujesz</mat-hint>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Planowany budżet</mat-label>
        <input formControlName="budget" matInput />
        <!-- <mat-icon matSuffix>sentiment_very_satisfied</mat-icon> -->
        <mat-hint>Dodaj opis</mat-hint>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Data rozpoczęcia </mat-label>
        <input matInput formControlName="startTime" [matDatepicker]="datepicker" />
        <mat-hint>DD/MM/YYYY</mat-hint>
        <mat-datepicker-toggle matIconSuffix [for]="datepicker"></mat-datepicker-toggle>
        <mat-datepicker #datepicker> </mat-datepicker>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Data zakończenia </mat-label>
        <input matInput formControlName="endTime" [matDatepicker]="datepicker2" />
        <mat-hint>DD/MM/YYYY</mat-hint>
        <mat-datepicker-toggle matIconSuffix [for]="datepicker2"></mat-datepicker-toggle>
        <mat-datepicker #datepicker2> </mat-datepicker>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Status</mat-label>
        <mat-select formControlName="status">
          <mat-option *ngFor="let status of projectStatuses" [value]="status.value">{{ status.label }}</mat-option>
        </mat-select>
      </mat-form-field>
      <br />

      <mat-checkbox class="example-margin" formControlName="possibleVolunteer">Wolontariat</mat-checkbox>

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
      <mat-form-field>
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

  // upload() {
  //   if (!this.logo$.value.file) {
  //     return;
  //   }

  //   this.service.uploadProjectImage(this.logo$.value.file, this.project!.id);
  // }

  projectStatuses = Object.entries(projectStatusMap).map(([status, label], index) => {
    return {
      id: index + 1,
      value: status,
      label,
    };
  });

  builder = inject(NonNullableFormBuilder);

  form!: any;

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

  @ViewChild('logoInput') logoInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    if (this.project?.imageLink) {
      this.logo$.next({
        error: false,
        file: null,
        url: this.project.imageLink,
      });
    }

    const preselectedAreas = this.project?.categories.map(cat => cat.id);

    this.tags = this.project?.tags || [];

    this.form = this.builder.group({
      // image: this.builder.control<File | null>(null),
      status: this.builder.control<ProjectStatus>(this.project?.status || PROJECT_STATUS.IDEA),
      tags: this.builder.control(this.tags, [Validators.required, Validators.minLength(1)]),
      name: this.builder.control(this.project?.name || ''),
      description: this.builder.control(this.project?.description || ''),
      endTime: this.builder.control(this.project?.endTime || ''),
      startTime: this.builder.control(this.project?.startTime || ''),
      link: this.builder.control(this.project?.link || ''),
      possibleVolunteer: this.builder.control(this.project?.possibleVolunteer || false),
      budget: this.builder.control(this.project?.budget || 0),
      categories: this.builder.control<{ id: ID; name: string }[]>(
        preselectedAreas?.length
          ? this.bussinessAreas.filter(area => {
              return preselectedAreas.includes(area.id);
            })
          : []
      ),
      cooperationMessage: this.builder.control(this.project?.cooperationMessage || ''),
    });

    // this.form.controls.image.valueChanges.subscribe(() => {
    //   const logoFile = this.logoInput.nativeElement.files?.[0];

    //   if (logoFile) {
    //     const validTypes = ['image/png', 'image/jpeg'];
    //     if (!validTypes.includes(logoFile.type)) {
    //       this.logo$.next({
    //         url: this.logo$.value.url,
    //         file: null,
    //         error: true,
    //       });
    //       return;
    //     }

    //     // Check file size (1MB = 1 * 1024 * 1024 bytes)
    //     if (logoFile.size > 1 * 1024 * 1024) {
    //       this.logo$.next({
    //         url: this.logo$.value.url,
    //         file: null,
    //         error: true,
    //       });
    //       return;
    //     }

    //     // Prepare the link
    //     this.logo$.next({
    //       url: URL.createObjectURL(logoFile),
    //       file: logoFile,
    //       error: false,
    //     });
    //   }
    // });
  }

  addProject() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    if (this.project) {
      this.service.update(this.project.id, this.form.getRawValue());
    } else {
      this.service.add(this.form.getRawValue());
    }
  }
}
