import {Component, OnInit} from '@angular/core';
import {STATUS, STATUS_VALUE_SET} from "../../config/constant";
import {Subject, takeUntil} from "rxjs";
import {ToastService} from "../../services/toast.service";
import {ContractService} from "../../services/contract.service";

@Component({
  selector: 'app-user-contracts',
  templateUrl: './user-contracts.component.html',
  styleUrls: ['./user-contracts.component.scss']
})
export class UserContractsComponent implements OnInit {

  user;
  contracts = [];
  status = STATUS;
  statusValueSet = STATUS_VALUE_SET;
  componentInView = new Subject();

  constructor(
    private toastService: ToastService,
    private contractService: ContractService
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.getContractsByUserId();
  }

  getContractsByUserId(): void {
    this.contractService.getContractsByUserId(this.user.userId).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.contracts = response.contracts;
    }, error => {
      this.toastService.error(error.error.message);
    });
  }
}
