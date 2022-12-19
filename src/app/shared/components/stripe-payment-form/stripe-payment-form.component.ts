import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {AdminService} from "../../../admin/admin.service";
import {ToastService} from "../../../services/toast.service";
import {UserService} from "../../../user/user.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-stripe-payment-form',
  templateUrl: './stripe-payment-form.component.html',
  styleUrls: ['./stripe-payment-form.component.scss']
})
export class StripePaymentFormComponent implements OnInit {

  stripe: any = null;
  products: any[] = [];
  componentInView = new Subject();

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.loadStripe();
    this.getProducts();
  }

  loadStripe(): void {
    if(!window.document.getElementById('stripe-script')) {
      const scriptElement = window.document.createElement("script");
      scriptElement.id = "stripe-script";
      scriptElement.type = "text/javascript";
      scriptElement.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(scriptElement);
    }
  }

  getProducts(): void {
    this.userService.getProducts().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.products = response;
    }, error => {
      this.toastService.error(error);
    })
  }

  onPayClicked(amount: any): void {
    const stripe = (<any>window).StripeCheckout.configure({
      key: environment.STRIPE_PUBLIC_KEY,
      locale: 'auto',
      token: (token) => {
       this.payAmount(amount, token);
      }
    });

    stripe.open({
      name: 'Stripe Gateway',
      amount: amount * 100
    });
  }

  payAmount(amount, token): void {
    const params = {
      amount: amount,
      token: token.id,
      email: token.email
    }

    this.userService.payAmount(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
    }, error => {
      this.toastService.error(error);
    });
  }
}
