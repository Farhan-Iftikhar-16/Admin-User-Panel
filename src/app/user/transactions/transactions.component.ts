import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import * as moment from "moment";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions = [];
  componentInView = new Subject();

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.customer) {
      this.getUserTransactions(user.customer);
    }
  }

  getUserTransactions(customerId): void {
    this.userService.getUserTransactions(customerId).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.transactions = response.transactions;
    }, error => {
      this.toastService.error(error);
    })
  }
}
