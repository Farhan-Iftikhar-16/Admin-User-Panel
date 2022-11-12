import { Component, ContentChild, Input } from '@angular/core';
import { AbstractControl, FormControlName } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent {

  @Input() errorMap;
  @Input() class = '';
  @ContentChild(FormControlName, {static: false}) fcn: FormControlName;

  getError(): string {
    return UtilService.getErrorMsg(this.control, this.errorMap);
  }

  get control(): AbstractControl {
    return this.fcn.control;
  }

  get isHighlighted(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
