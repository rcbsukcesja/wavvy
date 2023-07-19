import { Component, Input, OnInit, inject } from '@angular/core';
import { PROJECT_STATUS, Project, ProjectStatus } from './model/project.model';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
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

export type ProjectForm = FormGroup<{
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
  ],
  template: `
    <h2>{{ project ? 'Edytowanie projektu' : 'Dodawanie projektu' }}</h2>
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
        <mat-hint>Dodaj opis</mat-hint>
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
          <mat-option *ngFor="let status of projectStatuses" [value]="status">{{ status.name }}</mat-option>
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

  projectStatuses = [
    {
      id: 1,
      name: PROJECT_STATUS.IDEA,
    },
    {
      id: 2,
      name: PROJECT_STATUS.PLANNED,
    },
  ];

  builder = inject(NonNullableFormBuilder);

  form!: any;

  ngOnInit() {
    this.form = this.builder.group({
      status: this.builder.control<ProjectStatus>(this.project?.status || PROJECT_STATUS.IDEA),
      tags: this.builder.array<FormControl<string>>([]),
      name: this.builder.control(this.project?.name || ''),
      description: this.builder.control(this.project?.description || ''),
      endTime: this.builder.control(this.project?.endTime || ''),
      startTime: this.builder.control(this.project?.startTime || ''),
      link: this.builder.control(this.project?.link || ''),
      possibleVolunteer: this.builder.control(this.project?.possibleVolunteer || false),
      budget: this.builder.control(this.project?.budget || 0),
      categories: this.builder.control<{ id: number; name: string }[]>([]),
      cooperationMessage: this.builder.control(this.project?.cooperationMessage || ''),
    });
  }

  addProject() {
    if (this.project) {
      this.service.update(this.project.id, this.form.getRawValue());
    } else {
      this.service.add(this.form.getRawValue());
    }
  }
}
