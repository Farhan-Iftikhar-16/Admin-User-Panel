import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {UtilService} from "../../services/util.service";
import {AuthService} from "../auth.service";
import {ToastService} from "../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PATTERNS, ROLES} from "../../config/constant";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  id;
  token;
  form: FormGroup;
  componentInView = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    this.activatedRoute.params.pipe(takeUntil(this.componentInView)).subscribe(params => {
      if (params && params.token && params.id) {
        this.verifyToken(params.token);

        this.id = params.id
      }

      if (!params || (params && (!params.token || !params.id))) {
        this.router.navigate(['/auth/login']).then();
      }
    });


    this.createForm();
  }

  verifyToken(token): void {
    this.authService.verifyToken(token).pipe(takeUntil(this.componentInView)).subscribe(() => {
      this.token = token;
    }, error => {
      this.router.navigate(['/auth/login']).then();
      this.toastService.error(error.error.message);
    })
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      password: new FormControl(null, [Validators.required, Validators.pattern(PATTERNS.PASSWORD)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(PATTERNS.PASSWORD)]),
    });
  }

  onResetPasswordClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    const formValue = this.form.value;

    if (formValue.password !== formValue.confirmPassword) {
      this.toastService.error('Password and confirm password doesn\'t match');
      return;
    }

    const params = {
      id: this.id,
      token: this.token,
      password: formValue.password
    };

    this.authService.resetPassword(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
        this.router.navigate(['/auth/login']).then();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }
}
