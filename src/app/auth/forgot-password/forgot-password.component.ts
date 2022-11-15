import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {UtilService} from "../../services/util.service";
import {AuthService} from "../auth.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  componentInView = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSendResetPasswordEmailClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    this.authService.sendResetPasswordEmail(this.form.value).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

}
