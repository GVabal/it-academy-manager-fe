import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const imageUrlValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const pattern = /((^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png|bmp)$)|(^$))/;
  if (control.value === null) {
    return null;
  }
  return control.value.match(pattern) ? null : {imageUrl: true};
};
