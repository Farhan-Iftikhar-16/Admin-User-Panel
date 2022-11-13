import {Component, OnInit} from '@angular/core';
import {STATUS, STATUS_VALUE_SET} from "../../config/constant";
import {Subject, takeUntil} from "rxjs";
import {ToastService} from "../../services/toast.service";
import {ContractService} from "../../services/contract.service";

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  user;
  contracts = [];
  filteredContracts = [];
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

    this.getContracts();
  }

  getContracts(): void {
    this.contractService.getContracts().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.contracts = response.contracts;
      this.filteredContracts = [...this.contracts];
      this.filteredContracts.forEach(user => user.status = user.status === STATUS.ACTIVE);
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  filterContractsList(event): void {
    const value = event.value;

    if (value === 'ALL') {
      this.filteredContracts = [...this.contracts];
      return;
    }

    if (value === 'ACTIVE') {
      this.filteredContracts = this.contracts.filter(user => user.status === 'ACTIVE');
      return;
    }

    this.filteredContracts = this.contracts.filter(user => user.status === 'INACTIVE');
  }

  updateContractStatus(contract): void {
    const params = {
      status: !contract.status ? this.status.INACTIVE : this.status.ACTIVE
    };

    this.contractService.updateContractStatus(contract._id, params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      this.getContracts();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

}
