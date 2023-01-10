import {Component, OnInit} from '@angular/core';
import {STATUS, STATUS_VALUE_SET} from "../../config/constant";
import {Subject, takeUntil} from "rxjs";
import {ToastService} from "../../services/toast.service";
import {ContractService} from "../../services/contract.service";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-contracts',
  templateUrl: './user-contracts.component.html',
  styleUrls: ['./user-contracts.component.scss']
})
export class UserContractsComponent implements OnInit {

  user;
  customer;
  selectedContract;
  showStripePaymentDialog = false;
  contracts = [];
  status = STATUS;
  statusValueSet = STATUS_VALUE_SET;
  componentInView = new Subject();

  constructor(
    private toastService: ToastService,
    private contractService: ContractService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));

      if (this.user.customer) {
        this.getCustomerById();
      }
    }

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.state && params.contract && params.event === 'signing_complete') {
        this.contractSigned(params.contract);
        return;
      }
    });

    this.getContractsByUserId();
  }

  contractSigned(contractId): void {
    this.contractService.contractSigned(contractId).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      this.getContractsByUserId();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  getContractsByUserId(): void {
    this.contractService.getContractsByUserId(this.user.userId).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.contracts = response.contracts;
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  getCustomerById(): void {
    this.userService.getCustomerById(this.user.customer).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.customer = response.customer;
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  onSubscribeClicked(contract): void {
    this.selectedContract = contract;
    // if (this.customer && this.customer.default_source) {
    //   this.payAmount();
    //   return;
    // }

    this.showStripePaymentDialog = true
  }

  payAmount(): void {
    const params = {
      productId: this.selectedContract.product.id,
      defaultPrice: this.selectedContract.product.default_price,
      card: this.customer.default_source,
      amount: this.selectedContract.price,
      customer: this.customer.id,
      contract: this.selectedContract._id
    };

    this.userService.payAmount(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      this.getContractsByUserId();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  getDisplayAbleStatus(status): string {
    return status.split('_').join(' ');
  }

  onSignClicked(contract): void {
    const link = document.createElement('a');
    link.href = contract.contractSigningURL;
    link.click();
    link.remove();
  }
}
