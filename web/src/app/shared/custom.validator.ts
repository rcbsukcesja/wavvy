import { ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators {
  static maxLength(): ValidatorFn {
    return Validators.maxLength(255);
  }

  static longMaxLength(): ValidatorFn {
    return Validators.maxLength(2000);
  }
}
