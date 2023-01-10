import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ToastService} from "../../../services/toast.service";
import {UserService} from "../../../user/user.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-stripe-payment-form',
  templateUrl: './stripe-payment-form.component.html',
  styleUrls: ['./stripe-payment-form.component.scss']
})
export class StripePaymentFormComponent implements OnInit {

  user;
  stripe: any = null;
  products: any[] = [];
  componentInView = new Subject();
  @Input() contract;
  @Input() customer;
  @Output() closeDialog = new EventEmitter();

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.loadStripe();
  }

  loadStripe(): void {
    if(!window.document.getElementById('stripe-script')) {
      const scriptElement = window.document.createElement("script");
      scriptElement.id = "stripe-script";
      scriptElement.type = "text/javascript";
      scriptElement.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(scriptElement);
      this.checkout();
    }
  }

  checkout(): void {
    const stripe = (<any>window).StripeCheckout.configure({
      key: environment.STRIPE_PUBLIC_KEY,
      locale: 'auto',
      token: (token) => {
       this.createCustomerAndPayAmount(token);
      }
    });

    stripe.open({
      name: 'Stripe Gateway',
      amount: +this.contract.price * 100
    });
  }

  createCustomerAndPayAmount(token): void {
    const stipe = window.document.getElementById('stripe-script');
    stipe.remove();

    const params = {
      amount: +this.contract.price,
      token: token.id,
      email: token.email,
      name: this.user.name,
      _id: this.user._id,
      userId: this.user.userId,
      default_price: this.contract.product.default_price,
      product: this.contract.product.id,
      customer: this.user.customer ? this.user.customer : null
    }

    this.userService.createCustomerAndPayAmount(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      this.user.customer = response.customer;
      this.closeDialog.emit();

      localStorage.setItem('user', JSON.stringify(this.user));
    }, error => {
      this.closeDialog.emit();
      this.toastService.error(error);
    });
  }
}
