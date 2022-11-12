import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../services/util.service";
import {ToastService} from "../../services/toast.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ROLES} from "../../config/constant";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  componentInView = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSignInClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    this.authService.login(this.form.value).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', JSON.stringify(response.token));

      if (response.user.role === ROLES.ADMIN) {
        this.router.navigate(['/admin/dashboard']).then();
        return;
      }

      if (response.user.role === ROLES.USER) {
        this.router.navigate(['/user/dashboard']).then();
      }
    }, error => {
      this.toastService.error(error.error.message);
    });
  }
}
