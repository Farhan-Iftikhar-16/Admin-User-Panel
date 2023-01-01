import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../user/user.service";
import {ToastService} from "../../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import {ROLES} from "../../../config/constant";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  user;
  transactions = [];
  componentInView = new Subject();

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.getUserTransactions();
  }

  getUserTransactions(): void {
    this.userService.getUserTransactions(this.user.role === ROLES.CUSTOMER ? this.user.customer : null).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.transactions = response.transactions;
    }, error => {
      this.toastService.error(error);
    })
  }
}
