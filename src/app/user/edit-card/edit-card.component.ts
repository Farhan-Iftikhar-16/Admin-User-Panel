import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {UserService} from "../user.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  user;
  form: FormGroup;
  componentInView = new Subject();
  @Output() closeDialog = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      number: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      cvc: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
    });
  }

  addCard(): void {
    const params = {
      ...this.form.value,
      customer: this.user.customer
    };

    this.userService.addCard(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      this.closeDialog.emit();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }
}
