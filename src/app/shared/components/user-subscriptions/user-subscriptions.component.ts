import { Component, OnInit } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UserService} from "../../../user/user.service";
import {ToastService} from "../../../services/toast.service";
import * as moment from "moment";
import {ROLES} from "../../../config/constant";
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.scss']
})
export class UserSubscriptionsComponent implements OnInit {

  user;
  subscriptions = [];
  canceledSubscriptions = [];
  componentInView = new Subject();

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.getSubscriptions();
  }

  getSubscriptions(): void {
    this.userService.getSubscriptions(this.user.role === ROLES.CUSTOMER ? this.user.customer : null).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.subscriptions = response.subscriptions;
    }, error => {
      this.toastService.error(error);
    });
  }

  getCanceledSubscriptions(): void {
    this.userService.getCanceledSubscriptions(this.user.role === ROLES.CUSTOMER ? this.user.customer : null).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.canceledSubscriptions = response.subscriptions;
    }, error => {
      this.toastService.error(error);
    });
  }

  getDate(date): string {
    return moment(new Date( +(date + '000'))).format('DD-MMM-YYYY');
  }

  getDisplayAbleText(text): string {
    return text.split('_').join(' ');
  }

  onCancelSubscriptionClicked(id): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to cancel subscription?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cancelSubscription(id)
      },
    });
  }

  cancelSubscription(id): void {
    this.userService.deleteSubscription(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      this.getSubscriptions();
    }, error => {
      this.toastService.error(error);
    });
  }

}
