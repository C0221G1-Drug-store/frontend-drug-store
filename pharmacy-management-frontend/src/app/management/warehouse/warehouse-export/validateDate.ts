import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';

export function validateDate(control: AbstractControl):ValidationErrors | null {
  let currentDay = new Date();
  let date = new Date(control.value);
  if (date > currentDay) {
    return { dateValid : true };
  }
  return null;
}
