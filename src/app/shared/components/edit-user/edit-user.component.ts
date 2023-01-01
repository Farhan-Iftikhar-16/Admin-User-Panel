import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GENDERS, ROLES, ROLES_SELECT_ITEM} from "../../../config/constant";
import {Subject, takeUntil} from "rxjs";
import {UtilService} from "../../../services/util.service";
import {ToastService} from "../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../user/user.service";
import * as uuid from 'uuid';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user;
  form: FormGroup;
  maxDate = new Date();
  genders = GENDERS;
  roles = ROLES_SELECT_ITEM;
  readMode = false;
  componentInView = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.createForm();

    this.activatedRoute.params.pipe(takeUntil(this.componentInView)).subscribe(params => {
      if (params.id && params.id !== '0') {
        this.getUserDetails(params.id);
      }
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      userId: [{value: uuid.v4(), disabled: true}, Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      role: ['CUSTOMER', Validators.required],
      contractDate: [{value: new Date(), disabled: true}, Validators.required],
      addressDetails: this.formBuilder.group({
        addressLine1: [''],
        city: [''],
        state: [''],
        country: ['']
      }),
    });
  }

  getUserDetails(id): void {
    this.userService.getUserDetails(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.form.patchValue(response.user);
      this.form.get('id').setValue(response.user._id);
      this.form.get('dateOfBirth').setValue(new Date(+response.user.dateOfBirth));
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  onRoleChanged(): void {
    if (this.form.get('role').value === 'CUSTOMER') {
      this.form.get('contractDate').setValidators(Validators.required);
    }

    if (this.form.get('role').value === 'ADMIN') {
      this.form.get('contractDate').removeValidators(Validators.required);
    }

    this.form.updateValueAndValidity();
  }

  onSaveChangesClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    let params = {
      ...this.form.value,
      userId: this.form.get('userId').value,
      contractDate: this.form.get('contractDate').value,
      dateOfBirth: new Date(this.form.get('dateOfBirth').value).getTime()
    };

    !params.id ? this.addUser(params) : this.updateUser(params);
  }

  addUser(params): void {
    this.userService.addUser(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      if (this.user.role === ROLES.ADMIN) {
        this.router.navigate(['/admin/users']).then();
        return;
      }

      this.router.navigate(['/user/dashboard']).then();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  updateUser(params): void {
    this.userService.updateUser(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      if (this.user.role === ROLES.ADMIN) {
        this.router.navigate(['/admin/users']).then();
        return;
      }

      this.router.navigate(['/user/dashboard']).then();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }
}
