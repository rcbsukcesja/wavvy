import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AddOfferFormValue } from '../data-access/offers.api.service';
import { CustomValidators } from 'src/app/shared/custom.validator';

@Component({
  selector: 'app-add-offer-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="addOffer()" class="flex flex-col">
      <mat-form-field>
        <mat-label>Nazwa</mat-label>
        <input formControlName="name" matInput />
        <mat-hint>Dodaj nazwę oferty</mat-hint>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Opis</mat-label>
        <textarea formControlName="description" matInput></textarea>
        <mat-hint>Dodaj skrócony, ogólny opis dotyczący oferty</mat-hint>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Grupa docelowa</mat-label>
        <textarea formControlName="targetAudience" matInput></textarea>
        <mat-hint>Dodaj opis grupy docelowej, do której kierowana jest oferta</mat-hint>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Data rozpoczęcia naboru</mat-label>
        <input
          matInput
          formControlName="startDate"
          [matDatepicker]="datepicker"
          [matDatepickerFilter]="blockAfterEndDate" />
        <mat-hint>Format daty: dd/mm/yyyy</mat-hint>
        <mat-datepicker-toggle matIconSuffix [for]="datepicker"></mat-datepicker-toggle>
        <mat-datepicker #datepicker> </mat-datepicker>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Data zakończenia naboru</mat-label>
        <input
          matInput
          formControlName="endDate"
          [matDatepicker]="datepicker2"
          [matDatepickerFilter]="blockBeforeStartDate" />
        <mat-hint>Format daty: dd/mm/yyyy</mat-hint>
        <mat-datepicker-toggle matIconSuffix [for]="datepicker2"></mat-datepicker-toggle>
        <mat-datepicker #datepicker2> </mat-datepicker>
      </mat-form-field>
      <br />
      <div class="flex gap-4">
        <mat-form-field>
          <mat-label>Budżet (PLN)</mat-label>
          <input formControlName="budget" matInput type="number" min="0" max="9999999" />
          <mat-hint>Wartość w podana w złotówkach</mat-hint>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Poziom finansowania (%)</mat-label>
          <input formControlName="fundingLevel" matInput type="number" min="1" max="100" />
          <mat-hint>Wartość między 1, a 100</mat-hint>
        </mat-form-field>
      </div>
      <br />

      <mat-form-field>
        <mat-label>Link do BIP</mat-label>
        <input formControlName="link" matInput />
        <mat-hint>Dodaj link do szczegółów oferty</mat-hint>
      </mat-form-field>
      <br />
      <button mat-raised-button color="primary">Zapisz</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOfferFormComponent implements OnInit {
  @Input() formValue?: AddOfferFormValue;
  @Output() add = new EventEmitter<AddOfferFormValue>();

  private builder = inject(NonNullableFormBuilder);

  form!: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
    startDate: FormControl<string>;
    endDate: FormControl<string>;
    budget: FormControl<number>;
    fundingLevel: FormControl<number>;
    targetAudience: FormControl<string>;
    link: FormControl<string>;
  }>;

  addOffer() {
    this.add.emit({
      ...this.form.getRawValue(),
      startDate: this.form.getRawValue().startDate as any,
      endDate: this.form.getRawValue().endDate as any,
    });
  }

  ngOnInit() {
    this.form = this.builder.group({
      name: this.builder.control(this.formValue?.name || '', [Validators.required, CustomValidators.maxLength]),
      description: this.builder.control(this.formValue?.description || '', [
        Validators.required,
        CustomValidators.longMaxLength,
      ]),
      targetAudience: this.builder.control(this.formValue?.targetAudience || '', [
        Validators.required,
        CustomValidators.maxLength,
      ]),
      budget: this.builder.control(this.formValue?.budget || 0, [Validators.required, Validators.max(9999999)]),
      fundingLevel: this.builder.control(this.formValue?.fundingLevel || 0, [Validators.required, Validators.max(100)]),
      startDate: this.builder.control(this.formValue?.startDate || '', [Validators.required]),
      endDate: this.builder.control(this.formValue?.endDate || '', [Validators.required]),
      link: this.builder.control(this.formValue?.link || '', [Validators.required, CustomValidators.maxLength]),
    });
  }

  blockAfterEndDate = (d: any | null) => {
    if (!d || !this.form.controls.endDate.value) {
      return true;
    }

    const endTime = new Date(this.form.controls.endDate.value).getTime();
    const current = d.valueOf();

    return current < endTime;
  };

  blockBeforeStartDate = (d: any | null) => {
    if (!d || !this.form.controls.startDate.value) {
      return true;
    }

    const startTime = new Date(this.form.controls.startDate.value).getTime();
    const current = d.valueOf();

    return current > startTime;
  };
}
