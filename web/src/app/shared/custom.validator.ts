import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators {
  static maxLength(): ValidatorFn {
    return Validators.maxLength(255);
  }

  static longMaxLength(): ValidatorFn {
    return Validators.maxLength(2000);
  }

  static link: ValidatorFn = (control: AbstractControl<string>) => {
    if (control.value.startsWith('http://') || control.value.startsWith('https://')) {
      return null;
    }

    return {
      invalidLink: true,
    };
  };
}
