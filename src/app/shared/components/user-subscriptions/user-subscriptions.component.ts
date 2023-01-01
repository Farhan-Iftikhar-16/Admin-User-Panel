import { Component, OnInit } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UserService} from "../../../user/user.service";
import {ToastService} from "../../../services/toast.service";
import * as moment from "moment";
import {ROLES} from "../../../config/constant";

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.scss']
})
export class UserSubscriptionsComponent implements OnInit {

  user;
  subscriptions = [];
  componentInView = new Subject();

  constructor(
    private userService: UserService,
    private toastService: ToastService
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

  getDate(date): string {
    return moment(new Date( +(date + '000'))).format('DD-MMM-YYYY');
  }

  getDisplayAbleText(text): string {
    return text.split('_').join(' ');
  }

}
