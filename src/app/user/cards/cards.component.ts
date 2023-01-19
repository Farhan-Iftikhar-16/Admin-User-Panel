import { Component, OnInit } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ToastService} from "../../services/toast.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  user;
  customer;
  cards = [];
  showAddCardDialog = false;
  componentInView = new Subject();

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getCustomer();
  }

  getCustomer (): void {
    this.userService.getCustomerById(this.user.customer).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.customer = response.customer;
      this.getCustomerCards();
    }, error => {
      this.toastService.error(error);
    });
  }

  getCustomerCards(): void {
    this.userService.getCustomerCards(this.user.customer).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.cards = response.cards;
    }, error => {
      this.toastService.error(error);
    });
  }

  makeCardDefaultSource(card): void {
    const params = {
      id: this.user.customer,
      card: card.id
    };
    this.userService.updateDefaultSource(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      this.getCustomer();
    }, error => {
      this.toastService.error(error);
    });
  }

}
