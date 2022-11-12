import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {ERROR_MESSAGES} from '../config/constant';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  static getErrorMsg(formControl: AbstractControl, customError = {}): string {
    const errors = formControl.errors;
    let error = '';
    let hasError;
    if (errors) {
      hasError = Object
        .keys(errors)
        .some(errorKey => {
          if (errors[errorKey]) {
            error = customError[errorKey] || ERROR_MESSAGES[errorKey] || 'Invalid value';
            return true;
          }
        });
    }

    return hasError ? error : '';
  }

  validateAllFormFields(formGroup?: FormGroup): void {
    Object
      .keys(formGroup.controls)
      .forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          if (typeof control.value === 'string') {
            control.setValue(control.value.trim());
          }
          control.markAsDirty({onlySelf: true});
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        } else if (control instanceof FormArray) {
          control.controls.forEach(ctrl => {
            if (ctrl instanceof FormControl) {
              if (typeof ctrl.value === 'string') {
                ctrl.setValue(ctrl.value.trim());
              }
              ctrl.markAsDirty({onlySelf: true});
            } else if (ctrl instanceof FormGroup) {
              this.validateAllFormFields(ctrl);
            }
          });
        }
      });
  }

  getSubHeader(url): string {
    if (url) {
      if (url.includes('dashboard')) {
        return 'Dashboard';
      }

      if (url.includes('appointments-list')) {
        return 'Appointments';
      }

      if (url.includes('patients-list')) {
        return 'Patients';
      }

      if (url.includes('doctors')) {
        return 'Doctors';
      }

      if (url.includes('schedule-timings')) {
        return 'Schedule Timings';
      }

      if (url.includes('reviews')) {
        return 'Reviews';
      }

      if (url.includes('edit-profile')) {
        return 'Edit Profile';
      }

      if (url.includes('reset-password')) {
        return 'Reset Password';
      }

      if (url.includes('messages')) {
        return 'Messages';
      }
    }
  }
}
