import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { startWith, takeUntil } from 'rxjs';
import { CustomValidators } from 'src/app/shared/custom.validator';

export type ChangeStatusDialogData = {
  disabled: boolean;
};

type DisableFormModel = FormGroup<{ reason: FormControl<string>; shouldDisable: FormControl<boolean> }>;

export type DisableFormValue = ReturnType<DisableFormModel['getRawValue']>;

@Component({
  template: `
    <h1 mat-dialog-title>Zmień status</h1>
    <form [formGroup]="form" mat-dialog-content>
      <p>Uwaga! Zablokowane organizacje oraz ich projekty nie są wyświetlane na publicznych listach</p>
      <mat-form-field class="w-full mb-4">
        <input matInput formControlName="reason" placeholder="Powód" />
        <mat-hint [class.text-red-500]="form.controls.reason.touched && form.controls.reason.invalid"
          >Podaj powód zablokowania organizacji/projektu. Min. 10 znaków</mat-hint
        >
      </mat-form-field>

      <input id="active" class="mr-2" [formControl]="form.controls.shouldDisable" form type="radio" [value]="false" />
      <label for="active" class="mr-4">Aktywny</label>
      <input id="disabled" class="mr-2" [formControl]="form.controls.shouldDisable" type="radio" [value]="true" />
      <label for="disabled">Zablokowany</label>
    </form>

    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Zamknij</button>
      <button
        [disabled]="dialogData.disabled === form.controls.shouldDisable.value"
        mat-button
        (click)="changeStatus()">
        Zaktualizuj
      </button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatInputModule, MatButtonModule, CommonModule, ReactiveFormsModule],
})
export class ChangeStatusDialogComponent implements OnInit {
  dialogRef = inject<MatDialogRef<ChangeStatusDialogComponent, DisableFormValue>>(MatDialogRef);
  dialogData = inject<ChangeStatusDialogData>(MAT_DIALOG_DATA);
  formBuilder = inject(NonNullableFormBuilder);

  destroy = inject(DestroyRef);

  form!: DisableFormModel;

  ngOnInit() {
    this.form = this.formBuilder.group({
      reason: this.formBuilder.control(''),
      shouldDisable: this.formBuilder.control(this.dialogData.disabled, Validators.required),
    });

    const reasonCtrl = this.form.controls.reason;

    this.form.controls.shouldDisable.valueChanges
      .pipe(startWith(this.form.controls.shouldDisable.value), takeUntilDestroyed(this.destroy))
      .subscribe(value => {
        console.log({ value });
        if (value) {
          reasonCtrl.enable();
          reasonCtrl.addValidators([Validators.required, Validators.minLength(10), CustomValidators.maxLength()]);
          this.form.updateValueAndValidity();
        } else {
          reasonCtrl.disable();
          reasonCtrl.patchValue('');
          reasonCtrl.clearValidators();
          this.form.updateValueAndValidity();
        }
      });
  }

  changeStatus() {
    this.dialogRef.close(this.form.getRawValue());
  }
}
