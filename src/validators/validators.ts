import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function invalidPassNumber(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const regex = /\d/;
    const hasNumeric = regex.test(control.value);
    return hasNumeric ? null : {'passNumber': {value: control.value}};
  };
}

export function invalidPassMatch(matchTo: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const matchToControl = control.root.get(matchTo);
    if (!matchToControl) {
      return null;
    }
    const matchToValue = matchToControl.value;
    const isMatch = control.value === matchToValue;
    return isMatch ? null : {'passMatch': {value: control.value}};
  };
}
